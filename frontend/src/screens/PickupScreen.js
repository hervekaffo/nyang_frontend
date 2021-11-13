import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import {
//   getOrderDetails,
//   payOrder,
//   deliverOrder,
// } from '../actions/orderActions'
// import {
//   ORDER_PAY_RESET,
//   ORDER_DELIVER_RESET,
// } from '../constants/orderConstants'

const PickupScreen = ({ match, history }) => {
  const pickupId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const [isPicked, setIsPicked] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  //   const orderDetails = useSelector((state) => state.orderDetails)
  //   const { order, loading, error } = orderDetails

  //   const orderPay = useSelector((state) => state.orderPay)
  //   const { loading: loadingPay, success: successPay } = orderPay

  //   const orderDeliver = useSelector((state) => state.orderDeliver)
  //   const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  //Select the meal to pickup
  const pickedMeal = useSelector((state) => state.mealDetails);
  const { meal } = pickedMeal;
  const cook = meal.userDetails;
  const ads = cook.addresses;

  const clientId = "";

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      //const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // if (!order || successPay || successDeliver || order._id !== orderId) {
    //   dispatch({ type: ORDER_PAY_RESET })
    //   dispatch({ type: ORDER_DELIVER_RESET })
    //   dispatch(getOrderDetails(orderId))
    // } else if (!order.isPaid) {
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
    // }
  }, []);

  return (
    <>
      <h1>Pickup: </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Pickup Info </h2>
              <p>
                <Image
                  src={cook.picture}
                  alt={cook.lastName}
                  fluid
                  rounded
                  height="200"
                  width="200"
                />
              </p>
              <p>
                <strong>
                  Cook: {cook.firstName} {cook.lastName}
                </strong>
              </p>
              <p>
                <strong>Email: </strong> <a href={`#`}>{cook.email}</a>
              </p>
              <p>
                <strong>Addresses: </strong>
                {ads.map((ad) => (
                  <div>
                    City: {ad.city} Country: {ad.country} StreetName:{" "}
                    {ad.streetName} Zip: {ad.postalCode}
                  </div>
                ))}
              </p>
              <p>
                <button>Mark AS Picked</button>
              </p>
              {isPicked ? (
                <Message variant="success">Picked on 11-10-2021 :</Message>
              ) : (
                <Message variant="danger">Not Picked</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Donation Payment Method</h2>
              <p>
                <strong>Method: </strong>
                Paypal
              </p>
              {/* {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : ( */}
              <Message variant="danger">Not Paid</Message>
              {/* )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Meals </h2>
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/meal/${item.meal}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {"Qty: "}
                        {item.qty} {"  "} {item.description}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Pickup Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Donation: $5</Col>
                  <Col></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => setIsPicked(true)}
                    >
                      <i className="fas fa-edit"></i> Mark as Picked
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <PayPalButton amount={5} onSuccess={true} />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PickupScreen;
