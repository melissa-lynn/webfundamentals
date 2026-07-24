# Flask Request Object {#flask_sec_request_object}

Your Flask back-end will need to get information from the client (the browser). That information comes in 
from the client in the HTTP request, which is received and parsed by your Flask middleware and ultimately
delivered to your handler function via the *request* object, which is in the `request` variable. 
This variable *seems* like a global variable (but isn't really, see the section on **context-locals**). 
But for our purposes, we can think of it as a global variable. 

To use it, we must first import it, so at the top of our `app.py` file, we'll have the following code:

```python
from flask import (Flask, render_template, url_for, request)
```

(Be warned, that list of imports will get longer and longer as we learn more about Flask, but better
not to be overwhelmed by importing a lot of names you don't yet understand.)

## GET Parameters

As we recall from learning about HTML forms (**TODO: add xref**), the `method` attribute 
can either be `GET` or `POST`. Here's a simple example:

```htmla
<form method="GET" action="/cgi-bin/echo.cgi">
<p>
<p><label for="user">Name:</label>
   <input id="user" required type="text" name="user" size="50" placeholder="Arthur, King of the Britons">
</p>

<p><label for="quest">Quest:</label>
    <textarea id="quest" required name="quest" rows="3" cols="50" placeholder="To seek the grail"></textarea>
</p>

<p><label for="color">Favorite Color?<label>
   <select id="color" required name="color">
            <option value="">choose</option>
            <option>Blue</option>
            <option value="yellow">No, yel...</option>
        </select>
</p>

<p><input type="submit" value="process form">
```

Go ahead and submit it. Then look at the URL in the browser; you'll see something that looks like this:

```sh
/cgi-bin/echo.cgi?name=Arthur&quest=to+seek+the+grail&color=blue
```

That string after the question mark is called the *query string* and it contains the user-submitted data. 
Your back-end Flask app will want to access that information for its processing. Fortunately, Flask makes
that easy. It parses the query string, including doing any decoding that is necessary (try submitting a form
with question marks or ampersands in the inputs), and puts the data into an object similar to a Python dictionary. 
That dictionary is the value of `request.args`. Thus, we can process the form using a handler that looks like
this:

```python
@app.route('do-form')
def do_form():
    data = request.args      # object similar to python dictionary
    name = data['name']
    color = data['color']
    quest = data.get('quest')  # another way to access the data
    flash(f'Greetings {name}! It is so interesting that your favorite color is {color}')
    # render the form again, so they can fill it out again
    return render_template('quest-form')
```

The most important thing to notice about this code is the tight connection between the names of the form inputs and 
the way that the data is accessed using those names. If your co-worker renames the "color" input to `fav_color`, your
code that does `data['color']` will raise a Python `KeyError` exception, since there is no `color` in the dictionary
of form data. If you use the `.get()` method instead, your code won't get the `KeyError` exception, but it also
won't get the correct color value. 

## Form Validation

If your code cares about the validity of the form data, you must validate the data in the back end. Validating in the 
front end (the browser) is useful but not sufficient. Let's take an example. Suppose your code, for some reason, needs
the `color` value to be either yellow or blue. Not the empty string, and not 'red' or any other value. Then, your handler
function should check:

```python
@app.route('do-form')
def do_form():
    data = request.args      # object similar to python dictionary
    name = data['name']
    color = data['color']
    if color not in ('yellow', 'blue'):
        flash(f'bad color value: {color}')
        return render_template('main.html')
    ...
```

But, I hear you saying, the HTML form already makes the color a required input and the `select` menu means
that the value can only be 'blue' or 'yellow'. However, recall seeing the data in the URL. 
Try editing that URL to give an invalid value for the color and 
pressing "enter", which will re-submit that URL. You could also edit the URL to remove that key=value pair
entirely. The new, invalid data is submitted without difficulty.
The checks in the browser are easily bypassed. (We can also bypass them in other ways, such as using 
`curl` or the Python `requests` module. **TODO add xref**). Thus, if it really matters, you need to check
in the back-end, where you have complete control and your checks can't be bypassed.

The validation in the browser is great for the vast majority of users, who are just trying to fill out
your form correctly. The validation in the back-end is for the tiny minority of malicious folks trying
to break your code. 

## Lists of Values

Several times above we said the `request.args` object is similar to a Python dictionary. The difference
is that with a standard Python dictionary, a key has only one value. HTML forms allow multiple name=value pairs, 
even with repetitions among the names. For example, that's how checklists are handled. In our
pizza toppings example (**TODO: xref**), we had code like:

```html
  <fieldset>
      <legend>pizza toppings</legend>
      <p>
          <input id="top_olives" type="checkbox" name="topping" value="olives">
          <label for="top_olives">Calamata olives</label>
      <p>
          <input id="top_mushrooms" type="checkbox" name="topping" value="mushrooms">
          <label for="top_mushrooms">button mushrooms</label>
      <p>
          <input id="top_onions" type="checkbox" name="topping" value="onions">
          <label for="top_onions">grilled onions</label>
      <p>
          <input id="top_anchovies" type="checkbox" name="topping" value="anchovies">
          <label for="top_anchovies">anchovies</label>

  </fieldset>
```

The submitted URL might look like this:

```
echo_form?size=large...&topping=olives&topping=mushrooms&topping=onions
```

You can access this data in your Flask handler using the `.getlist` method on the dictionary of data:

```python
``python
@app.route('do-form')
def do_form():
    data = request.args      # object similar to python dictionary
    name = data['name']
    size = data['size']
    if size not in ('small', 'medium', 'large'):
        flash(f'bad size value: {size}')
        return render_template('main.html')
    toppings = data.getlist('topping')
    if 'anchovies' in toppings:
        flash(f'Seriously? Anchovies?')
    ...
```

## Forms with POST

The other option for a form is `method=post`. Flask parses forms submitted via POST and puts them
in a dictionary-like object that is `request.form`. Otherwise, everything is very much like the 
considerations of `request.args`. So, the pizza form submission handler might actually be:

```python
@app.route('place-order', methods=['POST'])
def place_order():
    data = request.form      # different object for POSTed forms
    name = data['name']
    size = data['size']
    if size not in ('small', 'medium', 'large'):
        flash(f'bad size value: {size}')
        return render_template('main.html')
    toppings = data.getlist('topping')
    ...
```

You can see that the change is a tiny one, particularly since most of the code uses a variable called `data`.

## Request Method

The back-end often needs to know the method of the request, particular if the endpoint handles more than one method. 
In the examples above, the endpoint only handled one, so there wasn't any choice. But a common pattern is to
have a single named endpoint that handles both `GET` and `POST`. Consider the following:

```python
@app.route('/pizza-order', methods=['GET', 'POST'])
def pizza_order():
    if request.method == 'GET':
        # send a blank pizza form, ready to be filled out
        return render_template('pizza-form.html')
    elif request.method == 'POST':
        # process a submitted form,
        data = request.form
        ...
    else:
        # this can't actually happen, since this handler function
        # is only configured for GET and POST, but there 
        # are other HTTP methods that we'll learn later
        pass
```

The HTTP method is stored in `request.method`. 


**NOTE TO Co-authors: I have an example of a generic form-echoing back end. I'm not sure it's worth sharing. Thoughts?**

