import Navbar from '../component/Navbar'
import {  Row, Card, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div>
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
                                        <Form>
                                            <Form.Group controlId="email">
                                                <Form.Control type="email" name="email" placeholder="Email" />
                                            </Form.Group>
                                            <Form.Group controlId="password">
                                                <Form.Control type="password" name="password" placeholder="password" />
                                            </Form.Group>
                                            <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                                                <div>Belum punya akun?
                                                    <Link to="/register">Daftar</Link>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                                                <Button variant="success">Login</Button>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Login;