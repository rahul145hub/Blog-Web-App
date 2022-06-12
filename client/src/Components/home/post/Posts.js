import React, { useEffect, useState } from 'react'
import { readPosts } from '../../../service/api';
import Post from './Post';
import { Box, Grid } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom';

const Posts = () => {

   const [posts, setPosts] = useState([]);
   const [searchParams] = useSearchParams()
   const category = (searchParams.get("category") ? searchParams.get("category") : "All");

   useEffect(() => {

      const fetchData = async () => {
         const res = await readPosts(category);
         if (res.data.success) {
            console.log(res);
            setPosts(res.data.msg)
         }
      }
      fetchData();
   }, [category])

   return (
      <Grid container style={{ marginTop: "4px" }}>
         {
            posts && posts.length > 0 ? posts.map((post, ind) => (
               <Grid key={post._id} item lg={3} md={4} sm={12}>
                  <Link to={`/detail/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                     <Post post={post} />
                  </Link>
               </Grid>

            ))
               :
               <Box>No data is there</Box>
         }
      </Grid >
   )
}

export default Posts