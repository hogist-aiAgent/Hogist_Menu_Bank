import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import App from './../App';
import { MenuHomePage } from '../pages/MenuHomePage';
import { GetStarted } from '../pages/GetStarted/GetStarted';
import { CustomerFav } from '../pages/CustomerFav/CustomerFav';
import ScrollToTop from '../components/common/ScrollToTop';
import PrepareYourMenu  from '../pages/PrepareMenu/PrepareYourMenu';

const MainRoutes = () => {
    return (
        <BrowserRouter basename='/prepare-your-own-menu1/' >
        <ScrollToTop />
        <Routes>
            <Route element={<Navbar/>}>
           
            <Route path='/' element={<MenuHomePage/>}/>
            <Route path='/customerfav' element={<CustomerFav/>}/>
            <Route path='/preparemenu' element={<PrepareYourMenu/>}/>


            {/* <Route path='/' element={<GetStarted/>}/> */}
            {/* <Route path='/' element={<CustomerFav/>}/> */}

            
            </Route>
            
        </Routes>
        </BrowserRouter>
    );
}

export default MainRoutes;
