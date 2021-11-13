import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RoundScreen from "./screens/RoundScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MealScreen from "./screens/MealScreen";
import CreateMealScreen from "./screens/CreateMealScreen";
import DonateScreen from "./screens/DonateScreen";
import PickupAddressScreen from "./screens/PickupAddressScreen";
import BookMealScreen from "./screens/BookMealScreen";
import PickupScreen from "./screens/PickupScreen";
import MealsListScreen from "./screens/MealsListScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/pickup/:id" component={PickupScreen} />
          <Route path="/bookmeal" component={BookMealScreen} />
          <Route path="/payment" component={DonateScreen} />
          <Route path="/addressnotes" component={PickupAddressScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/meal/:id" component={MealScreen} />
          <Route path="/mealByUser" component={MealsListScreen} />
          <Route path="/meals/:id" component={MealScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/createmeal" component={CreateMealScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
