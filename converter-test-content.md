# Regression tests

Simple paragraph

The follow is a subsection header with a specified ID

## Code Blocks {#code_blocks}

Here is a paragraph with some code: `x = a + b` and I wonder how it will render.

1234567890123456789012345678901234567890123456789012345678901234567890 `x = a + b`

## Lists

bullet list

* Simple bullet
* Another bullet

ordered list

1. Simple ordered item
2. Another ordered item

nested lists

* Outer bullet
    * Inner bullet

another nested lists

1. Outer ordered item
    * Inner bullet

## Xref

See <xref ref="code_blocks"/> to learn about code blocks.

## Live HTML examples

```htmla
<h1>Big Header</h1>

<p>paragraph under the header</p>

<form method="get" action="/cgi-bin/echo.cgi">
<p><label for="name">what is your name?</label>
   <input id="name" name="name" placeholder="Arthur, King of the Britons"></p>

<p><label for="quest">what is your quest?</label>
   <input id="quest" name="quest" placeholder="To seek the Grail"></p>

<button type="submit">submit</button>
</form>
```

## Python Code Examples

Here's a Flask endpoint:

```python
@app.request('/about')
def about():
    '''a simple 'about' page'. '''
    flash('thanks for asking!')
    return render_template('request')
```

## JavaScript Code Examples

Here's some JS code:

```javascript
// not the coding I would suggest, but I wanted to have some
// constants to see how the fontification of keywords went
function pyth(a,b) {
    const a2 = a*a;
    const b2 = b*b;
    return Math.sqrt(a2+b2);
}
```


