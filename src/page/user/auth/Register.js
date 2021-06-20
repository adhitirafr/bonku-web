import Navbar from '../component/Navbar'
import {  Row, Card, Col, Form, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useState } from 'react'

import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Accept'] = 'application/json';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState('');
    const [isRegister, setIsregister] = useState(false);
    
    const submitRegister = (e) => {
        e.preventDefault()

        setIsLoading(true)

        axios.post(`${process.env.REACT_APP_API_BASE}/api/register`, {
            'name': name,
            'email': email,
            'password': password
        }, {
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            }
        })
        .then(res => {
            setIsregister(true);
        })
        .catch(err => {
            setIsLoading(false);
        });
    }

    return (
        <>
            <Row>
                <Col className="bg-wheat vh-100">
                    <div className="row align-items-center h-100">
                        <div className="col-6 mx-auto">
                            <Navbar></Navbar>
                        </div>
                    </div>
                </Col>

                <Col className={isRegister ? "h-auto" : "bg-info h-auto"}>
                    <div className="container h-100">
                        <div className="row align-items-center h-100">
                            <div className="col-6 mx-auto">
                                {
                                    isRegister &&
                                    <>
                                        <Col className="text-center">
                                            <img width="100px" src="/img/email.svg" alt="success email" className="mb-4"/>

                                            <Col className="h4">Email verifikasi sudah dikirim!</Col>
                                            <Col className="mb-4">Silakan cek email masuk mu~</Col>

                                            <Button variant="primary" href="/">Saya sudah konfirmasi</Button>
                                        </Col>
                                    </>
                                }

                                {
                                    !isRegister &&
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Col className="text-center font-size-30 mb-10">Register</Col>
                                            <Form onSubmit={ submitRegister }>
                                                <Form.Group controlId="name">
                                                    <Form.Control 
                                                        type="text" 
                                                        name="name" 
                                                        placeholder="Nama"
                                                        autoComplete="off"
                                                        required
                                                        value={name}
                                                        onChange={ (e) => setName(e.target.value) }   
                                                /></Form.Group>
                                                <Form.Group controlId="email">
                                                    <Form.Control 
                                                        type="email" 
                                                        name="email" 
                                                        placeholder="Email"
                                                        autoComplete="off"
                                                        required
                                                        value={email}
                                                        onChange={ (e) => setEmail(e.target.value) } 
                                                /></Form.Group>
                                                <Form.Group controlId="password">
                                                    <Form.Control 
                                                        type="password" 
                                                        name="password"
                                                        autoComplete="off"
                                                        value={password}
                                                        placeholder="password" 
                                                        onChange={ (e) => setPassword(e.target.value) }
                                                /></Form.Group>
                                                <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                                                    <div>Sudah punya akun?
                                                        <Link to="/">Login</Link>
                                                    </div>
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
                                                    { !isLoading && <Button type="submit" variant="primary">Daftar</Button> }

                                                </Col>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                }
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Register;