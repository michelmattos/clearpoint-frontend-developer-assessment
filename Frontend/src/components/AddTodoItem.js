import {Button, Col, Container, Form, Row, Stack} from "react-bootstrap";
import React from "react";

export const AddTodoItem = ({description, handleDescriptionChange, handleAdd, handleClear}) => (
  <Container>
    <h1>Add Item</h1>
    <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
      <Form.Label column sm="2">
        Description
      </Form.Label>
      <Col md="6">
        <Form.Control
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={evt => handleDescriptionChange(evt.target.value)}
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
      <Stack direction="horizontal" gap={2}>
        <Button variant="primary" onClick={() => handleAdd()}>
          Add Item
        </Button>
        <Button variant="secondary" onClick={() => handleClear()}>
          Clear
        </Button>
      </Stack>
    </Form.Group>
  </Container>
)