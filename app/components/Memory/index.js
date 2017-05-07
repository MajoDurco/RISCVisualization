import React from 'react'
import Drawer from 'material-ui/Drawer'
import RaisedButton from 'material-ui/RaisedButton'
import NextIcon from 'material-ui/svg-icons/navigation/chevron-right'
import PrevIcon from 'material-ui/svg-icons/navigation/chevron-left'
import { 
  close_button,
  close_icon,
  open_button,
  open_icon,
  MemoryDrawer
} from './styles'

class Memory extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = {open: false}
  }

  toggleDrawer() {
    const open_toggle = this.props.isOpen ? false : true
    this.props.setOpen(open_toggle)
	}

  render() {
    return (
      <MemoryDrawer>
         <RaisedButton
          icon={<PrevIcon style={close_icon} />}
          label="Memory"
          onTouchTap={() => this.toggleDrawer()}
          labelStyle={{"fontSize": "20px"}}
          primary={true}
          style={close_button}
        />
        <Drawer 
          open={this.props.isOpen}
          openSecondary={true}
          width={300}
        >
          <RaisedButton
            icon={<NextIcon style={open_icon} />}
            label="Memory"
            labelPosition="before"
            labelStyle={{"fontSize": "20px"}}
            onTouchTap={() => this.toggleDrawer()}
            primary={true}
            style={open_button}
          />
          {this.props.children}
        </Drawer>
      </MemoryDrawer>
    );
  }
}

Memory.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  setOpen: React.PropTypes.func.isRequired,
  children: React.PropTypes.node
};

export default Memory;
