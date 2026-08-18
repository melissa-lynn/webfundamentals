## Forms Summary

Forms are an essential part of most full-fledged web applications, 
because you'll want to get more information from the user than you
can get with just mouse clicks. Here is a quick reminder of what
we've learned about HTML forms:

1. The `form` tag surrounds the entire form; forms cannot be nested.
1. The `form` tag has attributes of `method` and `action` that say where and how the data is submitted. We'll discuss that elsewhere.
1. The form comprises a bunch of inputs (technically called "controls") to get data from the user.
1. Each input should have a `name` attribute that you the programmer chose as part of designing the form. The corresponding `value` is either typed by the user or chosen from a set of possible values, as with `select` menus or radio buttons.
1. Each input should be *labeled*, which associates a user-friendly description of the input with the input itself. This makes the form more *accessible* to all users.
1. The [WAVE](https://wave.webaim.org/) validator tool is an excellent way to check the accessibility of a form. The WAVE browser plug-in is highly recommended.
1. The `input` tag has a bunch of useful types, like `text`, `password`, `number` and more. 
The `datetime` and `datetime-local` types bring up a date picker (the `datetime-local` omits the timezone).
1. The `textarea` tag creates a larger box for long textual input.
1. The `select` and `option` tags are used to create menus.
1. Create radio buttons with `<input type=radio ...>` and create checkboxes with `<input type=checkbox ...>` Each group of buttons/boxes should have a shared `name` attribute. Each input needs to be labeled, but the entire group is put into a `fieldset` container with a `legend` that describes the group.
1. The form should have a `<button type="submit"></button>` in order to submit the data for processing.

That list is mostly a quick reminder. See the various subsections for more detail.
