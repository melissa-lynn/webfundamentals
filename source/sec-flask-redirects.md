# Redirects and Response Codes {#flask_redirects}

A web application sometimes needs to *redirect* the user/client. That means to respond
to the client (usually a web browser) with a URL, which the client then dutifully requests
instead of its original request. Essentially, the server is saying "don't ask for /foo, 
request /bar instead". 

So, the journey is like this:

1. Browser requests a url, say `/foo`
1. Server responds saying, "no, GET `/bar` instead"
1. Browser requests `/bar`
1. Server responds to `/bar`
1. Browser displays that response

Here's a diagram:

```{=pretext}
<figure xml:id="fig-http-redirect">
  <caption>
    A browser follows an HTTP redirect from <c>/foo</c> to <c>/bar</c>.
  </caption>

  <image>

    <mermaid label="http-redirect-sequence">
sequenceDiagram
    accTitle: HTTP redirect from /foo to /bar
    accDescr {
      The diagram has two vertical lifelines, with the browser on the
    left and the web server on the right. Time proceeds downward.
    Four numbered arrows show the interaction. The browser requests
    <c>/foo</c>. The server returns status 302 with a Location header
    naming <c>/bar</c>. The browser then requests <c>/bar</c>, and
    the server returns status 200 with the HTML document.
    }

    autonumber
    actor Browser
    participant Server as Web Server

    Browser->>Server: GET /foo
    Note right of Server: Resource moved
    Server-->>Browser: 302 Found<br/>Location: /bar
    Browser->>Server: GET /bar
    Server-->>Browser: 200 OK<br/>HTML document
    </mermaid>
  </image>
</figure>
```

This whole sequence of round trips usually takes less than a second
and the user doesn't even notice (though they may notice that the URL
has changed.)

Why would we use a redirect? Here are a few common reasons:

* After logging in — Redirect the user to their dashboard or the page they originally wanted.
* To simplify URLs — Redirect from an old or alternate URL to a canonical one (e.g., /home → /).
* When a page has moved — Send users and search engines to the new URL.
* To enforce security — Redirect from http:// to https://.
* When access is denied — Redirect unauthenticated users to the login page or unauthorized users to an error page.
* To personalize the experience — Redirect users to a language- or region-specific version of the site.
* After submitting a form — Prevent duplicate submissions if the user refreshes the page (the Post/Redirect/Get pattern).

Let's start with a concrete example of the notion of simplifying a URL. Suppose someone searches a website for some target.
The result is often a page listing those matches, each linking to a specific result. For example, suppose you search IMDB.com
for "Lord of the Rings"; you wouldn't be surprised to get (at least) three results. But now suppose you search for "Fellowship of the Ring," where you might get just one result. But it would be annoying to present the user with a page of one result, when you could send them directly to the result. Let's imagine the following conversation between browser and server:

1. Browser requests IMDB home page: `GET https://www.imdb.com/`
1. Server responds with that home page.
1. User fills out the search form and submits. The browser sends a GET request. 
   The url might look like `GET https://www.imdb.com/find?q=fellowship+of+the+ring`
1. Server responds with a *redirect* to `https://www.imdb.com/title/tt0120737/`
1. The browser immediately sends a GET request to that URL.

(As of this writing, there are several matches at IMDB for that query, so the scenario isn't true. But it's plausible.)

The redirect is typically too fast for the user to notice. 

## Redirects in Flask

Flask makes redirects quite easy. For a slightly different example, suppose there is a endpoint that handles logins. 
On GET, it sends a login form to the browser. On POST, it checks the credentials (username and password). If they are
correct, the user is redirected to the the `/dashboard` endpoint. The code might look like this:

```python
@app.route('/dashboard')
def dashboard_handler():
    user_data = look_up_user_data()
    return render_template('dashboard', data=user_data)

@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'GET':
    return render_template('login_page')
  elif request.method == 'POST':
    if credentials_ok(request.form['username'], request.form['password']):
        return redirect(url_for('dashboard_handler'))
    else:
        flash('login incorrect; please try again')
        return render_template('login_page')
```

There are a few things to notice about that code. 
First, we explicitly check the `request.method` for the two options,
even though there are only the two options. Second, the argument
to `redirect` is *not* the URL (namely `/dashboard` in this example), but
instead it's the expression `url_for('dashboard_handler')` where the argument 
is the name of the function that is associated with the desired URL. Why does
Flask make us do this Rube Goldberg technique? The answer is that because the URLs 
*generated* by Flask, it means that they can all be changed in a systematic way, 
such as preceding them all with a prefix (which is a very common operation). For
more on `url_for`, see <xref ref="url_for"/>.


