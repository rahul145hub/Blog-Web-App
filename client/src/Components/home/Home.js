import { Grid } from '@mui/material'
import React from 'react'
import Banner from '../banner/Banner'
import Categories from './Categories'
import Posts from './post/Posts'


const Home = () => {
   return (
      <>
         <Banner />
         <Grid container>
            <Grid item lg={2} md={4} sm={12}>
               <Categories />
            </Grid>
            <Grid conatiner item lg={10} md={7} sm={12}>
               <Posts />
            </Grid>
         </Grid>
      </>
   )
}

export default Home