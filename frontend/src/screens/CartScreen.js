import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const roundId = match.params.id;

  const amount = location.search ? Number(location.search.split("=")[1]) : 300;

  const dispatch = useDispatch();

  useEffect(() => {
    if (roundId) {
      dispatch(addToCart(roundId, amount));
    }
  }, [dispatch, roundId, amount]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    console.log(id);
  };

  const checkoutHandler = () => {
    // history.push('/login?redirect=shipping')
    console.log("checkout");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Row>
      <Col md={8}>
        <h1>Meals Booked</h1>
        {cartItems.length === 0 ? (
          <Message>
            You did not booked any meal for pickup <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.meal}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/meal/${item.meal}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.description}</Col>
                  <Col md={2}>Expiration Date: {item.date}</Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.meal)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal () Meals Booked</h2>
              Location : {cartItems.length !== 0 ? cartItems[0].location : ""}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={
                  cartItems.length !== 0 ? cartItems[0].qty === 0 : true
                }
                onClick={checkoutHandler}
              >
                Proceed To Pickup
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
