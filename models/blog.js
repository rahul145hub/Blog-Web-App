import mongoose from 'mongoose'


const BlogSchema = mongoose.Schema({
   title: {
      type: String,
      required: true,
      unique: true
   },
   description: {
      type: String,
      required: true,
   },
   picture: {
      type: String,
   },
   email: {
      type: String,
      required: true,
   },
   categories: {
      type: String,
      required: true,
   },
   createDate: {
      type: String,
      required: true,
   }
})
const Blog = mongoose.model('blog', BlogSchema);

export default Blog;