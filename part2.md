This post is the second in a short series on using the PugJS templating engine with nodejs and expressjs. In the [first part](https://dev.to/nkratzmeyer/html-templating-with-pugjs-7m9), I went over the basics of using Pugjs to render HTML pages. In this post, I will demonstrate how to use Pug to create and render shared layout templates. Let's get started!

## Starting Code
Below is the code as it was at the end of the last post.

```javascript
//   index.js
const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(3000, ()=>{
    console.log('Server listening on 3000');
});
```

```
//- Index.pug
<!DOCTYPE html>
html(lang="en")
    head
        title Home Page
    body
        header
            h1 Hello from Pug Template!
        main
            p This is a paragraph
```
And here is our folder layout
```
project_folder
>node_modules
--Lots of stuff
>views
--index.pug
-index.js
-package-lock.json
-package.json
```
## Adding a Layout
Under the **views** directory, create a new sub-directory called **layouts**. Under this directory, create a new file called **main-layout.pug** with the following content. 
```
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
```
So this is just a regular pug template with the exception of the **block** element on the last line. This denotes a block of content that will be provided by any other Pug template that uses this layout. The word "content" next to the **block** identifier is just a name and can be anything. So `block content` just creates a named placeholder for content that will be injected by other Pug pages. Later we'll see how to create multiple such placeholder blocks. Now lets modify our **index.pug** file to make use of our layout. Open **index.pug** and change its content to:
```
extends layouts/main-layout.pug

block content
    p This content is from index.pug!
```
The first line tells the Pug engine to use the main-layout.pug file that we just created. The second line says "insert the following content into the block named **content** of the **main-layout** file before rendering it". So you should be able to start up nodemon and view the page at http://localhost:3000. 
## Adding the About Page
In our **main-layout** file, we created a link to **/about** but we haven't yet created this page or this route handler on our server. Let's do this now. Open **index.js** and add the following route handler underneath our "/" handler. 
```javascript
app.get('/about', (req, res)=>{
    res.render('about');
});
```
Under our **views** folder, let's create an **about.pug** file with the following content. 
```
extends layouts/main-layout.pug

block content
    p This content is from about.pug!
    p About my cool site!
```
Now we have two pages that use the **main-layout** file and each page has different content. If you go back to the site, your nav links should now be working. 
## Multiple Named Blocks
Now let's look at how we can create multiple placeholder blocks in our layout page. Open **main-layout.pug** and put the enter the following code under our existing code.
```
section
    h2 This h2 is also from the layout
block more_content
```
Be sure that the **section** tag is indented to the same level as the `block content` line. Modify **index.pug** to make use of the new placeholder. Add the following under our existing code in **index.pug**.
```
block more_content
    p More content from index.pug!!
```
Now if you check out the site at the home route, you should see that different pieces of the page are provided by different files. Notice that we didn't provide anything for the **more-content** block in our **about.pug** file. If you navigate to the **about** page, you'll see that this is no issue. 
## Conclusion
In this post I've gone over using Pugjs to render shared HTML layouts. We've seen how to denote placeholder blocks in our layouts so that content can be injected from other pages that use the layout. In the next (and probably last) post of this series, I'll go over how to inject dynamic data into our Pug templates from the server. 
Hope this was helpful and corrections/comments/critiques are welcome!
