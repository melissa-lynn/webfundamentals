# Flask Cookies

If you are using sessions, you probably will not need cookies. But you might.
Sessions are great for authentication and authorization and other things that
belong in, well, a session: that interval of time between login and logout. 
But you might want to store things for longer periods. Say someone's zip code.
For that, you might use *cookies*. 

This section overlaps a lot with the section on *sessions* (<alert>TODO: add xref</alert>), 
because sessions in Flask are built on the infrastructure of cookies, but we
will keep this section simpler, omitting topics like digital signatures and such. 
Here, we will focus on the more basic task of just remembering something about the user.
Note that the HTTP protocol is *stateless*, meaning that there's nothing in the protocol
that says "this request is related to some prior request". Cookies allow us to build
state.

Cookies are the primary way of remembering something across transactions,
including who someone is. They can also be used for many other things,
both more and less interesting:

*   A movie showtimes application I used to use had a form to specify
    your zip code and it would show you movie listings for your
    area. It would remember the zip code in a cookie, so that you
    didn't have to supply it again when you went to the webpage
    again. Weather websites could do the same (and it's annoying when
    they don't).
* A web application could store preference settings, such whether 
   you want to use dark mode, or your favorite font size.
* A web application could even use cookies to store a shopping cart,
  even before you have logged into the site. The shopping cart is 
  associated just with your browser.
* A web application, say for your bank, can store identity or authentication 
    information in a cookie, so that you only have to login once per 
    session, instead of with <em>each transaction</em>.  (What a pain that 
    would be!) 
* To track unique visitors (for bragging or charging advertisers) 

Remember, all of the above can be done with *sessions*, but sometimes you 
want something simpler or just different. For example, you might want to use
a session (that ends when the browser is closed) for authentication, while storing
zip code or dark mode setting in a cookie that expires in a month, year, or never.
In this reading, we'll focus on storing zip code, just to be concrete. The idea
is that if the web application doesn't know your zip code, it will ask you 
(probably via a form) and store the value in a cookie that is stored in your browser. 
From then on, or until the cookie expires, any request from that browser will 
send the cookie (the zip code) and so the web application will know the zip code 
and can respond with movie showtimes for that zip code. 

## How to Read This

Later, in this reading, I will have some code examples of using
cookies in a Flask app. The Python code is short, and
most of it is stuff you have seen before, so you should be able to
understand it without too much difficulty. 

The difficulty is in the *concepts* and in the information flow over a
*series* of interactions. That's where you want to focus your attention.

## What are Cookies?

Cookies are small bits of text saved with your browser (so Chrome,
Firefox, Edge, Opera and Safari will each have its own set of
cookies). You can think of them as key/value pairs. For example
"zip=02481" for the movie showtimes application.

Cookies are set in the *headers* of your HTTP response; you won't see
it in the *body* of the response (meaning it's not in the web
page). For example, here's what the response to an HTTP request might look like:

<pre> 
HTTP/1.0 200 OK 
Content-Length: 1241 
Content-Type: text/html 
Set-Cookie: zip=02481; 
    domain=www.movieshowtimes.net; 
    expires=23-Apr-2036
 
... content (typically a web page) follows ...
</pre>

Let's take a look at that cookie:

* The first name-value pair determines the name of the cookie and its
  value. Here the name is `zip` and the value is `02481`.
* The `domain` value determines what sites can access this cookie
  (usually only the site that issued it). Here that's
  `www.movieshowtimes.net`, which is our example for the website
  hosting our app. That means that the browser will only
  send this cookie when requests are made to pages on
  `www.movieshowtimes.net`, not to other servers.
* The `expires` value determines when the cookie expires. Some cookies
  (say for authentication) expire very quickly, while other cookies
  (say for tracking you), might expire years in the future.
 
Clients have the option of refusing cookies (meaning that they do not
store them or do not submit them with requests), though in practice the
web relies so much on cookies that it would be difficult to do anything
without accepting cookies.
 
Most browsers will refuse a cookie if it directs them to submit
information to a third party (not the site that issued the cookie).  You
can usually configure this.  Hunt around in your browser and you'll find
it.
 
## Cookies live on the Client

For all page requests (in other words, every time you visit a web page),
your browser (the client) compares the web page's URL to the cookies in
the <q>cookie jar</q> and sends all the unexpired cookies that match the
domain and path. Here's what a request might look like:
    
<pre> 
GET /index.html HTTP/1.0 
Accept: text/html, image/gif, image/jpeg 
Accept-Language: en 
Cookie: zip=02481 
</pre>
    
The HTTP protocol has rules about cookies, such as:

* The total size of a cookie must be less than 4KB. 
In practice, it's usually only a few dozen bytes.
* The client may hold up to 20 cookies for a given domain, 
and up to 300 cookies total. 
* A request might carry more than one cookie. 
* Your browser can also add cookies to the cookie jar; it doesn't have 
to come from the server.  Your web page can do the same, using JavaScript. 

## Exercise on Cookie Inspection

What's in *your* cookie jar?  Take a couple of minutes to poke 
around in your browser to find the cookies.  They will be accessible
via the developer tools. A web search like "show cookie values in Brave browser"
will tell you how to see them.

## Security and Privacy

Since cookies live on the client, what does that mean in terms of privacy
and security? Here are a few common scenarios:

*   The browser is running on your own computer (laptop, desktop,
    smart phone, whatever). In that case, the cookies are stored on
    that computer and are therefore as safe/unsafe as any other file
    on your computer.
* The browser is running on a shared computer, but one with your own
  unique login, maybe your college has computers like this. In this case, the
  cookies are stored in the same folder as your preferences, browser
  history, cache, and other personal stuff. So, this is more vulnerable than a
  machine you have physical control of, but it is still relatively
  secure. Someone would have to hack into your account or into that
  computer to view your cookies.
* The browser is running on a shared computer, and there is no login 
  process.  For example, many public libraries have  
  computers scattered about for searching the catalog, which is done via a 
  web browser, without logging in.  If I go to a website that sets a cookie, it'll be set in 
  that browser, and if you use the machine after me, you'd be able to view 
  the cookie (unless I or the website clears the cookies when I'm done). 
  In this case, there's barely a fig leaf protecting my privacy. 

In general, you should note that *cookies are **not** secure*. They have
the following vulnerabilities:

* The user can see the values you have set.  If you set a cookie
  saying `deadbeat-customer=true`, they will see that.
* The user can modify the values you have set. 
    * They can do that via a browser, a JavaScript, and custom apps. 
    * They can change the cookie to `deadbeat-customer=false`.
* The cookie value is sent along with the HTTP request and response,
which are not encrypted, so the cookie value is easily seen by anyone
with a network packet sniffer. (Elsewhere in the course, we'll see how to
use HTTPS so that both directions are encrypted.)

In Flask's *sessions*, we will see how Flask introduces 
safeguards to protect against some of these insecurities.

## A Schematic of the Request-Reply Model, with Cookies

It can be helpful to have a picture of what's happening. Here's a picture
of basic scenario involving two request/response pairs and the cookie that
the server sets in the first response and receives with the second
request.

<figure xml:id="cookie-flow">
  <caption>Cookies are sent to the browser along with the web 
    page. The browser sends them back to the server, 
    along with the web request.</caption>

  <image source="cookies4.png" width="100%">
    <shortdescription>
 On the left is the browser, along with a jar that
  initially is empty but later has a circle representing a cookie.
  There are four numbered arrows:
  1. going from browser to server, w/o a cookie
  2. going from server to browser, w/ a cookie
  3. going from browser to server, w/ a cookie
  4. going from server to browser, w/ a cookie  
    </shortdescription>
  </image>
</figure>

1. Browser sends a request to the server. Since the user has never
   visited that site before, there are no cookies, so none are sent.
1. The server notices that there are no cookies, so it assumes that this is a new visitor, and it generates a new ID for the user and includes that ID as a cookie in the reply. The reply might even be tailored for new visitors.  
1. The browser later (minutes or months later, but before the cookie
expires) makes another request to that site and sends back the cookie
it got in step 2.
1. The server gets the request with the cookie, realizes this is a 
returning visitor, and can act accordingly, such as generating a customized reply. 

In the example above, the server conjures a cookie out of thin air (say,
an arbitrary identifier). But the first request might be a form that is
supplying the zip code value, and the server's response sets a cookie
to remember that value.
 
## Cookie Attributes

Web browsers and web servers that support cookies have to handle the  following [attributes](http://en.wikipedia.org/wiki/HTTP_cookie#Cookie_attributes):

* name: anything you want for your web app, within limits 
* value: the value your web app wants to get back 
* domain: the server to supply them to, typically your own 
* expires: the time that the cookie is invalid. If not specified, it expires when the browser exits.
* Max-Age: the number of seconds until the cookie expires; an alternative to the "Expires" attribute.
* path: the browser only returns the cookie for URLs below this 
* secure: the browser will only return this cookie if the connection is using HTTPS 
* HttpOnly: the browser won't let JavaScript access this cookie via <code>document.cookie</code>.

In most cases, cookies are not *deleted*. It's easier to set the value to
an empty value (such as zero or the empty string) and test for that. You
can also set its expiration time to the past, which will have the effect
of removing the cookie.

## Cookie Values

What do we set the cookie to? Cookies are limited to 4K, so we have two options: 

* Store everything in the cookie, but be conscious of the space limit
* Store a unique identifier in the cookie, and use that identifier as a key into a table kept in the database. 

The latter is the most common approach, as you probably saw when you
looked in your browser's cookie jar. (What does your Gmail cookie look
like?). How do we make a unique identifier? Here are some options:

* use the computer's time (say, milliseconds since the epoch), possibly with the process id of our current web app.
* use the key (`auto_increment`) generated by some table
* use a server-supplied session identifier (punt to someone else) 
     
We won't pursue this further, since Flask does not create a unique
identifier. 

## Cookies in Flask

Let's start with an app that supplies movie listings for a particular zip code, specified in a 
global variable. (This isn't realistic, but give us a minute.)

```python

default_zip = '02481'

@app.request('/listings/')
def get_listings():
    zip_code = default_zip
    listings = movies_for(zip_code)
    return render_template('movie-listing.html',
                                location=zip_code,
                                movies=listings)
```

As we saw earlier, the setting of the cookie is done in the header of the response. In the code above, we don't see
that response object, because Flask automatically creates it using the value of the `render_template`. To set a cookie,
we need to explicitly create a response object and then use the `set_cookie` method on that object. So, our first step is 
the following:

```python
@app.request('/listings/')
def get_listings():
    zip_code = default_zip
    listings = movies_for(zip_code)
    resp = make_response(render_template('movie-listing.html',
                                location=zip_code,
                                movies=listings))
    resp.set_cookie('zip_code', zip_code)
    return resp
```

The next improvement is to read and use any cookie that the browser has sent us. If it's not set, we'll use 
the default zip code.

```python
@app.request('/listings/')
def get_listings():
    zip_code = request.cookies.get('zip_code', default_zip)
    listings = movies_for(zip_code)
    resp = make_response(render_template('movie-listing.html',
                                location=zip_code,
                                movies=listings))
    resp.set_cookie('zip_code', zip_code)
    return resp
```

Before we go on, let's note something odd in the code above. The early code reads the cookie value and the later code 
writes the cookie value. Aren't we supposed to *set* a value *before* we read it? That's what we learned to do back in 
our very first programming course: set a value before using it. Our movie listing code seems backwards, and it is. 
The reason it makes sense is that the earlier code is reading the value that was sent in a *prior* web request, and 
the later code is setting the value for the *next* web request. Understanding cookie code requires thinking about 
a sequence of interactions, as we saw in the figure above.

## Developing with Cookies

One of the difficult things about using cookies is that when your re-start
your app, it might *not* restart from "scratch". That is, your prior
cookies may still be in the cookie jar. That may be confusing if you 
expect to start over. 

One option is just to remember to delete the cookie before testing your app. 
But it's easy to forget to do that.

Another option is to run the application in an "incognito mode" browser
window or "private window" and close the window when you are done. Those
modes don't save cookies.

## Using the Developer Tools

Because cookies are a "hidden" part of the HTTP requests and
responses, observing them and debugging them can be
harder. Fortunately, the developer tools make this easy. While 
web browsers organize cookies in different ways, you can find
the cookies with a little poking around and/or some web searching.
