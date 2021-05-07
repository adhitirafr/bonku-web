import { Navbar } from 'react-bootstrap';
import logo from '../../../logo.svg'; // with import

const AuthNavbar = () => {
    return (
        <Navbar>
            <Navbar.Brand href="#home">
                <img
                    alt="logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Bonku
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AuthNavbar