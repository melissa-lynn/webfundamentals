# Message Flashing

To provide a good user experience, a web app should give the user
appropriate feedback that actions have worked, or why they failed,
and so forth. Flask provides a wonderful feature called "flashing"
that makes this easy to do. (Official documentation: [Flask Flashing](https://flask.palletsprojects.com/en/stable/patterns/flashing/))

Flashing is an incredible useful and convenient way to, basically,
print messages to the user. Not long-term information, like the
inventory of stuff in an e-commerce site, but confirmations or feedback from a
user-specific event or transaction, such as

* "added item to your cart" 
* "invalid credit card number, please re-enter" 
* "order submitted"

and so forth. You can see that these are one-off messages to the
user. Users like getting confirmation that things worked, and
information about why things didn't work. Flashing is perfect for
that. 

If you didn't have flashing, what you would do is something like:

* have a place on the template for putting messages, maybe a list of them
* add an additional argument to the `render_template` function
  to pass a list of messages,
* whenever the endpoint needs to say something to the user, it appends
  a string onto that list of messages.

That's essentially how Flask's flashing system works, with one extra 
feature that is really nice. The list of messages is stored in the *session*
(see <xref ref="flask_sessions"/>) which means that (1) it's available in
the template without having to be passed as an argument, and (2) messages
can survive a redirect (see <xref ref="flask_redirects"/>).

Let's see how flashing works.

* The `flash(message, category)` function takes a message and squirrels it away where
  it can later be rendered onto the page. The `category` is optional; we'll talk about that 
  below.
* The `get_flashed_messages()` function returns a list of message
  (strings) that can be rendered into a page using Jinja2.
* If the page doesn't render the flashed messages, the user won't see
  them, so you *must* add that Jinja2 code to your HTML page(s). 
* Often, we put the Jinja 2 code to show flashed messages in a base
  template page, from which other pages inherit (see below).
* The flashing mechanism can survive a redirect, which is a nice
  advantage over simpler systems.
* Flashing is based in part on *sessions*, which we'll talk more about
  later (though soon).
* To use sessions, you have to set `app.secret_key`. This is covered
  more thoroughly in the section on sessions (see <xref ref="flask_sessions"/>).

Imagine a "jar" of
messages (strings). Initially, the jar is empty. The `flash(str)`
function puts a string into the jar. The `get_flashed_messages()` 
function takes all the strings out of the jar and returns them.

So, we put in our HTML template files some standard code that prints
all the flashed messages, if any. Like this:

```html
{% with messages = get_flashed_messages() %}
{% if messages %}
<div id="messages">
  {% for msg in messages %}
  <p>{{msg}}</p>
  {% endfor %}
</div>
{% endif %}
{% endwith %}
```

In our `app.py` file, we can put calls to `flash()`, like this:

```python
@app.route('/bar/'):
def bar():
    ...
    flash('added item to your cart')
    ...
    return render_template('something.html')
```

Presumably, the `something.html` file contains the HTML code above (or
a base template that it inherits from), and prints the
message(s). Template inheritance means we can have a variety of templates, all of
which share certain common code like the flashing code. 
See `<xref ref="flask_template_inheritance"/>` **TODO**.

Note that because the `session` object is like a global variable, you 
can use `flash()` in helper functions and such, which is very convenient:

```python
def check_order(data):
    if 'size' not in data:
        flash('must specify a size')
    ...

@app.route('/bar/', methods=['POST'])
def bar():
    ...
    check_order(request.form)
    ...
    return render_template('something.html')
```

That's the basics of flashing. It's simple to use and very effective.

## Message Categories

One possible improvement is to have *categories* of messages. We might, for example,
distinguish between informational messages ("order received") from errors ("missing zip code").
The UI might show them differently (information messages in gray and errors in bold red),
but we won't concern ourselves with the cosmetics here.

When we flash a message, we can add a category as the second argument:

```python
@app.route('/bar/'):
def bar():
    ...
    flash('added item to your cart', 'info')
    flash('missing zip code!', 'error')
    ...
    return render_template('something.html')
```

Then, in the template, we can render them in different ways. One possibility is to 
render different kinds of messages in different blocks. Then CSS rules can present
those blocks differently:

```html
{% with messages = get_flashed_messages(category_filter=['info']) %}
  {% if messages %}
    <div id="info">
      {% for msg in messages %}
        <p>{{ msg }}</p>
      {% endfor %}
    </div>
  {% endif %}
{% endwith %}

{% with messages = get_flashed_messages(category_filter=['error']) %}
  {% if messages %}
      <p>You have errors!</p>
      <ol id="error">
      {% for msg in messages %}
        <li>{{ msg }}</li>
      {% endfor %}
    </ol>
  {% endif %}
{% endwith %}
```

In the code above, we used `div` and `p` for the informational messages and `ol` and `li`
for the errors, just to show some variations on presentation, but the HTML is entirely up to
you.

## Summary {#flashing_summary}

Keep the user informed by using flashing.

* `flash(msg)` to put a message in the collection of messages to be flashed.
* `get_flashed_messages()` to pull out all the messages (emptying the collection)
* Have the template for every page display the flashed messages.

