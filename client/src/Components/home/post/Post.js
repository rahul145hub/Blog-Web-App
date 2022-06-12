import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { addElipsis } from '../../../utils/common-utils';

const Container = styled(Box)`
   border:1px solid #d3cede;
   border-radius:10px;
   margin:10px;
   height:350px;
   display:flex;
   align-items:center;
   flex-direction:column;
   & > p{
      padding:0 5px 5px 5px;
   }
   
`;

const Image = styled('img')({
   width: "100%",
   borderRadius: "10px 10px 0 0",
   objectFit: "cover"
})

const Text = styled(Typography)`
   color:#878787;
   font-size:12px;
`;

const Heading = styled(Typography)`
   font-weight:600;
   font-size:18px;
`;

const Details = styled(Typography)`
   font-size:14px;
   word-break:break-word;
   text-align:justify;
`;


const Post = ({ post }) => {
   const url = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'
   return (
      <Container>
         <Image src={url} alt="url" />
         <Heading>{addElipsis(post.title, 20)}</Heading>
         <Text>{post.categories}</Text>
         <Text>{addElipsis(`By ${post.email}`, 25)}</Text>
         <Details>{addElipsis(post.description, 140)}</Details>
      </Container>
   )
}

export default Post