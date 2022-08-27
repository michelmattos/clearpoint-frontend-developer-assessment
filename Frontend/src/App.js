import './App.css'
import { Image, Alert, Container, Row, Col, ToastContainer, Toast } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'
import { AddTodoItem } from './components/AddTodoItem'
import { TodoItems } from './components/TodoItems'

const axios = require('axios')

const App = () => {
  const [items, setItems] = useState([])
  const [addTodoErrorMessage, setAddTodoErrorMessage] = useState()
  const [getItemsErrorMessage, setGetItemsErrorMessage] = useState()
  const [toggleTodoErrorMessage, setToggleTodoErrorMessage] = useState()

  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    getItems()
  }, [])

  async function getItems() {
    try {
      const res = await axios.get('http://localhost:7000/api/todoItems')
      if (res.data && isMounted.current) {
        setItems(res.data)
        setGetItemsErrorMessage(undefined)
      }
    } catch (error) {
      if (isMounted.current) {
        setGetItemsErrorMessage(error.response.data)
      }
    }
  }

  async function handleAdd(description) {
    try {
      await axios.post('http://localhost:7000/api/todoItems', { description, isCompleted: false })
      await getItems()
      if (isMounted.current) {
        setAddTodoErrorMessage(undefined)
      }
    } catch (error) {
      if (isMounted.current) {
        setAddTodoErrorMessage(error.response.data)
      }
    }
  }

  async function handleMarkAsComplete(item) {
    try {
      await axios.put(`http://localhost:7000/api/todoItems/${item.id}`, { ...item, isCompleted: !item.isCompleted })
      await getItems()
      if (isMounted.current) {
        setToggleTodoErrorMessage(undefined)
      }
    } catch (error) {
      if (isMounted.current) {
        setToggleTodoErrorMessage(error.response.data)
      }
    }
  }

  return (
    <div className="App position-relative">
      <ToastContainer data-testid="toasts" aria-live="polite" position="top-end" className="p-3">
        <Toast
          show={getItemsErrorMessage !== undefined}
          onClose={() => setGetItemsErrorMessage(undefined)}
          autohide
          delay={4000}
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto">Something went wrong</strong>
          </Toast.Header>
          <Toast.Body>{getItemsErrorMessage}</Toast.Body>
        </Toast>
        <Toast
          show={toggleTodoErrorMessage !== undefined}
          onClose={() => setToggleTodoErrorMessage(undefined)}
          autohide
          delay={4000}
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto">Something went wrong</strong>
          </Toast.Header>
          <Toast.Body>{toggleTodoErrorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container>
        <Row>
          <Col>
            <Image src="clearPointLogo.png" fluid rounded />
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="success">
              <Alert.Heading>Todo List App</Alert.Heading>
              Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean so your
              task(s) are as follows:
              <br />
              <br />
              <ol className="list-left">
                <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
                <li>
                  Display (GET) all the current Todo Items in the below grid and display them in any order you wish
                </li>
                <li>
                  Bonus points for completing the 'Mark as completed' button code for allowing users to update and mark
                  a specific Todo Item as completed and for displaying any relevant validation errors/ messages from the
                  API in the UI
                </li>
                <li>Feel free to add unit tests and refactor the component(s) as best you see fit</li>
              </ol>
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddTodoItem handleAdd={handleAdd} errorMessage={addTodoErrorMessage} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <TodoItems items={items} getItems={getItems} handleMarkAsComplete={handleMarkAsComplete} />
          </Col>
        </Row>
      </Container>
      <footer className="page-footer font-small teal pt-4">
        <div className="footer-copyright text-center py-3">
          © 2021 Copyright:
          <a href="https://clearpoint.digital" target="_blank" rel="noreferrer">
            clearpoint.digital
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
