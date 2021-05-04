import './App.css';
import Navbar from './component/Navbar'
import Login from './page/user/auth/Login'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Row, Card, Col } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// require('dotenv').config()

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/">
                        <Row>
                            <Col className="bg-wheat vh-100">
                                <div className="row align-items-center h-100">
                                    <div className="col-6 mx-auto">
                                        <Navbar></Navbar>
                                    </div>
                                </div>
                            </Col>
                            <Col className="bg-info h-auto">
                                <div className="container h-100">
                                    <div className="row align-items-center h-100">
                                        <div className="col-6 mx-auto">
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Body>
                                                <Login></Login>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Route>
                    <Route path="/register">
                        register
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
