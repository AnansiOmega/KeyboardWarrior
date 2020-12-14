import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavBar = ({color}) => {
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand style={color}>Keyboard Warrior</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href='/home' style={color}>Home</Nav.Link>
            <Nav.Link href='/' style={color}>Info</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavBar