import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LogoutButton } from './AuthComponents';

// UPDATED
function NavHeader (props) {
  return(
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container fluid>
        <Link to='/' className='navbar-brand'>HeapOverrun</Link>
        {/* NEW */}
        {props.loggedIn ? 
          <LogoutButton logout={props.handleLogout} /> :
          <Link to='/login'className='btn btn-outline-light'>Login</Link>
        }
      </Container>
    </Navbar>
  );
}

export default NavHeader;
