## Labels

You probably noticed the use of the `label` tag in the original pizza form. This is a new tag we haven't learned before. It's important for the *structure* and *meaning* of the form, but has almost no effect on its appearance. Consider the following two example text inputs. 

```htmla
<label>first name <input type="text" name="fname"></label>
last name <input type="text" name="lname">
```

You (probably) can't see the effect of the `label` tag in your browser, but its role is critical. We mentioned that forms are about collecting name/value pairs from the user, but it's also the case that the user has to understand what kind of input is supposed
to go in the box. That is the role of the `label` tag: each input needs to have a proper label. This is particularly important with
screen-readers for the blind and other kinds of assistive technology. Suppose that the user has pressed the "tab" key (or equivalent) to put the current input box in focus, and then wants to know "what goes in this box?".  The browser or screen-reader or other programmatic tool can supply the corresponding `label`, perhaps reading it aloud. Note that the `name` attribute is not an acceptable replacement: our software might understand what `fname` means, but the user might not and should not have to guess. The label is for the **user**.

There are two ways to use labels:

* structural: in which the `label` wraps around both the text description and the `input`, and
* `for/id`: in which the `label` tag has a `for` attribute that specifies the `id` of the input that the label is *for*

We saw the structural approach above. Let's redo that form using the second approach for the unlabeled input:

```htmla
<label>first name <input type="text" name="fname"></label>
<label for="input_lname">last name</label> 
<input id="input_lname" type="text" name="lname">
```

The advantage of the structural approach is that the HTML is a little simpler and you don't have to make up a unique id, but that's not much of a burden. Otherwise, the for/id approach is more flexible, since the input doesn't have to be a child of the `label`. 

The unlabeled input (`lname`) in the first example probably looks fine to you, but would not be *accessible* to your audience members that use screen readers and other assistive technology. But because it looks fine, it's easy to forget to use `label`. Don't.
There are also occasions where using a `label` makes the form easier and more accessible for all users; we'll point those out when the arise later in this section. But we wanted to introduce `label` as soon a possible, since it's so important for accessibility.
