import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const MealCard = ({ meal }) => {
  return (
    <>
      <Card className="my-3 p-3" rounded="true">
        <Link to={`/meals/${meal.mealId}`}>
          <Card.Img src={meal.picture} variant="top" width="300" height="300" />
        </Link>
        <Card.Body>
          <Link to={`/meals/${meal.mealId}`}>
            <Card.Title as="div">
              <strong>{meal.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">Location : {meal.location}</div>
          </Card.Text>
          <Card.Text as="div">Quantity : {meal.qty}</Card.Text>
          <Card.Text as="div">Description : {meal.description}</Card.Text>
          <Card.Text as="div">Notes : {meal.notes}</Card.Text>
          <Card.Text as="div">
            <div>
              Available from {meal.cookingDate} To {meal.expirationDate}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default MealCard;
