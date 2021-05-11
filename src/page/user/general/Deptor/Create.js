import axios from 'axios';
import { useState } from 'react';
import {  Container, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import AuthNavbar from './../../component/AuthNavbar'

const Create = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [identity, setIdentity] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_BASE}/api/deptor`, {

        })
        .then(res => {

        })
        .catch(err => {

        })
    }

    return (
        <div>
            <AuthNavbar></AuthNavbar>
            <Row>
            <div className="col-md-4 bg-dark vh-100">
                    
            </div>
            <div className="col-md-8 bg-wheat">  
                <Container fluid className="mt-3">
                    <Form className="bg-gray-100 p-2 b-radius-10">
                        <Form.Group>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                required
                                type="text" 
                                name="name" 
                                value={name}
                                onChange={ (e) => setName(e.target.value) }
                                placeholder="Masukkan nama penghutang" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email" 
                                name="email"
                                value={email}
                                onChange={ (e) => setEmail(e.target.value) }
                                placeholder="Masukkan nama penghutang" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control
                                required
                                type="number" 
                                name="phone_number"
                                value={number}
                                onChange={ (e) => setNumber(e.target.value) }
                                placeholder="Masukkan nama penghutang" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Identitas</Form.Label>
                            <Form.Control
                                required
                                type="text" 
                                name="identity"
                                value={identity}
                                onChange={ (e) => setIdentity(e.target.value) }
                                placeholder="Masukkan nama penghutang" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                required
                                type="text" 
                                name="alamat" 
                                value={address}
                                onChange={ (e) => setAddress(e.target.value) }
                                placeholder="Masukkan nama penghutang" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Catatan</Form.Label>
                            <Form.Control 
                                name="note"
                                as="textarea"
                                value={note}
                                onChange={ (e) => setNote(e.target.value) }
                                rows={3}
                        /></Form.Group>
                        <button>Simpan</button>
                    </Form>
                </Container>
            </div>
            </Row>
        </div>
    )
}

export default Create