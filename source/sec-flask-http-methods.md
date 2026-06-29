# Flask HTTP Methods

When a client sends a web request to a server, the request has one of a fixed number of **HTTP Methods**. The vast majority of these HTTP methods are GET and POST, which are the ones that browsers can send natively. 

However, requests can also come from JavaScript running in the browser (**TODO** cross-reference the section in the Chapter on JS about this), and there are other clients (**TODO** cross-reference the section on the Python
`requests` module). These clients get to choose from a wider palette of [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods). We won't discuss all of them, focussing just on the following:

* `GET`
* `POST`
* `PUT`
* `DELETE`

