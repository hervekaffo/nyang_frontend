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
import Round from "../components/Round";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listRoundDetails } from "../actions/roundActions";

const RoundScreen = ({ history, match }) => {
  const [amount, setAmount] = useState(300);

  const dispatch = useDispatch();

  const roundDetails = useSelector((state) => state.roundDetails);
  const { loading, error, round } = roundDetails;

  useEffect(() => {
    dispatch(listRoundDetails(match.params.id));
  }, [dispatch, match]);

  const PayDjanguiHandler = () => {
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
            <Image src={round.image} alt={round.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>{round.name}</ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={round.rating}
                  text={`${round.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                ${round.amount_collected} Collected from $
                {round.amount_expected} Expected
              </ListGroup.Item>
              <ListGroup.Item>Administrator Notes :</ListGroup.Item>
              <ListGroup.Item>Beneficiary : {round.beneficiary}</ListGroup.Item>
              <ListGroup.Item>
                Started: {round.starting_date} Due Date : {round.date}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Collected:</Col>
                    <Col>${round.amount_collected}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {round.amount_collected === 3000
                        ? "Completed"
                        : "On Going"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={PayDjanguiHandler}
                    className="btn-block"
                    type="button"
                    disabled={round.amount_collected === 3000}
                  >
                    Pay This Djangui
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

export default RoundScreen;
