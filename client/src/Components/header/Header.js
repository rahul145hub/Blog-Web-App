import { AppBar, Toolbar, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
   background:#ffffff;
   color:black;
`;

const Container = styled(Toolbar)`
   justify-content:center;
   & > a{
      padding:20px;
      color:inherit;
      text-decoration:none;
   }
`

const Header = () => {

   const logout = async () => {
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("refreshToken")

   }

   return (
      <Component>
         <Container>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/login' onClick={logout}>Logout</Link>
         </Container>
      </Component>
   )
}

export default Header