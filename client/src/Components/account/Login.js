import React, { useContext, useState } from 'react'
import { Box, Button, TextField, styled, Typography } from '@mui/material'
import { createUser, loginUser } from '../../service/api'
import { DataContext } from '../../Context/dataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
   width:400px;
   margin:auto;
   box-shadow:0px 1px 5px 1px rgb(0 0 0 / 60%);
`;

const Image = styled('img')({
   width: 130,
   margin: "auto",
   display: "flex",
   padding: "50px 0 0",
});

const Wrapper = styled(Box)`
   padding: 25px 35px;
   display:flex;
   flex:1;
   flex-direction:column;
   & > div,& > p {
      margin-top:20px;
   }
`;

const LoginBtn = styled(Button)`
   text-transform:none;
   border-radius:2px;
   color:#fff;
   height:48px;
   margin-top:40px;
`;

const SignupBtn = styled(Button)`
   text-transform:none;
   border-radius:2px;
   height:48px;
   margin-top:20px;
`;

const signupIntitialValues = {
   name: "",
   email: "",
   password: ""
}

const loginIntitialValues = {
   name: "",
   email: "",
   password: ""
}

const Error = styled(Typography)`
   font-size:13px;
   color:red;
   font-weight:600;
`;

const Login = ({ isUserAuthenticated }) => {
   const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
   const [account, toggleAccount] = useState("signup");
   const [signup, setSignup] = useState(signupIntitialValues);
   const [login, setLogin] = useState(loginIntitialValues);
   const [error, setError] = useState('');
   const { setAccount } = useContext(DataContext);
   const navigate = useNavigate();


   const togglePage = () => {
      toggleAccount(account === 'login' ? "signup" : "login")
      setSignup(signupIntitialValues);
      setLogin(loginIntitialValues);
      setError('')
   }

   const onSigninInputChange = (e) => {
      setSignup({ ...signup, [e.target.name]: e.target.value })
   }

   const onLogininInputChange = (e) => {
      setLogin({ ...login, [e.target.name]: e.target.value })
   }

   const signupUser = async () => {
      let res = await createUser(signup)
      console.log(res);
      if (res.data.success) {
         setSignup(signupIntitialValues)
         togglePage();
      } else {
         setError('Something went Wrong')
      }
   }

   const loginUserClick = async () => {
      let res = await loginUser(login);
      console.log(res);
      if (res.data?.success) {
         setLogin(loginIntitialValues)
         setError('');
         navigate('/?category=All')
         isUserAuthenticated(true);

         sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`)
         sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`)
         setAccount({ email: res.data.email, name: res.data.name })
      } else {
         setError(res.error)
      }
   }

   return (
      <Component>
         <Box>
            <Image src={imageURL} alt="logn-in" />
            <Wrapper>
               {
                  account === "login" ?
                     <>
                        <TextField label="Enter Email Id" name="email" value={login["email"]} onChange={onLogininInputChange} variant="standard" />
                        <TextField label="Enter Password" name="password" value={login["password"]} onChange={onLogininInputChange} variant="standard" type="password" />
                        {error && <Error>**{error}**</Error >}
                        <LoginBtn variant="contained" onClick={loginUserClick}>Login</LoginBtn>
                        <Typography style={{ textAlign: "center", color: "#878787" }}>OR</Typography>
                        <SignupBtn variant="outlined" onClick={togglePage}>Create an account</SignupBtn>
                     </>
                     :
                     <>
                        <TextField onChange={onSigninInputChange} name="name" value={signup["name"]} label="Enter Name" variant="standard" />
                        <TextField onChange={onSigninInputChange} name="email" value={signup["email"]} label="Enter Email Id" variant="standard" />
                        <TextField onChange={onSigninInputChange} name="password" value={signup["password"]} label="Enter Password" variant="standard" type="password" />

                        {error && <Error>**{error}**</Error >}
                        <LoginBtn variant="contained" onClick={signupUser}>Signup</LoginBtn>
                        <Typography style={{ textAlign: "center", color: "#878787" }}>OR</Typography>
                        <SignupBtn variant="outlined" onClick={togglePage}>Already have an account</SignupBtn>
                     </>
               }
            </Wrapper>
         </Box>
      </Component>
   )
}

export default Login