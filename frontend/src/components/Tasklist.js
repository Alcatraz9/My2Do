import React from "react";
import { Menu, Modal, Button, Input } from 'semantic-ui-react'

function Tasklist(props) {
    
      var style = {
        height: '100vw',
        position: 'fixed',
        top: '-14px',
        zIndex: 1000
      }
      const categs = props.items.map(item => <Menu.Item key={item.id} onClick={() => props.updateTask({item})} name={item.category}/>);
    return (
        <Menu size='large' style={style} vertical>
            <h1 style={{margin:"10px 60px"}}>My2Do</h1>
        <Menu.Item>

          <Menu.Header>Categories</Menu.Header>
          <Menu.Menu>
            {categs}
            <Menu.Item>
               <Modal trigger={<Button fluid color="blue">Add A New Category</Button>}>
                     <Modal.Header>Add A New Category</Modal.Header>
                    <Modal.Content>
                       <Modal.Description>
                           <p>Type the name of new task category</p>
                           <Input name="categoryName" fluid placeholder='Eg. Work, Home etc' onChange={props.updateText} />
                             <br />
                           <Button color="teal" onClick={() => props.createNewValue('category')}>Add Category</Button>
                      </Modal.Description>
                  </Modal.Content>
              </Modal>
             </Menu.Item>
         </Menu.Menu>
        </Menu.Item>
     </Menu>
    )
}


export default Tasklist