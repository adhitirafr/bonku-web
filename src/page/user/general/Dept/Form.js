import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthNavbar from '../component/AuthNavbar'
import LoadingPage from '../component/LoadingPage';

const Create = (props) => {
    const[original_dept, set_original_dept] = useState('');
    const[dept_until, set_dept_until] = useState('');
    const[note, setNote] = useState('');
    const[isPending, setIsPeding] =  useState(false)
    const[pageLoading, setPageLoading] = useState(true)

    const[dataDeptor, setDataDeptor] = useState([]);
    const[deptorSelected, setDeptorSelected] = useState('');

    const [dataId, setDataId] = useState('');

    const { token } = useSelector( (state) => state.user );

    const history = useHistory();

    const handleSelect = (e) => {
        setDeptorSelected(e.target.value)
    }

    useEffect(() => {
        const source = axios.CancelToken.source();

        if(props.match.params.id) {
            setDataId(props.match.params.id)

            const getDept = async () => {
                try {
                    axios.get(`${process.env.REACT_APP_API_BASE}/api/dept/${props.match.params.id}`, {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            cancelToken: source.token,
                        } 
                    })
                    .then(res => {
                        setDeptorSelected(res.data.data.deptor.id)
                        set_original_dept(res.data.data.original_dept)
                        set_dept_until(res.data.data.dept_until)
                        setNote(res.data.data.note)
                    })
                    .catch(error => {

                    })
                }
                catch (error) {
                    if (axios.isCancel(error)) { } 
                    else {
                        throw error
                    }
                }
            }

            getDept();
        }

        const getDeptors = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor`, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        cancelToken: source.token,
                    } 
                })
                .then(res => {
                    setDataDeptor(res.data.data)
                })
                .catch(err => {
                })
                .finally(() => {
                    setTimeout(() => {
                        setPageLoading(false)
                    }, 300)
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
    }, [props.match.params.id, token])

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPeding(true)

        if(dataId === '') handleCreate();
        else handleEdit();
    }

    //-- Handling Create 

    const handleCreate = () => {
        axios.post(`${process.env.REACT_APP_API_BASE}/api/dept`, {
            'deptor_id': deptorSelected,
            'original_dept': original_dept,
            'dept_until': dept_until,
            'note': note
        }, {
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            history.push(`/user/dashboard`)
        })
        .catch(() => {
            setIsPeding(false)
        })
    }

    //-- Handling edit

    const handleEdit = () => {
        axios.put(`${process.env.REACT_APP_API_BASE}/api/dept/${props.match.params.id}`, {
            'deptor_id': deptorSelected,
            'original_dept': original_dept,
            'dept_until': dept_until,
            'note': note
        }, {
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            history.push(`/user/dashboard`)
        })
        .catch(() => {
            setIsPeding(false)
        })
    }

    return (
        <>
            { pageLoading && <LoadingPage></LoadingPage> }
            { !pageLoading && 
                <>
                    <AuthNavbar></AuthNavbar>
                    <Row className="vh-100">
                        <Col className="col-md-4 bg-dark"></Col>
                        <Col className="col-md-8 bg-wheat"> 

                            <Col className="display-4 mt-3">
                                { dataId === '' ? 'Tambah' : 'Edit' } Hutang
                            </Col>
                            <Container fluid className="mt-3">
                                { dataDeptor.length > 0 ?
                                
                                <Form onSubmit={handleSubmit}>
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
                                            name="setOriginal"
                                            type="date"
                                            value={dept_until}
                                            onChange={ (e) => set_dept_until(e.target.value) }
                                            placeholder="Besar hutang"
                                        >
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Catatan</Form.Label>
                                        <Form.Control
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
                </> 
            }
        </>
    )
}

export default Create