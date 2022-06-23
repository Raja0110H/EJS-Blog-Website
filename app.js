//jshint esversion:6

const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const homeTitle = "";
const homePost = `<h1 style= " opacity:50% ;  text-align: center">No Blog Post Yet !!!</h1> <img src="https://i.morioh.com/200919/f293d32f.webp" 
                alt="" style="width: 250% ; height: 600px; margin-top: 20px ;" >`;
const aboutContent = `
<div style= "margin-top:10% ; font-size:20px ">
<p>👋 Hi, My name is Raja, you can call me Rj</p>
 <p>🌱 I’m a FrontEnd-Developer,On the road to becoming a MernStack developer</p>
<p>I enjoy learning new Technologies.</p>
<p>👀 I’m a huge soccer fan and I love being creative.</p>
<p>I enjoy pushing myself to be the best me I can be.</p>
<p>I like problem solving because I enjoy the challenge.</p>
<p>I feel overcoming any challenge presented to me helps me in reaching my full potential.</p>
<p>💞️ I have great skill in converting client's desires and ideas into reality, aiming at high revenues and great user experiences.</p>
<p>I hold high loyalty, reliability, authenticity, and helping others achieve their success. This is why I see projects through to the end of success.</p>
 <p>My goal is to contribute to my team's success through hard work, attention to detail, and excellent organizational skills.</p>
<p>📫 You can email me at rajahamilton0110@gmail.com</p>
</div>`;

const contactContent = `<h1 style= " ;  text-align: center">Contact me</h1> 
<h3>Name:  Raja Hamilton</h3> <h3>
Email:  Rajahamilton0110@gmail.com</h3>
<h3>Phone:  786-916-4933</h3>
<strong><p style= "margin-top:30% ; text-align: center ;font-size:30px">Thank you for your consideration</p></strong>
`;

const app = express();
const postList = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  if (postList.length === 0 ) {
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
    imageUrl: req.body.urlImage,
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
      res.render("post", {
        title: post.title,
        post: post.content,
        imageUrl: post.imageUrl,
      });
    
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
