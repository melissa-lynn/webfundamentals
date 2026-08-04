# XSS Attacks

An important security issue arises with rendering templates with user data, because
not all users are trustworthy. The attack is called an XSS attack, which stands for
[Cross-Site-Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) (because "CSS"
is already short for Cascading Style Sheets). 

By default, Flask protects your app from XSS attacks,
but you should know about XSS because (1) if you do something fancy, you could inadvertently fool Flask
and leave your app vulnerable, (2) you might need to disable the protection when you know things
are safe, and (3) your front-end JS code also needs to know about XSS attacks.

## The Scenario

In the XSS attack, the victim is *not* your application, but rather some other user of 
your app. To be concrete, let's imagine that your web application allows users to "comment"
on something posted. Maybe the app is a "lost and found" app, where people can post pictures or
descriptions of items they lost or found. We will suppose there are at least two users, named "Vicky" and "Mallory." 
Maybe there are innocent bystanders as well, say Alice and Bob.
As you might guess, Mallory is the malicious user, and Vicky is the victim. Here's a possible
scenario:

1. Alice posts "I lost a silver charm bracelet!"
1. Bob, ever helpful, posts a comment, "is it <em>really</em> silver?"
1. Mallory, posts a comment. We'll look at Mallory's comment below.
1. Vicky (or anyone else) visits the page and suffers the attack.

What does Mallory post? Suppose they post:

```
Oh dear, I'm so <em>sorry!</em>
<script>window.location='https://example.com/';</script>
```