## Response Codes

You are probably wondering about the 200 and 302 in the discussion about redirects. 
In the HTTP protocol, when the server (any server, not just Flask), the response
has a numeric code. We won't go into all of these, but just a few common ones. 
They break down in categories as follows

* Informational responses (100 – 199)
* Successful responses (200 – 299)
    - 200 means success. That's the normal case
* Redirection messages (300 – 399)
    - 301 means "moved permanently"
    - 302 means "moved temporarily", which we used above for the redirect to `/dashboard`
    - 304 means "not modified" and is used for caching. 
      If the browser asks for a CSS file that it already has, Flask may return 304.
      You'll often see this in the Flask console.
* Client error responses (400 – 499)
    - 400 bad request. The browser sent a malformed request.
    - 401 Unauthorized. Maybe the user tried to access something that requires login, but they haven't yet
    - 403 Forbidden. Logged in, but not allowed (maybe an admin-only endpoint). You also get 403 for
      permission problems on ordinary HTML, CSS and other files if the Unix permissions are wrong.
    - 404 Not found. The most famous HTML code. 
    - 405 Method not allowed. Flask might return this if the user sends POST to a GET-only endpoint.
* Server error responses (500 – 599)

Some of these Flask supplies automatically, so you don't need to worry about them. For example, Flask will
send a 404 if the browser sends an invalid URL. Similarly for 405. The 400 code is for syntactically malformed
HTTP requests, not for, say, a form that was not filled out correctly. Many of these codes will only become 
important when we look at building an API (see <xref "flask_rest_api"/>). But sometimes you may need to 
specify these codes. Let's look a few examples.

## Unauthorized Access

Suppose someone is not logged in and tries to visit the `/dashboard` page we referred to above. It seems like
a 401 response would be perfect (and it will be perfect when we build an API), but for now, it's actually
nicer to `flash()` them a helpful message and redirect them to the login page. So, our endpoint might actually 
be:

```python
@app.route('/dashboard')
def dashboard_handler():
    user = session.get('logged_in_user')
    if user is None:
       flash('please login first')
       return redirect(url_for('login'))
    user_data = look_up_user_data(user)
    return render_template('dashboard', data=user_data)
```

(The session variable is covered in <xref ref="flask_sessions"/>.) 
So, 401 isn't useful yet. The next example is a bit more interesting.

## Missing Pages

Suppose we have an app with parameterized queries. For example, we can have an app like the IMDB 
which shows you information about a movie. Maybe something like this:

```python
@app.route('/movie/<tt>')
def movie_info_page(tt):
  info = database_lookup(tt)
  return render_template('movie_info', data=info)
```

So far, so good. But a mischievous user might put bad values for the "tt": negative numbers, floating point, 
or alphabetic strings. Suppose that if that happens, the return value from `database_lookup` is `None`. We
could at that point present a nice error page:

```python
@app.route('/movie/<tt>')
def movie_info_page(tt):
  info = database_lookup(tt)
  if info is None:
    return render_template("404.html"), 404
  return render_template('movie_info', data=info)
```

You can see that, to provide a status code other than 200, we just give the desired number after the `render_template()` function.

## Unauthorized Access

Similarly, suppose there's an `/admin` page and the logged-in user isn't an administrator. We could just flash 
a short message and send them back to their dashboard:

```python
@app.route('/admin')
def admin_page():
  user = session.get('username')
  is_admin = session.get('username')
  if not is_admin:
    flash('You are not an administrator')
    return redirect(url_for('home_page'))
  ...
```

That would work fine. But if instead there's a lot more information, say about how to become an administrator,
or whatever, we could generate a page and the appropriate code:

```python
@app.route('/admin')
def admin_page():
  user = session.get('username')
  is_admin = session.get('username')
  if not is_admin:
    return render_template("not_an_admin.html"), 403
  ...
```

But little harm comes of just returning 200 for success.

## Summary {#redirect_summary}

This section covered redirects and response codes

### Redirects

* The argument to a `redirect` is a URL, generated by `url_for()`
* The response, including the URL, goes back to the browser, 
* The browser then requests the specified URL
* That URL (presumably) creates the desired response.

The purpose of a redirect is not for coding convenience but because
the second URL is the "right place to be". For example, a login route
(such as `/login/`) might redirect to the user's "home" page, (such as
`/user/fred`). That "right place" might be bookmarked, sent to
someone, etc.

## Response Codes

It's useful to know about various response codes, but in practice they are 
relatively rare. Flask generates error codes like 404 and 405 as appropriate.
The redirect operation uses the 302 response code. 

** do we want to talk about custom 404 pages and the like? **
