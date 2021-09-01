import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Round = ({ round }) => {
  return (
    <>
      <Card className="my-3 p-3" rounded="true">
        <Link to={`/round/${round.roundId}`}>
          <Card.Img src={round.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/round/${round.roundId}`}>
            <Card.Title as="div">
              <strong>{round.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={round.rating}
                text={`${round.numReviews} reviews`}
              />
              Beneficiary : {round.beneficiary}
            </div>
          </Card.Text>
          <Card.Text as="div">Participants : {round.participants}</Card.Text>
          <Card.Text as="h4">
            <div className="my-3">
              ${round.amount_collected} Collected from ${round.amount_expected}{" "}
              Expected
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Round;
