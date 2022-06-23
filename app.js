//jshint esversion:6

const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeTitle = "";
const homePost = `<h1 style= " opacity:30% ;  text-align: center">No Post Yet !!!</h1>`;
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const postList = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  if (postList.length === 0) {
    res.render("home", { title: homePost, post: postList });
    return;
  } else {
    res.render("home", { title: homeTitle, post: postList });
  }
});
app.get("/about", (req, res) => {
  res.render("about", { aboutUs: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactUs: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.titleInput,
    content: req.body.textInput,
  };
  postList.push(post);
  res.redirect("/");
});
app.get("/post/:routeName", (req, res) => {
  const requestTitle = _.lowerCase(req.params.routeName);
  //use forEach method to
  //loop through list and pull out
  // value and save in variable then
  // use if statement to compare
  postList.forEach((post) => {
    const postTitle = _.lowerCase(post.title);
  
    //render page dynamically
    // if name matches title
    if (postTitle === requestTitle) {
      res.render("post", { title: post.title, post: post.content });
      // console.log("match");
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
