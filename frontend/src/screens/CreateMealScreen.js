import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { MEAL_CREATE_RESET } from "../constants/mealConstants";

import { createMeal } from "../actions/mealActions";

const CreateMealScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("/images/meal1.jpeg");
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [cookingDate, setCookingDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  //Get the Login user Info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const mealCreated = useSelector((state) => state.mealCreate);
  const { meal, success, error } = mealCreated;

  // const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (success) {
      history.push(`/`);
      dispatch({ type: MEAL_CREATE_RESET });
    }
  }, [history, success]);

  const createMealHandler = (e) => {
    e.preventDefault();
    //dispatch createMeal
    if (name == "") {
      setMessage("Name Can not be empty");
    } else {
      dispatch(
        createMeal({
          name: name,
          location: location,
          description: description,
          notes: notes,
          picture: picture,
          qty: qty,
          isAvailable: isAvailable,
          cookingDate: cookingDate,
          expirationDate: expirationDate,
        })
      );
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Post a meal</h1>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={createMealHandler}>
          <Form.Group controlId="name">
            <Form.Label>Meal Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Meal Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="location" className="mb-3">
            <Form.Label>Meal Location</Form.Label>
            <Form.Control
              type="location"
              placeholder="City or Zip Code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Meaal Picture</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            ></Form.Control>
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              //onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="notes">
            <Form.Label>Pickup Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              placeholder="Enter Pickup Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="qty">
            <Form.Label> Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter The Quantity"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="cookingDate">
            <Form.Label>Cooking Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM-DD-YYYY"
              value={cookingDate}
              onChange={(e) => setCookingDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="expirationDate">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM-DD-YYYY"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Post the Meal
          </Button>
        </Form>
      </FormContainer>
      ;
    </>
  );
};

export default CreateMealScreen;
