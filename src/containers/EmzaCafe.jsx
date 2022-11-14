import MainLayout from "../layouts/MainLayout/MainLayout";
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "../pages/Home/Home";
import FAQ from "../pages/FAQ/FAQ";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import ContactUs from "../pages/ContactUs/ContactUs";
import Club from "../pages/Club/Club";
import AboutUs from "../pages/AboutUs/AboutUs";
import Rules from "../pages/Rules/Rules";
import ScrollToTop from "../helper/ScrollToTop";
import Recruitment from "../pages/Recruitment/Recruitment";
import Participation from "../pages/Participation/Participation";
import Market from "../pages/Market/Market";
import ProductMarket from "../pages/ProductMarket/ProductMarket";
import Profile from "../pages/Profile/Profile";
import Address from "../pages/Address/Address";
import Rate from "../pages/Rate/Rate";
import History from "../pages/History/History";
import AddEditAddress from "../pages/AddEditAddress/AddEditAddress";
import EditAddress from "../pages/EditAddress/EditAddress";
import Emza from "../pages/emza/Emza";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import {useSelector} from "react-redux";
import Sentences from "../pages/Sentences/Sentences";
import SelectSentence from "../pages/SelectSentence/SelectSentence";
import SelectFrame from "../pages/SelectFrame/SelectFrame";
import Cart from "../pages/Cart/Cart";
import ReturnPage from "../pages/ReturnPage/ReturnPage";
import DetailOrders from "../pages/DetailOrders/DetailOrders";
import Payment from "../pages/Payment/Payment";
import SearchPage from "../pages/Search/SearchPage";
import Notification from "../pages/Notification/Notification";
import {useEffect} from 'react'
import {preventDragHandler} from "../helper/functions";
import Scroller from "../components/Scroller/Scroller";

const EmzaCafe = () => {

    useEffect(() => {
        const imgs = document.querySelectorAll('img')

        for (var i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener('onDragStart', e => {
                preventDragHandler(e);
            });
        }
    }, [])
    // document.querySelectorAll('img').addEventListener('onDragStart', (e) => {
    //     e.preventDefault();
    // })
    const login = useSelector(state => state.login)
    return (
        <MainLayout>
            {/*<ScrollToTop>*/}
            <Scroller/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/faq" element={<FAQ/>}/>
                {/*<Route path="/login">*/}
                {/*    {login ? <Navigate to="/dashboard"/> : <Login/>}*/}
                {/*</Route>*/}

                <Route path="/login" element={<Login/>}/>
                <Route path="/rules" element={<Rules/>}/>
                <Route path="/recruitment" element={<Recruitment/>}/>
                <Route path="/participation" element={<Participation/>}/>
                <Route path="/contact_us" element={<ContactUs/>}/>
                <Route path="/about_us" element={<AboutUs/>}/>
                <Route path="/product_market/:id" element={<ProductMarket/>}/>
                <Route path="/product_details/:id" element={<ProductDetails/>}/>
                <Route path="/sentences" element={<Sentences/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/select-frame" element={<SelectFrame/>}/>
                <Route path="/select-sentence" element={<SelectSentence/>}/>
                <Route path="/market/:id" element={<Market/>}/>
                <Route path="/emza" element={<Emza/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/return_page" element={<ReturnPage/>}/>
                <Route path="/search/:key" element={<SearchPage/>}/>

                <Route path="/club" element={<Club/>}/>
                <Route path="/dashboard" element={<Dashboard/>}>
                    <Route path='/dashboard/profile' element={<Profile/>}/>
                    <Route path='/dashboard/address' element={<Address/>}/>
                    <Route path='/dashboard/rate' element={<Rate/>}/>
                    <Route path='/dashboard/history' element={<History/>}/>
                    <Route path='/dashboard/notification' element={<Notification/>}/>
                    <Route path='/dashboard/detail_order' element={<DetailOrders/>}/>
                    <Route path='/dashboard/add_edit_address' element={<AddEditAddress/>}/>
                    <Route path='/dashboard/edit_address/:id' element={<EditAddress/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            {/*</ScrollToTop>*/}
        </MainLayout>
    );
};
export default EmzaCafe;