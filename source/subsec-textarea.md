## TEXTAREA inputs

The `input` element is fine for relatively short textual information, such as a person's name, address, zip code, and such. 
But we often want to allow the user to enter longer chunks of text, say for a restaurant review or comments on an article.
For that need, HTML provides the `textarea` tag. This tag has a start/end pair and attributes for the initial size in rows
and columns. Here's an example:

```htmla
<label for="restaurant_review">comments on this restaurant</label>
<textarea id="restaurant_review" name="comments" rows=3 columns=60>It was great!</textarea>
```

As always, we give the input a label (in this case, using the `for`/`id` technique) and a name. 

The default value for a `textarea` is the region between the beginning and ending tag.
Typically, you want the default value to be empty, so put the
tags <em>right</em> next to each other, as in this example here:

```htmla
<label for="restaurant_review">comments on this restaurant</label>
<textarea id="restaurant_review" name="comments" rows=3 columns=60>It was great!</textarea>
```

Don't let even a single space creep in, or the initial value will be a
string of one space, and not the empty string.  That will affect any code
that cares about the default or original value, such as certain kinds of
validation.

(** TODO: or should this go in the section on the "required" attribute?**)

