
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Account from "./components/User/Account";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import UpdateAccount from "./components/User/UpdateAccount";
import UpdatePassword from "./components/User/UpdatePassword"
import store from './store'
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import NotFound from "./components/layouts/NotFound";
import Admin from "./components/Admin/Admin";
import Home from "./components/NavbarOptions/Home";
import ProductOverview from './components/products/ProductOverview'
import Header from './components/layouts/Header'
import Products from "./components/products/Products";
import Checkout from "./components/products/Checkout";
import Payment from './components/products/Payment'
import ConfirmOrder from './components/products/ConfirmOrder'
import OrderSuccess from "./components/products/OrderSuccess";
import MyOrders from "./components/User/MyOrders";
import OrderDetails from "./components/OrderLayout/OrderDetails";
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function App() {


  const { isAuthenticated, user } = useSelector(state => state.users)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v4/stripeapikey")

    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {

    store.dispatch(loadUser());

    getStripeApiKey();

  }, [])


  return (
    <Router>
      <Header />

      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductOverview />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/notfound" element={<NotFound />} />
        <Route excat path="/checkout" element={<Checkout />} />
        {isAuthenticated && <Route excat path="/order/confirm" element={<ConfirmOrder />} /> }
        
        {isAuthenticated && <Route exact path="/account" element={<Account user={user} />} />}
        {isAuthenticated && <Route exact path="/account/update" element={<UpdateAccount />} />}
        {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword />} />}
        {stripeApiKey && (
          <Route exact path="/order/payment/card/process" element={
            (<Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>)
          } />
        )}
        {isAuthenticated && <Route excat path="/success" element={<OrderSuccess />} /> }
        {isAuthenticated && <Route excat path="/orders" element={<MyOrders />} /> }
        {isAuthenticated && <Route excat path="/order/:id" element={<OrderDetails />} /> }

        {isAuthenticated && <Route exact path="/admin/*" element={<Admin />} />}

      </Routes>


    </Router>
  );
}

export default App;
