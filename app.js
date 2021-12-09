//Angela Yu's Web Development Course, Blog Project

const express = require("express");
const ejs = require("ejs");
//To make the url compare with the title of each post
const _ = require("lodash");

const homeStartingContent = "Maecenas tincidunt lobortis mollis. Nunc nisl dolor, vestibulum ut accumsan eget, semper vitae massa. Phasellus eget turpis enim. Donec auctor lobortis lacus, tincidunt bibendum leo condimentum ut. Sed sagittis sollicitudin malesuada. Integer porttitor augue euismod aliquam cursus. Sed in posuere sapien, sit amet tincidunt risus. Curabitur vestibulum fringilla enim eu tempor. Pellentesque nec lacinia augue. Mauris sollicitudin leo gravida quam pellentesque sodales. Vivamus porta finibus ex eget blandit. Nam nec magna ut justo sagittis tristique. Integer dapibus nisi sed leo porttitor egestas. Maecenas id elit eget elit porta sollicitudin. Quisque vehicula ipsum non magna semper, fringilla scelerisque turpis vehicula. Sed quis condimentum magna.";

const aboutContent = "Pellentesque dictum luctus turpis at ultricies. Praesent malesuada sapien id commodo varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In iaculis vitae ligula ut accumsan. Praesent vehicula nibh ligula, sit amet sollicitudin sem sagittis eget. Ut purus arcu, efficitur eget commodo ut, finibus id nisl. Sed facilisis magna in diam consectetur, nec pharetra tortor luctus. Integer hendrerit nibh quis molestie accumsan. Pellentesque rhoncus aliquam mattis. Cras et arcu sed dui facilisis varius. Proin nec nunc lectus. Sed tincidunt odio eget enim aliquet volutpat. Donec pulvinar consectetur varius. Duis lorem sapien, fermentum sed dui at, finibus dignissim tellus. Phasellus a suscipit dolor.";

const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec arcu pharetra, placerat tellus eu, aliquet ligula. In efficitur nisi a blandit tristique. Curabitur in ante vel quam mattis ornare. Praesent dictum pretium elit eget efficitur. Vivamus eleifend nisi nec magna pretium, sit amet pellentesque ligula congue. Cras fermentum nulla eu fermentum lobortis. Maecenas feugiat eleifend massa.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: true})); // For body parsing
app.use(express.static("public")); // Allows for CSS to be used in the app

// An array for each blog post
let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    homeIntro: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postText
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
