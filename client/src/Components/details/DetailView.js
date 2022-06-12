import React, { useContext, useEffect, useState } from 'react'
import { Box, styled, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { readPost, deletePost } from '../../service/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '../../Context/dataProvider'
const Image = styled('img')({
   width: "100%",
   height: "50vh",
   objectFit: "cover",

});

const Conatiner = styled(Box)(({ theme }) => ({
   margin: "50px 100px",
   [theme.breakpoints.down("md")]: {
      margin: "20px 10px"
   }
}))

const Heading = styled(Typography)`
   font-size:34px;
   font-weight:600;
   text-align:center;
   margin:50px 0 10px 0;
   word-break:break-word;
`;

const Edit = styled(EditIcon)`
   margin:5px;
   padding:5px;
   border:1px solid #878787;
   border-radius:10px;
   color:blue;
`;

const Delete = styled(DeleteIcon)`
   margin:5px;
   padding:5px;
   border:1px solid #878787;
   border-radius:10px;
   color:red;
`;

const Text = styled(Typography)`
   color:#878787;
   font-size:14px;
`;

const Cmp = styled(Box)`   
   display:flex;
   justify-content: space-between;
`;

const DetailView = () => {

   const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
   const { id } = useParams()

   const [post, setPost] = useState({});
   const { account } = useContext(DataContext)
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         let res = await readPost(id)
         if (res.data.success) setPost(res.data.msg)
      }
      fetchData()
   }, [id])

   const deleteBlog = async () => {
      let res = await deletePost(id)
      if (res.data.success) {
         navigate('/');
      }
   }

   return (
      <Conatiner>
         <Image src={url} alt="" />
         <Box style={{ float: "right" }}>
            {
               account.email === post.email &&
               <>
                  <Link to={`/update/${id}`}><Edit /></Link>
                  <Delete onClick={deleteBlog} style={{ cursor: "pointer" }} />
               </>
            }
         </Box>
         <Heading>{post.title}</Heading>


         <Cmp >
            <Text>By {post.email}</Text>
            <Text>Created At {new Date(post.createDate).toDateString()}</Text>

         </Cmp>
         <Typography style={{ marginTop: "20px", wordBreak: "break-word" }}>{post.description}</Typography>

      </Conatiner>
   )
}

export default DetailView