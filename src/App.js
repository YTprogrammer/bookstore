import React, {useEffect} from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { authActions } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";



const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() =>{
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")

    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch, role]);
  return (
   
     <div>
        <Navbar />
      <Routes> 
        <Route exact path="/" element={ <Home />} />
        <Route path="/all-books" element={ <AllBooks />} />
        <Route path="/cart" element={ <Cart />} />
        <Route path="/about-us" element={ <AboutUs />} />
        <Route path="/profile" element={ <Profile />} >
        <Route index element={<Favourites />} />
        <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
        <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/Login" element={ <Login />} />
        <Route path="/SignUp" element={ <SignUp />} />
        <Route path="view-book-details/:id" element={<ViewBookDetails />}/>
      </Routes>  
      <Footer />
       
      
     </div>
      
  );
};

export default App;

