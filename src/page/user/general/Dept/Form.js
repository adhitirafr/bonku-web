import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthNavbar from '../component/AuthNavbar'

const Create = (props) => {
    const[original_dept, set_original_dept] = useState('');
    const[dept_until, set_dept_until] = useState('');
    const[note, setNote] = useState('');
    const[interest, setInterest] = useState('');
    const[isPending, setIsPeding] =  useState(false);

    const[dataDeptor, setDataDeptor] = useState([]);
    const[deptorSelected, setDeptorSelected] = useState('');

    const { token } = useSelector( (state) => state.user );

    const history = useHistory();

    const handleSelect = (e) => {
        setDeptorSelected(e.target.value)
    }

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getDeptors = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor`, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        cancelToken: source.token,
                    } 
                })
                .then(res => {
                    console.log(res.data.data)
                    setDataDeptor(res.data.data)
                })
                .catch(err => {
                    console.error('salah')
                })
            }
            catch (error) {
                if (axios.isCancel(error)) { } 
                else {
                    throw error
                }
            }
        }
        getDeptors();

        return function () {
            source.cancel("Cancelling in cleanup");
        };
    }, [token])

    //-- Handling Create 

    const handleCreate = (e) => {
        e.preventDefault();

        setIsPeding(true)
        
        axios.post(`${process.env.REACT_APP_API_BASE}/api/dept`, {
            'deptor_id': deptorSelected,
            'original_dept': original_dept,
            'interest': interest,
            'dept_until': dept_until,
            'note': note,
            'status': 1
        }, {
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            console.log('berhasil')
            history.push(`/user/dashboard`)
        })
        .catch(err => {
            console.log(err.response)
            console.log('salah')
        })
        .finally(() => {
            setIsPeding(false)
        })
    }

    return (
        <Col>
            <AuthNavbar></AuthNavbar>
            <Row>
                <Col className="col-md-4 bg-dark vh-50"></Col>
                <Col className="col-md-8 bg-wheat"> 

                    <Col className="display-4 mt-3">
                        Tambah Hutang
                    </Col>
                    <Container fluid className="mt-3">
                        { dataDeptor.length > 0 ?
                        
                        <Form onSubmit={handleCreate}>
                            <Form.Group>
                                <Form.Label>Penghutang</Form.Label>

                                <Form.Control as="select" value={deptorSelected} onChange={handleSelect}>
                                    <option value="" defaultValue>Pilih Penghutang</option>
                                    {
                                        dataDeptor.map((deptor, index) => (
                                            <option value={deptor.id} key={index}>{deptor.name}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Besar hutang</Form.Label>
                                <Form.Control
                                    required
                                    name="setOriginal"
                                    type="number"
                                    value={original_dept}
                                    onChange={ (e) => set_original_dept(e.target.value) }
                                    placeholder="Besar hutang"
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Sampai Tanggal</Form.Label>
                                <Form.Control
                                    required
                                    name="setOriginal"
                                    type="date"
                                    value={dept_until}
                                    onChange={ (e) => set_dept_until(e.target.value) }
                                    placeholder="Besar hutang"
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Bunga</Form.Label>
                                <Form.Control
                                    name="setOriginal"
                                    type="number"
                                    value={interest}
                                    onChange={ (e) => setInterest(e.target.value) }
                                    placeholder="dapat dikosongkan"
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Catatan</Form.Label>
                                <Form.Control
                                    required
                                    name="note"
                                    as="textarea"
                                    rows={3}
                                    value={note}
                                    onChange={ (e) => setNote(e.target.value) }
                                    placeholder=""
                                >
                                </Form.Control>
                            </Form.Group>
                            { !isPending &&
                                <Button variant="success" type="submit">Simpan</Button>
                            }
                            { isPending && 
                                <Button variant="warning" disabled>Sedang memproses...</Button> 
                            }
                        </Form> 
                        
                        : 

                        <Col>Penghutang belum ada</Col>
                        }
                    </Container>
                </Col>
            </Row>
        </Col>
    )
}

export default Create