import axios from 'axios';
import { useEffect, useState } from 'react';
import {  Container, Row, Form, Col, Button, Alert} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthNavbar from '../component/AuthNavbar'

const Create = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [identity, setIdentity] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    const [isPending, setIsPending] = useState('');

    const [messageError, setMessageError] = useState('')
    const [showError, setShowError] = useState(false)

    const { token } = useSelector( (state) => state.user )

    const history = useHistory();

    //-- Handling if it's an edit

    const [dataId, setDataId] = useState('');

    useEffect(() => {
        if(props.match.params.id) {
            console.log('ada props')
            getData()
        }
    }, [])

    const getData = () => {
        
        setDataId(props.match.params.id)

        axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor/${props.match.params.id}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            console.log(res.data.data)

            setName(res.data.data.name)
            setEmail(res.data.data.email)
            setIdentity(res.data.data.identity)
            setNote(res.data.data.note)
            setAddress(res.data.data.address)
            setNumber(res.data.data.phone_number)
        }).catch(err => {
            console.error(err.response)
        })
    }

    const handleEdit = (e) => {
        e.preventDefault()

        axios.put(`${process.env.REACT_APP_API_BASE}/api/deptor/${props.match.params.id}`, {
            'name': name,
            'email': email,
            'phone_number': number,
            'identity': identity,
            'address': address,
            'note': note
        }, {
            headers: { 
                Authorization: `Bearer ${token}`,
            } 
        })
        .then(res => {
            history.push('/user/deptor')
        })
        .catch(err => {
            setMessageError(err.response.data.message)
            setShowError(true)
            
        })
        .finally(() => {
            setIsPending(false)
        })
        
    }

    //-- Handling saving deptor

    const handleCreate = (e) => {
        e.preventDefault();

        setIsPending(true);

        axios.post(`${process.env.REACT_APP_API_BASE}/api/deptor`, {
            'name': name,
            'email': email,
            'phone_number': number,
            'identity': identity,
            'address': address,
            'note': note
        }, {
            headers: { 
                Authorization: `Bearer ${token}`,
            } 
        })
        .then(res => {
            history.push('/user/deptor')
        })
        .catch(err => {
            setMessageError(err.response.data.message)
            setShowError(true)
            
        })
        .finally(() => {
            setIsPending(false)
        })
    }

    return (
        <Col>
            <AuthNavbar></AuthNavbar>
            <Row>
                <Col className="col-md-4 bg-dark vh-100"></Col>
                <Col className="col-md-8 bg-wheat"> 

                    <Col className="display-4 mt-3">
                        {dataId === '' ? 'Tambah' : 'Edit'} Penghutang
                    </Col>
                    <Container fluid className="mt-3">

                    { !props.match.params.id && 
                        
                        <Form className="bg-white p-3 b-radius-10" onSubmit={ handleCreate  }>
                                create
                        {showError && <Alert variant="warning" onClose={() => setShowError(false)} dismissible> { messageError } </Alert>  }

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
                                type="email" 
                                name="email"
                                value={email}
                                onChange={ (e) => setEmail(e.target.value) }
                                placeholder="Dapat dikosongkan" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control
                                type="number" 
                                name="phone_number"
                                value={number}
                                onChange={ (e) => setNumber(e.target.value) }
                                placeholder="Dapat dikosongkan" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Identitas</Form.Label>
                            <Form.Control
                                type="text" 
                                name="identity"
                                value={identity}
                                onChange={ (e) => setIdentity(e.target.value) }
                                placeholder="Dapat dikosongkan" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                type="text" 
                                name="alamat" 
                                value={address}
                                onChange={ (e) => setAddress(e.target.value) }
                                placeholder="Dapat dikosongkan" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Catatan</Form.Label>
                            <Form.Control 
                                name="note"
                                as="textarea"
                                value={note}
                                onChange={ (e) => setNote(e.target.value) }
                                placeholder="Dapat dikosongkan"
                                rows={3}
                        /></Form.Group>
                        { !isPending &&
                            <Button variant="success" type="submit">Simpan</Button>
                        }
                        { isPending && 
                            <Button variant="warning" disabled>Sedang memproses...</Button> 
                        }
                    </Form>
                    
                    }

                    { props.match.params.id && 
                        
                        <Form className="bg-white p-3 b-radius-10" onSubmit={ handleEdit  }>
                        {showError && <Alert variant="warning" onClose={() => setShowError(false)} dismissible> { messageError } </Alert>  }

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
                                type="email" 
                                name="email"
                                value={email}
                                onChange={ (e) => setEmail(e.target.value) }
                                placeholder="Dapat dikosongkan" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control
                                type="number" 
                                name="phone_number"
                                value={number}
                                onChange={ (e) => setNumber(e.target.value) }
                                placeholder="Dapat dikosongkan" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Identitas</Form.Label>
                            <Form.Control
                                type="text" 
                                name="identity"
                                value={identity}
                                onChange={ (e) => setIdentity(e.target.value) }
                                placeholder="Dapat dikosongkan" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                type="text" 
                                name="alamat" 
                                value={address}
                                onChange={ (e) => setAddress(e.target.value) }
                                placeholder="Dapat dikosongkan" 
                        /></Form.Group>
                        <Form.Group>
                            <Form.Label>Catatan</Form.Label>
                            <Form.Control 
                                name="note"
                                as="textarea"
                                value={note}
                                onChange={ (e) => setNote(e.target.value) }
                                placeholder="Dapat dikosongkan"
                                rows={3}
                        /></Form.Group>
                        { !isPending &&
                            <Button variant="success" type="submit">Simpan</Button>
                        }
                        { isPending && 
                            <Button variant="warning" disabled>Sedang memproses...</Button> 
                        }
                    </Form>
                    
                    }
                    
                </Container>
            </Col>
            </Row>
        </Col>
    )
}

export default Create