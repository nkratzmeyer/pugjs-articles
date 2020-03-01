This post is the fifth in a short series on using the PugJS templating engine with nodejs and expressjs. In the [last part](https://dev.to/nkratzmeyer/using-includes-partials-in-pugjs-19fa), I covered using using "partials" in PugJS. In this post, I will demonstrate how to use Pug to create reusable blocks of code with mixins. Let's get started!

## Starting Code
For brevity, I won't list our starting code here. To follow along, be sure your code is up to date with the [last part](https://dev.to/nkratzmeyer/using-includes-partials-in-pugjs-19fa). Final code is on GitHub [here](https://github.com/nkratzmeyer/pugjs-articles).

## Adding a Mixin
Let's say you have a form element that you want to use in multiple places throughout your application. Furthermore, let's say you want to be able to style the form independently in each place. How might we do this? We could probably figure out a way to do this with conditional logic as described in part 3. However, this would probably not be the most efficient way to go about it. This is an excellent use-case for PugJS mixin functionality documented [here](https://pugjs.org/language/mixins.html). We're going to skip some of the basic examples and go to a slightly more advanced one, using attributes in mixins. First, let's create a partial file to declare our mixin. Under the **partials** folder, create a new file called **mixins.js** with the following content.
```
mixin user-form
    form(action="/", method="post" class!=attributes.class)
        input#user-email(type="email", name="user-email")
        button(type="submit") Submit
```
Here we've **declared** our user form mixin. The interesting part is **class!=attributes.class**. As described in the Pug docs, mixins get an implicit 'attributes' argument which we will use to add attributes to our form. Now let's put our form to use. In **main-layout.pug**, at the very top above the DOCTYPE declaration, add this line:
```
include ../partials/mixins
```
This will give us access to our mixin from any file that extends **main-layout**. In **index.pug** add the mixin by adding this line to the bottom of the file (be sure to indent properly):
```
    +user-form
```
Now if you visit the home page in your browser, you should see your form at the bottom of the page. Notice that there is no class added to the form. Now let's add the form in a different spot and give it a class. In **about.pug**, add the following as the last line of the file. 
```
    +user-form()(class='modal')
```
With this usage, we have specified that we want to apply a class of 'modal' to the form. Now if you visit the 'about' page, you should see the form with the correct class applied. 

## Conclusion
In this post I've gone over using mixins with PugJS. We've seen how to create reusable blocks of code to which we can apply different attributes depending on context. 
Hope this was helpful and corrections/comments/critiques are welcome!
