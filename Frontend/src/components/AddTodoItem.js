import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import React, { useState } from 'react'

export const AddTodoItem = ({ errorMessage, handleAdd }) => {
  const [description, setDescription] = useState('')
  const isInvalid = errorMessage !== undefined

  return (
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
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
            aria-errormessage="formAddTodoItemError"
            onChange={(evt) => setDescription(evt.target.value)}
          />
          <Form.Control.Feedback id="formAddTodoItemError" aria-live="assertive" type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" onClick={() => handleAdd(description)}>
            Add Item
          </Button>
          <Button variant="secondary" onClick={() => setDescription('')}>
            Clear
          </Button>
        </Stack>
      </Form.Group>
    </Container>
  )
}
