import React from 'react';
import { Checkbox, Button, Modal, Icon, Input, Message } from 'semantic-ui-react';

function Todo(props) {

    const completedStyle = {
        fontStyle: "italic",
        color: "gray",
        textDecoration: "line-through"
    }


    const todoItem = props.todos.map(item => 
        <div className="todo">
            <Checkbox   checked={item.completed}
                        style={item.completed ? completedStyle : null} 
                        onChange={() => props.handleChange(item.id)}
                        label={item.todo}
                        onClick ={()=>props.updateTaskStatus(item.id , props.current_category)}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color='red' onClick = {()  => props.deleteTask(item.id , props.current_category)}>Delete</Button>
            <hr/>
        </div>
    );
    if(props.current_category.category !== undefined) {
        return (
            <div className="today">
                <h2>{props.current_category.category}</h2>
                {todoItem}
            <Modal trigger={<Icon name='plus circle' color='blue' size='large' />}>
                        <Modal.Header>Add A New Task</Modal.Header>
                        <Modal.Content>
                        <Modal.Description>
                            <p>What is the task?</p>
                            <Input name="newTask" fluid placeholder='Eg. water the plants etc' onChange={props.updateText} />
                                <br />
                            <Button onClick={() => props.createNewValue('task', props.current_category)} color="teal">Add Task</Button>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    } else {
        return(
                <div>
                    <Message className="mess1"  color = "red">
                        <Message.Header >
                            You haven't selected a category yet
                        </Message.Header>
                            <p>please select a category from the side pannel</p>
                    </Message>
            </div>
        );
    }
    
  }

export default Todo