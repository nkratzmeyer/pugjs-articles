This post is the fourth in a short series on using the PugJS view engine with NodeJS and ExpressJS. In the [last part](https://dev.to/nkratzmeyer/displaying-dynamic-data-with-pugjs-18km), we covered using PugJS to display dynamic data. In this post, we'll cover the concept of using **includes** (as named in the PugJS documentation). I prefer to call them "partials" and will do so in this article. Let's get started!

## Starting Code
Below is our starting code (slightly modified since the last post).

```javascript
//index.js
const express = require('express');

const userNames = ['Sean', 'George', 'Roger', 'Timothy', 'Pierce', 'Daniel']
const bestMovie = 'Casino Royale';
const licensedToKill = true;

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {
        userNames,
        bestMovie,
        licensedToKill,
        title : "Home Page"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        userNames,
        title : 'About'
    });
});

app.listen(3000, () => {
    console.log('Server listening on 3000');
});
```

```
//- main-layout.pug
<!DOCTYPE html>
html(lang="en")
    head
        title #{ title }
    body
        header
            nav
                ul
                    li 
                        a(href="/") Home
                    li
                        a(href="/about") About
        h1 This h1 is from the layout.
        hr
        block content
        section
            h2 This h2 is also from the layout
            for user in userNames
                li= user
        block more_content
```

```
//- Index.pug
extends layouts/main-layout.pug
block content
    if licensedToKill
        p Bond is licensed to kill!
    else
        p Bond is NOT licensed to kill!
block more_content
    p The best movie is #{ bestMovie }
    p= bestMovie
```

```
//- about.pug
extends layouts/main-layout.pug
block content
    p This content is from about.pug!
    p About my cool site!
```

And here is our folder layout

```
project_folder
├── index.js
├── node_modules
├── package.json
├── package-lock.json
└── views
    ├── about.pug
    ├── index.pug
    ├── layouts
    │   └── main-layout.pug
```

## About Partials (Includes)
The concept behind includes is very simple. It gives us a mechanism to pull in the contents of one file into another. To do this, we use the **include** keyword followed by the path to a partial file. It is somewhat similar to the the "layout" concept discussed in the previous posts in this series. I like to think of the template system as a good way to create a general layout for your site whereas partials provide a good way to create modular components that can be reused. Let's see how we can integrate partials into our existing code. 

## Using a Partial For the Header
The header element in our **main-layout** file seems like a good candidate for a partial. In a real website, the header and nav elements could get a little complex and it would be nice to separate the header into a different file for easier readability and maintenance. To start, create a new folder under **views** called **partials**. Then create a new file in the **partials** folder called **header.pug**. Now cut the header element from main-layout and paste into **header.pug**. We'll also add an **h1** with some text. It should look like this:
```
//- header.pug
header
    nav
        ul
            li 
                a(href="/") Home
            li
                a(href="/about") About
    h1 This page title is coming from header.pug -- #{ title }
```
In **main-layout.pug** include the header by adding this line where the header previously was. Be sure to indent properly. It should be indented one tab further than our **body** element:
```
    include ../partials/header
```
Now if you view your page, you should see that we have the same end result. If you view the page source in the browser, you should see that we have well-formed HTML. If you don't have well formed html, there is an error in your pug syntax.
In our contrived example, there's not a lot of advantage to doing it this way. However, as previously noted, this could be pretty helpful in a more complex website. Let's do something slightly more useful. 

## Create a User Card
Now we'll create a reusable component for displaying a user. Create a new file in **partials** called **user.pug** with this content:
```
div.card
    p= user
```
When this is translated into html, we will get a **div** with a class of **card**. In main-layout.pug, modify the users list to:
```
for user in userNames
    include ../partials/user.pug
```
Now if we wanted to display a user anywhere in our site, we can just include our **user.pug** being sure that it has access to a **user** object. 
As further practice, you could create a partial for a footer or another nav element. **IMPORTANT NOTE:** In these examples, I've only used partials in the **main-layout** file. However, this is not a requirement. We can use the **include** keyword in any pug file. 

## Avoid This!
You might think that we could change the first line of our **index.pug** to this:
```
include partials/main-layout.pug
```
However, this won't work! The **html** and **body** tags will be closed off too early and our html will be all jacked up!

## Conclusion
In this post I've gone over using **includes/partials** in PugJS. We've seen how to split pieces of our views into separate files to aid reuse and readability. Hopefully this post was informative and, as always, corrections/comments/critiques are welcome!