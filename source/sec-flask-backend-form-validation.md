# Back-end Form Validation

In the chapter on HTML, we looked a several ways to help the user enter the
right kind of data. For example, radio buttons with values of "yes" and "no", so that users don't enter "y" or "ok" or "oui" or whatever. 
Or the approval rating is from a menu or number input that restricts
the input to an integer from 1-5. We even learned how to do validation of
inputs, to ensure that they are all filled-out with valid values before submitting the form. **TODO: we need to do this and add cross-references**

Given that, the back-end can skip the tedious code to check that the value is valid, right? Alas, no. Unfortunately, browsers that are using our forms
with excellent validation are not the only clients that can send web requests.
There's JS running in the browser (**TODO: reference to AJAX**) and also
custom clients created using software such as the Python `requests` module. In other words, it's not only *possible* to bypass our front-end validation, it's 
fairly straightforward. And if our validation can be bypassed, malicious users
may try to exploit that, junking up our database, trying to break our server code, or just to vandalize things. 



