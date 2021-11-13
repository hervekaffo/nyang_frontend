import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
//import { listRoundDetails } from "../actions/roundActions";
import { mealDetails } from "../actions/mealActions";

const MealScreen = ({ history, match }) => {
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const mealDetail = useSelector((state) => state.mealDetails);
  const { loading, error, meal } = mealDetail;

  useEffect(() => {
    dispatch(mealDetails(match.params.id));
  }, [dispatch, match]);

  const PickMealHandler = () => {
    history.push(`/cart/${match.params.id}?amount=${amount}`);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={meal.picture} alt={meal.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>{meal.name}</ListGroup.Item>
              <ListGroup.Item>
                <Rating value={3} text={`user reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>
                Available from {meal.cookingDate} To {meal.expirationDate}
              </ListGroup.Item>
              <ListGroup.Item>Pickup Notes : {meal.notes}</ListGroup.Item>
              <ListGroup.Item>Cook : </ListGroup.Item>
              <ListGroup.Item></ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Donale:</Col>
                    <Col>$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    {/* <Col>
                      {round.amount_collected === 3000
                        ? "Completed"
                        : "On Going"}
                    </Col> */}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={PickMealHandler}
                    className="btn-block"
                    type="button"
                    disabled={meal.qty === 0}
                  >
                    Book this Meal
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default MealScreen;
