import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,NavLink} from 'react-router-dom'
import   './Header.css'
function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
           NavBAr 
            </Navbar.Brand>
          <Nav className="me-auto navbar1">
            <Nav.Link href="#home">
                <NavLink to="/">
                Home
                </NavLink>
            </Nav.Link>
            <Nav.Link href="#features">
            <NavLink to="quiz">
                Quiz
                </NavLink>
                </Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
   
    </>
  );
}
// import { Form } from 'react-router-dom';

export default Header;