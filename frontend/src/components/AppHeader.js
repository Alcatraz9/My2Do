import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

class AppHeader extends Component {
    render()  {
      return (
        <Menu  style={{width:"100%", position: "fixed", top:"0", zIndex: 1000}}>
          <Menu.Menu position='right'>             
            <Menu.Item onClick={() => console.log("logout")}
              name='logout'
            />
          </Menu.Menu>
          </Menu>
      )
    }
  
}
  

export default AppHeader