# Generating Application URLs {#url_for}

A web application often has to send URLs to the browser. For example, 
the response to a web request might be a list of links to pages within 
the app. Plus, of course, almost every page will have a nav bar that 
allows the user to get around to the different pages of the app. So, 
you might think that the the nav bar might be as simple as the 
following:

```htmla
<nav>
<ul>
<li><a href="/">home</a></li>
<li><a href="/about">About us</a></li>
<li><a href="/contact">Hours and Contact Info</a></li>
</ul>
</nav>
```

And the Flask `app.py` file might have matching endpoints like these:

```python
@app.route('/')
def home():
    return render_template('home')

@app.route('/about')
def about():
    return render_template('about_us')

@app.route('/contact')
def contact():
    return render_template('contact')
```




