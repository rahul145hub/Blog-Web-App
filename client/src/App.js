import { Box } from '@mui/material';
import './App.css';
import Login from './Components/account/Login'
import DataProvider from './Context/dataProvider';
import Home from './Components/home/Home'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Header from './Components/header/Header';
import { useState } from 'react';
import CreatePost from './Components/create/CreatePost';
import UpdatePost from './Components/create/UpdatePost';
import DetailView from './Components/details/DetailView';
import Contact from './Components/contact/Contact';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
   return isAuthenticated ?
      <>
         <Header />
         <Outlet />
      </>
      : <Navigate replace to='/login' />
}



function App() {
   const [isAuthenticated, isUserAuthenticated] = useState(false);
   return (
      <DataProvider>
         <BrowserRouter>
            <Box style={{ marginTop: "64px" }}>
               <Routes>
                  <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
                  <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                     <Route path='/' element={<Home />} />
                  </Route>
                  <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                     <Route path='/create' element={<CreatePost />} />
                  </Route>
                  <Route path='/detail/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                     <Route path='/detail/:id' element={<DetailView />} />
                  </Route>
                  <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                     <Route path='/update/:id' element={<UpdatePost />} />
                  </Route>

                  <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                     <Route path='/contact' element={<Contact />} />
                  </Route>
               </Routes>
            </Box>
         </BrowserRouter>
      </DataProvider >

   );
}

export default App;
