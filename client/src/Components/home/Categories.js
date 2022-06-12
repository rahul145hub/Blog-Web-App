import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import React from 'react'
import { categories } from '../../constants/data'
import { Link, useSearchParams } from 'react-router-dom'

const StyledTable = styled(Table)`
   border :1px solid rgba(244,244,244,1);
`;

const StyledBtn = styled(Button)`
   margin:20px;
   width:85%;
   background:#6495ED;
   color:#fff;
   border-radius:1px;
   
`;

const Categories = () => {
   const [searchParams] = useSearchParams();
   const category = (searchParams.get("category") ? searchParams.get("category") : 'All')

   return (
      <>
         <Link to={`/create?category=${category}`} style={{ textDecoration: "none" }}>
            <StyledBtn variant='contained'>Create Blog</StyledBtn>
         </Link>
         <StyledTable>
            <TableHead>
               <TableRow>
                  <TableCell>
                     <Link to='/?category=All' style={{ color: "black", textDecoration: "none" }}>
                        All Categories
                     </Link>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {
                  categories.map((category) => (
                     <TableRow key={category.id}>
                        <TableCell>
                           <Link to={`/?category=${category.type}`} style={{ color: "black", textDecoration: "none" }}>{category.type}</Link></TableCell>
                     </TableRow>
                  ))
               }

            </TableBody>
         </StyledTable>
      </>
   )
}

export default Categories