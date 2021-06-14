import {  Row, Card, Col, Form, Alert, Button, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../../redux/userAuth'
import axios from 'axios';

import Navbar from '../component/Navbar'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [messageError, setMessageError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();

        setIsLoading(true)

        axios.post(`${process.env.REACT_APP_API_BASE}/api/login`, {
            'email': email,
            'password': password
        }, {
            header: {
                'content-type':  'application/x-www-form-urlencoded',
                'accept': 'application/json'
            }
        })
        .then(res => {
            dispatch(setAuthToken(res.data.access_token))
            
            history.push('/user/dashboard');
        })
        .catch(err => {
            setMessageError(err.response.data.message)
            setShow(true)
        })
        .finally(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        })
    }

    const setShow = (condtion) => {
        setShowError(condtion)
    }

    return (
        <Col>
            <Row className="vh-100">
                <Col className="bg-wheat">
                    <Col className="row align-items-center h-100">
                        <Col className="col-6 mx-auto">
                            <Navbar></Navbar>
                        </Col>
                    </Col>
                </Col>
                <Col className="bg-info h-auto">
                    <Col className="container h-100">
                        <Col className="row align-items-center h-100">
                            <Col className="col-6 mx-auto">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                    {process.env.REACT_APP_API_BASE}
                                        <Col className="text-center font-size-30 mb-10">Login</Col>
                                        
                                        {showError && <Alert variant="warning" onClose={() => setShow(false)} dismissible> { messageError } </Alert>  }

                                        <Form onSubmit={handleLogin}>
                                            <Form.Group controlId="email">
                                                <Form.Control 
                                                    type="email" 
                                                    name="email" 
                                                    placeholder="Email"
                                                    required
                                                    onChange={ (e) => setEmail(e.target.value) } 
                                                    value={email}        
                                            /></Form.Group>
                                            <Form.Group controlId="password">
                                                <Form.Control 
                                                    type="password" 
                                                    name="password" 
                                                    placeholder="password"
                                                    required
                                                    onChange={ (e) => setPassword(e.target.value) }
                                                    value={password}
                                            /></Form.Group>
                                            <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                                                <Col>Belum punya akun?
                                                    <Link to="/register">Daftar</Link>
                                                </Col>
                                            </Form.Group>
                                            <Col className="text-center">
                                                { isLoading && 
                                                    <Button variant="primary" disabled>
                                                        <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        />
                                                        {' '}Loading
                                                    </Button> 
                                                }
                                                { !isLoading && <Button variant="primary" type="submit">Masuk</Button> }

                                            </Col>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>
        </Col>
    );
}

export default Login;