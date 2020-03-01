Today I learned about rendering HTML templates and layouts using Pugjs. I’d like to share what I’ve learned in order to help others get started with Pug as well as to solidify my own understanding. This tutorial assumes familiarity with Nodejs and Express. So without further ado, let’s get started. 

### Setting up the Project
Navigate into your chosen project directory and run the following to initialize npm with all defaults:
`npm init -y`

Next run the following command to install Express and Pug:
`npm i express pug`

Also install nodemon as a dev dependency with the following command:
`npm i nodemon --save-dev`

Now open your favorite code editor in that directory and add the following to the scripts section of your package.json file. 
`"dev" : "nodemon index.js"`

Now create an index.js file with the following code. 
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res)=>{ 
    res.send('Testing 123');
});

app.listen(3000, ()=>{
    console.log('Server listening on 3000');
});
```
Now fire up the app from the terminal with the following command: 
`npm run dev`

Now you should be able to hit http://localhost:3000 in your browser and see the test page. 

## Adding Pugjs Pages
In your project folder, add a new subfolder called **views**. By convention, Pug will look here when you request a view to be rendered. You may call the folder something else, but you have to tell Pug where to look. Consult the Pug documentation for this. 
In the views folder, create a new file called **index.pug** with the following content.
```
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
The code above demonstrates the basic syntax of a Pug template. Notice that it is basically HTML stripped of the tag markers <>. Each child element is indented 1 tab further than its parent. Also note that there are no closing tags. 
Now let's tell Express to use Pug as its view engine. We can do this by inserting the following code into our **index.js** file immediately after our app declaration.
```javascript
const app = express();

// New code
app.set('view engine', 'pug');
```
The `app.set(..` statement above sets Pugjs as the view engine for Express. Notice that we do NOT have to import pugjs before this. Now we can render the index.pug page when the browser requests the home route. In **index.js**, replace this line:
```javascript
res.send('Testing 123');
```
with this:
```javascript
res.render('index');
```
Notice that we didn't have to specify **'index.pug'** in our render statement. Now head over to hit http://localhost:3000 in your browser and see our beautiful page. 

## Conclusion
In this post I've gone over the very basics of using Pugjs to render HTML Pages. This isn't particularly impressive in itself, but stay tuned! In my next post, I'll go over using Pugjs layouts so that we can modularize (pretty sure that's a word) sections of HTML to avoid repeating code. Hope this was helpful and comments/critiques are welcome!