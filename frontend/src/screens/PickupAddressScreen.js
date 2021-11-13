import React, { useState } from "react";
import { Form, Button, ListGroupItem, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveAddressAndNotes } from "../actions/cartActions";

const PickupAddressScreen = ({ history }) => {
  const [addresses, setAddresses] = useState(["Addresses"]);
  const [notes, setNotes] = useState([]);

  const cart = useSelector((state) => state.cart);
  const { addressNotes, cartItems } = cart;

  //Select the meal to pickup
  const pickedMeal = useSelector((state) => state.mealDetails);
  const { meal } = pickedMeal;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(saveAddressAndNotes({ addresses, notes }));
    let not = [];
    {
      cartItems.map((note) => not.push(note.notes));
    }
    setNotes(not);
    console.log(not);
    history.push("/payment");
  };

  const ads = meal.userDetails.addresses;

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Pickup Address and Notes</h1>

      <ListGroupItem>
        <h3> Adresses</h3>
      </ListGroupItem>
      <p>
        {ads.map((ad) => (
          <div>
            City: {ad.city} Country: {ad.country} StreetName: {ad.streetName}{" "}
            Zip: {ad.postalCode}
          </div>
        ))}{" "}
      </p>
      <ListGroupItem>
        <h3> Notes</h3>
      </ListGroupItem>
      {cartItems.map((note) => {
        return <div>{note.notes} </div>;
      })}
      <Button type="submit" variant="primary" onClick={submitHandler}>
        Continue
      </Button>
    </FormContainer>
  );
};

export default PickupAddressScreen;
