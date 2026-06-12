## Buttons

While we are on the topic of buttons, let's look a few buttons that are used with forms. 
They are not value-bearing inputs per se, but can still be important in using a form.

### Submit Buttons

Let's start with a *submit* button:

```htmla
<form method="get"
      action="/cgi-bin/echo.cgi">
    <p><label>Customer name: <input type=text name="customer"></label></p>
    <p><button type="submit">Order pizza</button></p>
</form>
```

The button at the bottom of the form allows the user to *submit* the form, which means to send it somewhere (specified in the `action` attribute of the form) for processing.
You'll note that it is a container element: `<button></button>` so you can wrap it around anything that you want to act like a submission button, including images or emoji.
For example, we can add a little picture or a check mark to the button:

```htmla
<button type="submit">
    ✓ order pizza
</button>
<button type="submit">
   <img height=50 src="https://runestone.academy/ns/books/published/webfundamentals/_images/flying-pizza.png" alt=""> order pizza
</button>

```

Before you decide to omit the text entirely, you should consider the accessibility of the image. 
As we discussed with the `<img>` tag (* TODO: add xref *), some users may not be able to see the image, and you will want to supply a textual alternative. 
And some users might not understand that your flying pizza or checkmark image means a submission button. Don't let cleverness get in the way of accessibility.

### Reset Buttons

Sometimes, you want to offer the user a way to reset the form to its initial state, without having to reload the page. You can do that with a `reset` button:

```htmla
<form method="get"
      action="/cgi-bin/echo.cgi">
    <p><label>Customer name: <input type=text name="customer"></label></p>
    <p><button type="reset">reset form</button></p>
    <p><button type="submit">Order pizza</button></p>
</form>
```

This is particularly useful when there are lots of checkboxes and such that would be tedious to uncheck. 

### Button Buttons

Finally, there are buttons that don't do anything without the addition of JavaScript code, which we will discuss elsewhere. 
To create one of those, you use `type="button"`, so I call them "button buttons". Note that the *default* type of button is `type=submit`, 
so if you want a button button, you have to say so. 

As an example, suppose our pizza shop's prices depend on the number and types of toppings, as well as the size and maybe the delivery time.
We write some JavaScript code that can access the user's values from the form and do the calculation, displaying it somewhere on the page. 
We will cover how do to that coding elsewhere. But we need a way for the user to invoke that calculation, without submitting the form. 
That would be a good use of a button button:

```htmla
<form method="get"
      action="/cgi-bin/echo.cgi">
    <p><label>Customer name: <input type=text name="customer"></label></p>
    <p><button type="reset">reset form</button></p>
    <p><button type="button" id="calc_price">Calculate Price</button></p>
    <p><button type="submit">Order pizza</button></p>
</form>
```

Here, we gave an `id` to the button so that we can attach the JavaScript code later. Don't worry about that for now.

It's important to remember that the default type of button is a *submit* button. 
Many students have struggled with their JavaScript code when it turned out that they had used the wrong kind of button and their form was being submitted.


