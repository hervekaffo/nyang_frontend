import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

//import {savePickupAddress } from '../actions/cartActions'

const DonateScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  //const { shippingAddress } = cart

  // if (!shippingAddress) {
  //     history.push('/shipping')
  //   }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [amount, setAmount] = useState(5);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(savePaymentMethod(paymentMethod))
    history.push("/bookmeal");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Donate </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="amount">
          <Form.Label> Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="5"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
      <Button variant="secondary">Skip</Button>
    </FormContainer>
  );
};

export default DonateScreen;
