import React, { useContext, useEffect, useState } from 'react'
import { Box, styled, FormControl, Button, TextField, TextareaAutosize } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../../Context/dataProvider';
import { blogPost } from '../../service/api';


const Cnt = styled(Box)(({ theme }) => ({
   margin: "50px 100px",
   [theme.breakpoints.down("md")]: {
      margin: "20px 10px"
   }
}))

const Image = styled('img')({
   width: "100%",
   height: "50vh",
   objectFit: "cover",

});

const StyledFormControl = styled(FormControl)`
   margin-top:10px;
   display:flex;
   flex-direction:row;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
   width:100%;
   margin-top:50px;
   font-size:18px;
   border:none;
   &:focus-visible{
      outline:none;
   }
`;

const InputTextField = styled(TextField)`
   flex:1;
   margin:0 30px;
`;

const IntialPost = {
   title: '',
   description: '',
   picture: '',
   email: '',
   categories: 'All',
   createDate: new Date()
}

const CreatePost = () => {

   const [post, setPost] = useState(IntialPost);
   const [file, setFile] = useState('');
   const location = useLocation();
   const { account } = useContext(DataContext)
   const navigate = useNavigate()

   const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

   const handleChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
   }

   useEffect(() => {
      // const getImage = async () => {
      //    if (file) {
      //       const data = new FormData();
      //       data.append("name", file.name)
      //       data.append("file", file);

      //       // API call
      //       // post.picture = await fileUpload(data)
      //    }
      // }
      // getImage();
      post.categories = (location.search?.split('=')[1] ? location.search?.split('=')[1] : 'All')
      post.email = account.email;
   }, [file, account, location, post])

   console.log(post);

   const savePost = async () => {
      let res = await blogPost(post)
      if (res.data.success) {
         navigate("/")
      }
   }

   return (
      <Cnt>
         <Image src={url} alt="" />

         <StyledFormControl>
            <label htmlFor="fileInput"><AddCircleIcon fontSize={'large'} color='action' /></label>
            <input type="file" id="fileInput"
               style={{ display: "none" }}
               onChange={(e) => setFile(e.target.files[0])}></input>

            <InputTextField label='Title' size='small' onChange={(e) => handleChange(e)} name='title' />
            <Button variant='contained' onClick={savePost}>Publish</Button>
         </StyledFormControl>
         <StyledTextareaAutosize name='description' minRows={5} placeholder='Tell your story...' onChange={(e) => handleChange(e)} />
      </Cnt>
   )
}

export default CreatePost