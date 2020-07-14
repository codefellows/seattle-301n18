# Updating and Deleting Resources

## Overview

Today we will discuss how to send DELETE and PUT requests with an HTML5 form. We introduce the ability to update or delete a book from the collection through a form, using the middleware `method-override` on the server.

## Daily Plan

- Warm-up exercise
- Review code challenges
- Introduction of today's code challenge topic
- Code review of lab assignment
- Middleware: `method-override`
- Deleting a resource
- Updating a resource
- Code Demo
- Lab Preview

## Learning Objectives

As a result of completing lecture 13 of Code 301, students will:

- Be able to send a post request and route it as a put or delete using method-override
- Update or delete records stored in the database

### CRUD - HTTP

- **C**reate = **POST**
- **R**ead = **GET**
- **U**pdate = **PUT**
- **D**elete = **DELETE**

When manipulating data, we can use those HTTP Methods to perform the appropriate CRUD operations on your server. This is very standard, most of the time. The outlier is HTML `<form>` tags. `<form>` does not allow anything other than "GET" or "POST" as the method.

THESE WILL WORK:

```html
<form method="get"> ... </form>
<form method="post"> ... </form>
```

THESE WILL NOT:

```html
<form method="put"> ... </form>
<form method="delete"> ... </form>
```

But semantically, we'd rather our severs be cleanly coded, so that an update or a delete is handled like this:

```javascript
app.put('/book/:id', handleUpdateBook)
app.delete('/book/:id', handleDeleteBook)
```

Since we know that `app.METHOD()` is the way that express maps the form method to the handler, and that forms can't do a PUT or a DELETE, we have a problem. We need to do 3 things:

1. Fake it in the form ... find a way to tell express that even though we're using `method="POST"`, we really mean "put" or "delete"
1. Tell express to read that fake method instead of the real one
1. Write routes that do the right thing

### Fixing the form

Change the form to use POST as the method, but add `_method` in the query string to tell express what we really want to do.

```html
<form method="post" action="/thing?_method=put"></form>
```

### Patching Express

Use the "Method Override" library, which is another helper we can `use` in express...

```javascript
const methodOverride = require('method-override');

// ... and later, we tell express to read that _method thing in the query string
// ... and use THAT instead of whatever the form method was.
app.use( methodOverride('_method'));
```

### Handling the routes like CRUD and HTTP Expect

Note in your handlers, you can still just read `request.body` like you normally would

```javascript
app.put('/thing', handleUpdateThing);
app.delete('/thing', handleDeleteThing);
```
