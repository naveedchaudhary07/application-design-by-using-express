let cl = console.log;

const port = 3000;

let blogs = [
  {
    id: "1",
    title: "Getting Started with JavaScript",
    author: "Rahul Sharma",
    description:
      "Learn JavaScript basics, variables, functions, arrays and objects with simple examples.",
    category: "Programming",
  },
  {
    id: "2",
    title: "The Art of Web Design",
    author: "Aman Verma",
    description:
      "Discover how colors, typography and layouts help create attractive and user-friendly websites.",
    category: "Web Design",
  },
  {
    id: "3",
    title: "Exploring the World",
    author: "Priya Patel",
    description:
      "Explore beautiful destinations, discover new cultures and learn tips for planning your next trip.",
    category: "Travel",
  },
  {
    id: "4",
    title: "Healthy Habits for Daily Life",
    author: "Neha Singh",
    description:
      "Build a healthy lifestyle with regular exercise, balanced meals and a consistent sleep schedule.",
    category: "Lifestyle",
  },
  {
    id: "5",
    title: "Understanding REST APIs",
    author: "Vikas Kumar",
    description:
      "Learn how REST APIs work and how HTTP methods like GET, POST, PUT and DELETE manage data.",
    category: "Technology",
  },
];

const express = require("express");

const app = express();

app.use(express.json());

// all blogs get....

app.get("/blogs", (req, res) => {
  try {
    res.status(200).json({
      ok: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message,
      message: "Err while fetching Blogs!!!",
    });
  }
});

// single blogs get....

app.get("/blogs/:id", (req, res) => {
  try {
    let findblogs = blogs.find((bl) => bl.id === req.params.id);
    if (!findblogs) {
      return res.status(404).json({
        ok: false,
        message: `blogs with id ${req.params.id} is doesnt exists`,
      });
    }

    res.status(200).json({
      ok: true,
      message: `blog with id ${req.params.id} is fetched succesfully`,
      data: findblogs,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `something error while fetching blogs`,
      error: err.message,
    });
  }
});

// blogs create....

app.post("/blogs", (req, res) => {
  try {
    if (!req.body.title || !req.body.author) {
      return res.status(400).json({
        ok: false,
        message: "title and author must be required while creating blogs",
      });
    }
    const newblogs = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description || "Empty",
      category: req.body.category || "unknown",
      id: Date.now().toString(),
    };

    blogs.push(newblogs);

    res.status(200).json({
      ok: true,
      message: `your blogs with id ${newblogs.id} created successefully`,
      data: newblogs,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `error white create a blog`,
      error: err.message,
    });
  }
});

// update blogs.....

app.patch("/blogs/:id", (req, res) => {
  try {
    let updatedblogs = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      category: req.body.category,
      id:req.params.id
    };

    let findidx = blogs.findIndex((bl) => bl.id === req.params.id);
    if (findidx === -1) {
      return res.status(404).json({
        ok: false,
        message: `blog with id ${req.blogs.id} does not exists`,
      });
    }

    res.status(200).json({
      ok: true,
      message: `your blogs with id ${req.params.id} updated successefully`,
      data: updatedblogs,
    });
    blogs[findidx] = updatedblogs;
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: `Blog with id ${req.params.id} failed to update`,
      error: err.message,
    });
  }
});



app.delete("/blogs/:id",(req,res)=>{
  try{
    let findidx= blogs.findIndex((bl)=>bl.id===req.params.id)
    if(findidx===-1){
      res.status(404).json({
        ok:false,
        message:`blog with id ${req.params.id} not found`
      })
    }
    res.status(200).json({
      ok:true,
      message:`blog with id ${req.params.id} deleted successfully`,
      data:req.body
    })
    blogs.splice(findidx,1)
  }
  catch(err){
    res.status(500).json({
      ok:false,
      message:`blog with id ${req.params.id} deleted successfully`,
      error:err.message
    })
  }
})

app.listen(port, () => {
  cl("server is running");
});