Both Mallory and Bob used HTML tags in their comments. Bob's is innocuous and you can 
easily imagine wanting to allow users to use HTML. However, Mallory's contains a `script`
tag with JS code that tells the browser to visit the given site. (Imagine substituting something awful instead--We'll leave that to your imagination.)

The JS code can be disguised in lots
of other ways, such as in a `onmouseover` event. The JS code could do other things, including
all the things that your app's valid JS code does, such as reading/writing cookies or sending
web requests using `fetch()`.

What browser executes this JS code? 
It's executed by the browser of anyone who visits the page that has 
Mallory's comment on Alice's perfectly reasonable post. 
So, there might be many victims, not just Vicky. (Though if 
Mallory wants to target only Vicky, that could be done as well.) 
Your app is just storing and delivering the malicious code.

How does the browser execute this code? Suppose that the `render_template()` function 
sends the comments as a list of strings (the value of `comments`), 
and the code in the template file looks like this:

```html
<h2>Comments</h2>

<ul>
    {% for comm in comments %}
    <li> {{ comm }} </li>
    {% endfor %}
</ul>
```

Thus, each comment string ends up inside a `<li>` tag. It could just as easily end up
inside a `<p>` or a `<div>` or something else. Pretty much any HTML tag will cause
the user's comment to be handed to the browser for interpretation. In other words, the 
victim's browser sees:

```html
<ul>
    <li>is it <em>really</em> silver?</li>
    <li>Oh dear, I'm so <em>sorry!</em>
<script>window.location='https://example.com/';</script>
    </li>
</ul>
```

The victim's browser executes that `script` block and *boom*. 

## The Solution

The standard solution to this attack, and the one that Flask uses, is to *encode* 
dynamic input. That is, with user data like Bob's, containing an `em` tag, 
the angle brackets are converted to `&lt;` and `&gt;` which the browser displays on the 
page as literal angle brackets, instead of being treated as the angle brackets surrounding
a tag. Thus, the browser never "sees" a tag like `<em>`. The downside of this, is that 
Bob's comment looks like this:

```
is it &lt;em&gt;really&lt;/em&gt; silver?
```

So, there's no emphasizing, and the Bob's comment looks gross. 
But the important thing is that Mallory's comment then is rendered completely harmless:

```
Oh dear, I'm so <em>sorry!</em>
&lt;script&gt;window.location='https://example.com/';&lt;/script&gt;
```

## Fooling Flask

Flask makes the user data harmless by replacing 5 key characters that are important to the browser:

* &amp; → &amp;amp;
* &lt; → &amp;lt;
* &gt; → &amp;gt;
* &#34; → &amp;#34; (or &amp;quot;)
* &#39; → &amp;#39;

(This encoding operation is sometimes called "escaping".) 
Encoding works for lots of situations, such as the one above or even cases like this:

```
<input value="{{ username }}">
```

But suppose you want the user to be able to specify the attributes of an HTML tag as well as
the contents. Maybe something like this:

```
<em {{ attr }}>{{ cont }}</em>
```

And Mallory submits two values to the database like this:

```
attr: onmouseover="window.location=https://example.com"
cont: Oh dear! I'm so sorry!
```

The quotation marks and apostrophe in both strings are encoded so the 
resulting HTML code that is seen and parsed 
by the browser might be:

```
<em onmouseover=&#34;window.location=https://example.com/&#34;>
  Oh dear! I&#39;m so sorry
</em>
```

Unfortunately, it's likely that the browser will successfully parse that `onmouseover` 
attribute (or we substitute some more complicated JS code that achieves the same effect) 
and then the attack is launched when a user happens to move the mouse over the element.

The point is that the way that Flask protects against XSS attacks is not impenetrable. It's
very good, and works in the common case of inserting some user data in the contents of an
HTML element, but if you are doing more complicated things with your templates 
(like user-specified attributes), and allowing
untrustworthy user code into vulnerable places, you can inadvertently leave your app
vulnerable to XSS.

## Marking Content as Safe

Flask, of course, has no way of knowing whether the data is trustworthy or not, so it makes
the prudent assumption that dynamic data is untrustworthy and should be encoded. Suppose
our app is looking up some data from a database and rendering the data onto a web page
and we *know* that the data is safe. Maybe a human being has vetted the values or maybe
the app is only used by people we trust. Then, we might want to allow HTML tags and other
such data. If so, we can inform Flask that the data is safe and to skip the encoding/escaping.
Our template might look like:

```html
<div>{{ comment | safe}}</div>
```

The `| safe` marker tells Flask that the `comment` user data is safe and so Flask should
skip the encoding. 

Note that it's easy to get this backwards! Many beginners think that adding the marker *makes*
the data safe, rather than declaring that the data *already is* safe. If you're at all 
in doubt, leave it out.

## XSS Attacks in the Front End

In some web applications, the data is not rendered in the back-end by Flask, but in the 
front-end by JS running in the browser. Perhaps the data was sent to the browser asynchronously
using Ajax or maybe the data was already defined in the HTML page in some data structure. 
(We'll discuss those mechanisms elsewhere.) For now, suppose that we have some untrustworthy
user data, perhaps in a string called `comment`. We have an empty element on the page
that we want to fill in. It might look like this;

```html
<div id="comment_elt"></div>
```

The JS on the page might look like this:

```js
const comment = "untrustworthy data"; 
document.getElementById('comment_elt').textContent = comment;
```

If the comment was "I'm <em>so</em> sorry", the page will look like:

```html
<div id="comment_elt">I&#39;m &lt;em&gt;so&lt;/em&gt; sorry</div>
```

This is *exactly* like the result of Flask's encoding! That's an important effect of
using the `textContent` property. If, instead, you did:

```js
const comment = "untrustworthy data"; 
// XSS Vulnerability!!
document.getElementById('comment_elt').innerHTML = comment; 
```

Then the browser will parse the inserted string as HTML and leave the page open to an XSS
attack. You should only use `innerHTML` if the content is *safe*.

## Summary {#xss_summary}

XSS is an important web vulnerability allowing a malicious user to attack other
users of your app. However it is easily addressed.

* Allow Flask to encode user data that is rendered in templates: `<div>{{ user_data }}</div>`
* Only mark data safe if you know for sure that it is safe: `<div>{{ user_data | safe}}</div>`
* Consider XSS in front-end data display. 
  Use the `textContent` attribute to insert untrustworthy data.
* Only use the `innerHTML` attribute to insert data that is safe.

** Joslenne and Melissa: I have a running example if you think it's worthwhile. **







