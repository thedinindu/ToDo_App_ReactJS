import { Modal, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Button, InputLabel, FormControl, Input } from '@material-ui/core'
import React, { useState } from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import db from '../../firebase'
import './Todo.css'

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      textAlign: 'center',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

  }));

function Todo(props) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle);
    const [ open, setOpen ] = useState(false)
    const [ input, setInput ] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const updateTodo = (event) => {
        event.preventDefault()
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false)
    }

    return (
        <div className="todo__main">
            <Modal className="modal" open={open} onClose={handleClose} >
                <form>
                    <div style={modalStyle} className={classes.paper}>
                        <FormControl>
                        <InputLabel> ✍  Edit Todo</InputLabel>
                            <Input type="text" value={input} onChange={event => setInput(event.target.value)} />
                        </FormControl>
                        <Button type="submit" onClick={updateTodo} variant="contained" color="primary" >Edit</Button>
                    </div>
                </form>
            </Modal>
            
            <List>
                <ListItem className='list__contents'>
                    <ListItemAvatar className='todos'>
                        <ListItemText style={{color: '#B3B3B3'}}  primary={props.todo.todo} />
                        <div className='list__buttons'>
                            <EditIcon className="edit__button" type="button" onClick={handleOpen} />
                            <DeleteForeverIcon className="delete__button" onClick={() => db.collection('todos').doc(props.todo.id).delete()} />
                        </div>
                    </ListItemAvatar>
                </ListItem>
                
            </List>
        </div>
        
    )
}

export default Todo
