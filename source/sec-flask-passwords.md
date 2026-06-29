# Flask Passwords and Logins

For many features of our web application, we will want users to *authenticate*, typically by *logging in*. 
For example, in our knockoff of some social media application, if someone *posts* something (a comment, a review, a picture...), we want to store in the
database *who* posted the item, namely the logged-in user. 
Furthermore, if later the user wants to edit or delete that post, we will 
only authorize that operation if it's the same user who posted it, or maybe
someone else who has permission to edit/delete the post. Thus, web applications 
often have to concern themselves with *authentication* and *authorization*.

There's a lot more that can be said about authentication and authorization, but 
this section is simply concerned with how to allow users to *login* and *logout*, how to know who is logged in when a POST happens, and how to store passwords securely. 

(Passwords are still a necessary evil for many applications, but the tech world is moving towards better solutions such as passkeys. You should also be using a
password manager.)

Finally, no discussion about passwords is complete without referencing this 
famous [XKCD cartoon on passwords](https://xkcd.com/936/). 

### Storing Passwords

### Hashing Passwords

The OWASP guide strongly suggests that, as of this writing (2026), you 
should be using Argon2. There's a [Python Implementation of Argon2](https://pypi.org/project/argon2-cffi/).

