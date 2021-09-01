import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Round from "../components/Round.js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listRounds } from "../actions/roundActions";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const roundList = useSelector((state) => state.roundList);

  const { loading, error, rounds } = roundList;

  useEffect(() => {
    dispatch(listRounds());
  }, [dispatch]);

  return (
    <>
      <h1>Recent Tours of the Djangui: 04-02-21 to 07-02-2021 </h1>
      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {rounds.map((round) => (
            <Col key={round.roundId} sm={12} md={6} lg={4} xl={3}>
              <Round round={round} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
