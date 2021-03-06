const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require("jsonwebtoken")
const { getTokenFrom } = require("../utils/middleware")
require('express-async-errors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
blogRouter.use(jsonParser);


blogRouter.get('/', async (request, response) => {
  console.log('getting all blog posts');
  const blogs = await Blog.find({}).populate('user');

  response.status(200).json(blogs);
});
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  response.status(200).json(blog);
});

blogRouter.post('/', async (request, response) => {
  console.log('posting a blog post by', request.body.author);
  const body = request.body;
  console.log(body);
  if (body.title == undefined || body.url == undefined) {
    return response.sendStatus(400);
  }
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)
  const blog = Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user,
  });

  user.blogList = user.blogList.concat(blog._id);
  await user.save();

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = await Blog.findById(request.params.id).populate("user");
  if (blog.user.username == decodedToken.username) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).json({ status: 'deleted' });
  } else {
    response.status(402).send({ status: 'unauthorized' });
  }

});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  response.json(updatedBlog);
});


module.exports = blogRouter;
