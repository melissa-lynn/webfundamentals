# Sessions {#flask_sessions}

For many web applications, you start by logging in, then working for a while having *authenticated* yourself
and doing things that you are *authorized* to do, and finally logging out. Your banking app is like that,
and so is email. For a shopping app, you might put off the login part, accumulating stuff in your shopping
cart, and only authenticating at the end, when you want the app to look up your saved address and credit card info. 
The Barnes &amp; Noble website works like that. These distinct phases, which you are already very familiar with,
are knowns as *sessions* in web applications. The phase from login to logout is often called a session.
Flask has excellent support for sessions.

```{=pretext}
<figure xml:id="fig-session">
  <caption>
    A session involving login and a shopping cart.
  </caption>

  <image>
    <shortdescription>
      Sequence diagram showing a browser accumulating
      information in a session object
    </shortdescription>

    <description>
     <p>
    The diagram has two vertical lifelines, with the browser on the
    left and the web server on the right. Time proceeds downward.
    The browser (users) logs in, interacts with the server while
    logged in, and finally logs out.
  </p>
    </description>

    <mermaid label="http-session">
sequenceDiagram
    accTitle: HTTP session
    accDescr {
      The user logs in, does some things while authenticated, and finally logs out
    }

    actor Browser
    participant Server

    Note over Browser,Server: 1. Initial visit
    Browser->>Server: GET /
    Server-->>Browser: Login form

    Note over Browser,Server: 2. Login
    Browser->>Server: POST username/password
    Server-->>Browser: Welcome page<br/>Set-Cookie

    Note over Browser,Server: 3. Authenticated requests
    Browser->>Server: GET /grades + Cookie
    Server-->>Browser: Grades page

    Browser->>Server: GET /profile + Cookie
    Server-->>Browser: Profile page

    Note over Browser,Server: 4. Logout
    Browser->>Server: POST /logout + Cookie
    Server-->>Browser: Goodbye page<br/>Delete-Cookie
    </mermaid>
  </image>
</figure>
```

## Sessions in Flask

To use sessions in Flask, you use a "global" variable called `session`. (Like the `request` variable,
it isn't really global, but you can treat it as such.) You have to import it from the `Flask` module:

```python
from flask import (render_template, request, url_for, 
                   redirect, session)
```

The `session` variable is a dictionary of key/value pairs. You can put anything (within reason)
in that dictionary and it will *persist* until the session ends. (The user can typically end the session by
closing the browser tab, or deleting the `session` cookie.) This gives you continuity across the
series of HTTP interactions, which is the whole point of a session.

Here's an example of using sessions. Upon successful login, the user's login name is put in the `session`
dictionary under the key `username`. So, if `jean24601` logs in, the `session` object will contain `user=jean24601`.
Other endpoints (such as the home page, `/`) can then look in the session object to see who is logged in (if anyone). 

```python
import secrets
app.secret_key = secrets.token_hex()   # secure, unguessable random string

@app.route('/')
def index():
    if 'username' in session:
        return f'Logged in as {session["username"]}'
    return 'You are not logged in'

@app.route('/login', methods=['GET', 'POST'])
def login():
  if request.method == 'GET':
    return render_template('login_page')
  elif request.method == 'POST':
    if credentials_ok(request.form['username'], request.form['password']):
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    else:
        flash('login incorrect; please try again')
        return render_template('login_page')

@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))</pre>
```

## Overlapping Sessions

Because the session is in a cookie that is passed back and forth between browser and server, multiple browsers
can interact with the single Flask app, and Flask can keep them all straight. If `javert1861` logs in just after
`jean24601` and they both are redirected to the home page (`/`), they will each see the correct name
reported. 

## The Secret Key

The secret key is used to cryptographically sign the cookie that is passed between
browser and server. Because the cookie is signed, it can't be altered without detection,
and if Flask sees that the cookie has been tampered with, the cookie is discarded, so
the app is still secure. (The user would have to login again.)

However, if an attacker learns the secret key, they could forge a valid cookie and 
attack the site in many ways. So, keep the key secret. 

Generating a random key is a good way to keep the key secret. The `token_hex()` function
in the Python `secrets` module is intended to do just that. One consequence of
using `token_hex` is that a new value is generated every time you restart your Flask app.
Usually, that's fine, but the new value invalidates any old values, so if you are debugging
some session code, having to start all over again is a hassle. To avoid that (small) hassle,
you could use a fixed string:

```python
app.secret_key = 'correct horse battery staple'
```

## Summary {#session_summar}

Sessions are incredibly important for *continuity* over a series of interactions, as with
filling a shopping cart, and particularly if your app will have have *authentication* where
endpoints will want to know *who* is logged in (so that the endpoint can determine whether
some operation is *authorized*). 

* You have to `import` the `session` variable from `flask`
* The variable contains a dictionary that lasts across a series of interactions
* You can put things into it and take things out, just like the normal Python dictionaries
* One endpoint can put something in (say, the username upon login) and a different endpoint
  can use it to determine who is logged in.
* To avoid tampering, the session is digitally signed using `app.secret_key`, which must
  be set to a secure, unguessable value.


