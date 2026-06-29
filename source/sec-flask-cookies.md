# Flask Cookies

If you are using sessions, you probably will not need cookies. But you might.
Sessions are great for authentication and authorization and other things that
belong in, well, a session: that interval of time between login and logout. 
But you might want to store things for longer periods. Say someone's zip code.
For that, you might use *cookies*.

    <p>To access cookies you can use the <c classes="xref py py-attr">cookies</c>
                attribute.  To set cookies you can use the
                <c classes="xref py py-attr">set_cookie</c> method of response objects.  The
                <c classes="xref py py-attr">cookies</c> attribute of request objects is a
                dictionary with all the cookies the client transmits.  If you want to use
                sessions, do not use the cookies directly but instead use the
                <xref ref="flask_sessions-id1"/> in Flask that add some security on top of cookies for you.</p>
    <p>Reading cookies:</p>
    <pre>from flask import request

@app.route('/')
def index():
    username = request.cookies.get('username')
    # use cookies.get(key) instead of cookies[key] to not get a
    # KeyError if the cookie is missing.</pre>
    <p>Storing cookies:</p>
    <pre>from flask import make_response

@app.route('/')
def index():
    resp = make_response(render_template(...))
    resp.set_cookie('username', 'the username')
    return resp</pre>
    <p>Note that cookies are set on response objects.  Since you normally
                just return strings from the view functions Flask will convert them into
                response objects for you.  If you explicitly want to do that you can use
                the <c classes="xref py py-meth">make_response()</c> function and then modify it.</p>
    <p>Sometimes you might want to set a cookie at a point where the response
                object does not exist yet.  This is possible by utilizing the
                <inline classes="xref std std-ref">deferred-callbacks</inline> pattern.</p>
    <p>For this also see <xref ref="flask_about-responses-id1"/>.</p>
  </subsection>
