import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, FormControl, Button } from "react-bootstrap";
import Round from "../components/Round.js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listRounds } from "../actions/roundActions";
import { listMeals } from "../actions/mealActions";
import MealCard from "../components/MealCard.js";

const HomeScreen = ({ match }) => {
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.mealList);

  const { loading, error, meals } = mealList;

  useEffect(() => {
    dispatch(listMeals());
    if (filteredMeals.length === 0) {
      setFilteredMeals(meals);
    }
  }, [dispatch]);

  const searchHannler = (e) => {
    let text = e.target.value;
    if (text === "") {
      setFilteredMeals(meals);
    } else {
      setFilteredMeals(
        meals.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
      );
    }
  };

  console.log(filteredMeals);
  return (
    <>
      <h1>Meals Available for Pickup </h1>

      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search Meals by zipcode or city"
          className="me-2"
          aria-label="Search"
          onChange={searchHannler}
        />
        <Button onClick={searchHannler}>Search</Button>
      </Form>

      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {filteredMeals.length === 0
            ? meals.map((meal) => (
                <Col key={meal.mealId} sm={12} md={6} lg={4} xl={3}>
                  <MealCard meal={meal} />
                </Col>
              ))
            : filteredMeals.map((meal) => (
                <Col key={meal.mealId} sm={12} md={6} lg={4} xl={3}>
                  <MealCard meal={meal} />
                </Col>
              ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
