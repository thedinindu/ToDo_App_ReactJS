import React, { useState, useEffect } from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'

import './App.css'
import Todo from './components/Todo/Todo'
import db from './firebase'
import firebase from 'firebase'


function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // getting data from the database once the page loads(only once)
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])

  const addTodo = (event) => {
    event.preventDefault()
    setInput('')
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return (
    <div className="Background">
      <div className="App">
        <h1 className='todo__caption'> 📔 TODO LIST</h1>

        <form className="input__todo">
          <FormControl>
            <InputLabel style={{color: '#B3B3B3'}}>✅ Write a Todo</InputLabel>
            <Input style={{color: '#B3B3B3'}} type="text" value={input} onChange={event => setInput(event.target.value)}/>
          </FormControl>
          <Button className="Button" disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
            Add Todo
          </Button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App