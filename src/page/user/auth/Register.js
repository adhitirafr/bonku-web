import Navbar from '../component/Navbar'
import {  Row, Card, Col, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'

import { useDispatch } from 'react-redux';
import { setAuthToken } from '../../../redux/userAuth'

import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Accept'] = 'application/json';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const history = useHistory();
    
    const submitRegister = (e) => {
        e.preventDefault()

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
            dispatch(setAuthToken(res.data.access_token))
            history.push('/user/dashboard')
        })
        .catch(err => {
            console.error(err.response.data.message)
        })
    }

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
                                            <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                                                <button className="btn btn-primary">Daftar</button>
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

export default Register;