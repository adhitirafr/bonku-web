import { Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const AuthNavbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/">
                    Bonku
                </Link>

                <Button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNavAltMarkup" type="button"  aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </Button>

                <Col className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/"> Home <span class="sr-only">(current)</span> </Link>
                        </li>
                        <li class="nav-item">
                        <Link className="nav-link" to="/"> Logout </Link>
                        </li>
                    </ul>
                </Col>
            </nav>
        </div>
    )
}

export default AuthNavbar