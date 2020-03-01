This post is the third in a short series on using the PugJS view engine with NodeJS and ExpressJS. In the [last part](https://dev.to/nkratzmeyer/shared-html-layouts-with-pugjs-2j04), we covered using PugJS to create shared HTML layouts. In this post, we'll cover passing data from the express server into a Pug page. Let's get started!

## Starting Code

Below is the code as it was at the end of the last post.

```javascript
//   index.js
const express = require("express");

const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server listening on 3000");
});
```

```
//- main-layout.pug
<!DOCTYPE html>
html(lang="en")
    head
        title Home Page
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
        block more_content
```

```
//- Index.pug
extends layouts/main-layout.pug
block content
    p This content is from index.pug!
block more_content
    p More content from index.pug!!
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
>node_modules
--Lots of stuff
>views
>>layouts
---main-layout.pug
--about.pug
--index.pug
-index.js
-package-lock.json
-package.json
```

## Adding Some Data

Let's put some dummy data into our server so that we have something to pass into our Pug pages. Open **index.js** and insert the following just before our **app** declaration.

```javascript
const userNames = ["Sean", "George", "Roger", "Timothy", "Pierce", "Daniel"];
const bestMovie = "Casino Royale";
const licensedToKill = true;
```

Now let's pass this data into our rendered pages. On the home route handler, modify the **res.render** code to the following.

```javascript
res.render("index", {
  userNames,
  bestMovie,
  licensedToKill
});
```

Here we are passing an object to the view engine. This method of passing data to the engine seems to be standard across the major view engines. The passed object's properties will be available inside the Pug template as we'll see next.

# Displaying Data

Let's start by just displaying **bestMovie** on the home page. Open **index.pug** and modify the **more_content** block to match the below code:

```
block more_content
    p The best movie is #{ bestMovie }
    p= bestMovie
```
Now check out the home route to see the results. The first paragraph element shows how we can perform interpolation in our content. The second paragraph demonstrates how we can set the text content of an element without interpolation.

## Conditional Logic

Now let's look at integrating a little conditional logic in our Pug page. In **index.pug**, modify the **content** block to match the following:

```
block content
    if licensedToKill
        p Bond is licensed to kill!
    else
        p Bond is NOT licensed to kill!
```

Try switching the value of **licensedToKill** in **index.js** and see how it changes the page rendering. Pug gives us a nice clean way to perform conditional rendering based on passed in data.

## Looping

Now let's check out how we can iterate over our array of user names. This time let's work in **main-layout.pug** just to show that we can use dynamic data in our layout files. Under our existing **h2**, add the following (the **ul** should be indented to the same level as the **h2**):

```
ul
    for user in userNames
        li= user
```

Once again, the syntax for looping over an array is very concise.
**NOTE:** At this point, if you go to the **about** page, you will receive an error on the page as we haven't passed in any data on that route, but the **main-layout.pug** page is looking for a **userNames** array. As an exercise, modify the route handler to pass in the necessary data.

## Conclusion

In this post I've gone over using PugJS to render data received from the server. We've seen how to display simple data, how to use interpolation, conditional logic, and looping with PugJS. Hopefully this post and series was useful and informative to anyone looking at PugJS as a view engine. As always, corrections/comments/critiques are welcome!
