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
            const source = axios.CancelToken.source();

            const getData = async () => {
                try {
                    
                    setDataId(props.match.params.id)

                    axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor/${props.match.params.id}`, {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            cancelToken: source.token,
                        }
                    })
                    .then(res => {
                        setName(res.data.data.name)
                        setEmail(res.data.data.email)
                        setIdentity(res.data.data.identity)
                        setNote(res.data.data.note)
                        setAddress(res.data.data.address)
                        setNumber(res.data.data.phone_number)
                    }).catch(err => {})
                }
                catch (error) {
                    if (axios.isCancel(error)) { } 
                    else {
                        throw error
                    }
                }
            }

            getData()
        }
    }, [props.match.params.id, token])

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);

        if(dataId === '') handleCreate();
        else handleEdit();
    }

    const handleEdit = () => {
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
            setIsPending(false)
            
        })
    }

    //-- Handling saving deptor

    const handleCreate = () => {
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
            setIsPending(false)  
        })
    }

    return (
        <>
            <AuthNavbar></AuthNavbar>
            <Row className="vh-100">
                <Col className="col-md-4 bg-dark"></Col>
                <Col className="col-md-8 bg-wheat"> 

                    <Col className="display-4 mt-3">
                        {dataId === '' ? 'Tambah' : 'Edit'} Penghutang
                    </Col>
                    <Container fluid className="mt-3">

                    <Form className="bg-white p-3 b-radius-10" onSubmit={ handleSubmit  }>
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
    
                    <br />
                    </Container>
            </Col>
            </Row>
        </>
    )
}

export default Create