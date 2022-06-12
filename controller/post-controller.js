import Blog from "../models/blog.js"

export const savePost = async (req, res) => {
   try {
      const blog = await new Blog(req.body);
      blog.save();

      res.status(200).json({ success: true, msg: "add successfully" })
   } catch (error) {
      res.status(400).json({
         success: false,
         error: ['Title should be unique.', 'Title and Description can not be Empty.']
      })
   }
}

export const readPosts = async (req, res) => {
   try {
      const { category } = req.query;
      let blogs;
      if (category === 'All') {
         blogs = await Blog.find({});
      } else {
         blogs = await Blog.find({ categories: category });
      }
      res.status(200).json({ success: true, msg: blogs })
   } catch (error) {
      res.status(400).json({
         success: false,
         error: ['Not Found']
      })
   }
}

export const readPost = async (req, res) => {
   try {
      let blog = await Blog.findById(req.params.id);
      res.status(200).json({ success: true, msg: blog })
   } catch (error) {
      res.status(400).json({
         success: false,
         error: ['Not Found']
      })
   }
}

export const updatePost = async (req, res) => {
   try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
         res.status(400).json({
            success: false,
            error: ['Post Not Found']
         })
      }
      await Blog.findByIdAndUpdate(req.params.id, { $set: req.body })
      res.status(200).json({ success: true, msg: "updated successfully" })
   } catch (error) {
      res.status(400).json({
         success: false,
         error: ['Title should be unique.', 'Title and Description can not be Empty.']
      })
   }
}

export const deletePost = async (req, res) => {
   try {
      let blog = await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, msg: "deleted successfully" })
   } catch (error) {
      res.status(400).json({
         success: false,
         error: ['Not Found']
      })
   }
}

