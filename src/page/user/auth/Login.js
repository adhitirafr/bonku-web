import {  Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const Login = () => {
    const [name, setName] = useState('ramnit')

    const login = (name) => {
        console.log('clicked me!' + name)

        setName('ramnit after click')

        console.log(name)
    }

    return (
        <div>
            <Form >
                <Form.Group controlId="email">
                    <Form.Control type="email" name="email" placeholder="Email" />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control type="password" name="password" placeholder="password" />
                </Form.Group>
                <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                    <Button variant="success" onClick={ () => {
                        login('testing')
                    } }>Login</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Login;