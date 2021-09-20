import {  Container, Card, Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import AuthNavbar from './component/AuthNavbar'

import axios from "axios";

import LoadingPage from './component/LoadingPage';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const [depts, setDepts] = useState({});
    const [finishModal, setFinishModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pickData, setPickData] = useState(null);
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true)
    const { token } = useSelector( (state) => state.user );
    const history = useHistory();


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/dept`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
            setDepts(res.data.data)
        })
        .finally(() => {
            setTimeout(() => {
                setLoadingPage(false)
            }, 300)
        })

    }, [token]);

    const pickDeptData = (data, action) => {
        setPickData(data)

        if(action === 'show') setShowModal(true)
        else setFinishModal(true)
        
    }

    const showEdit = (id) => {
        history.push('/user/dept/' + id);
    }

    const handleFinish = () => {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/dept/finish/${pickData.id}`, {
            headers: { Authorization: `Bearer ${token}` } 
        })
        .then(res => {
            setMessage(res.data.message)
        })
        .catch(err => {
            setMessage('Hutang gagal diselesaikan')
        })
        .finally(() => {
            setShowAlert(true)
            setFinishModal(false)

            setTimeout(() => {
                setShowAlert(false)
            }, 1500)
        })
    }

    return (
        <>
            { loadingPage && <LoadingPage></LoadingPage> }

            {
                !loadingPage &&
                <>
                    <AuthNavbar></AuthNavbar>
                    <Row className="vh-100">
                        <Col className="col-md-4 bg-dark"></Col>
                        <Col className="col-md-8 bg-wheat">

                        <Col className="display-4 mt-3">Dashboard</Col>
                            <Container fluid className="mt-3">

                                <Row className="mb-4">
                                    <Col>
                                        <Button href="/user/deptor">Penghutang</Button>{' '}
                                        <Button href="/user/dept/create"> Hutang Baru </Button> {' '}
                                    </Col>
                                </Row>

                                {showAlert && <Alert variant="dark" onClose={() => setShowAlert(false)} dismissible> { message } </Alert>  }

                                {/** Bila hutang belum ada, tampilkan */}
                                
                                {depts.length === 0 && 
                                    <Row className="mt-4">
                                        <Col>Hore! kamu belum dihutangi.</Col>
                                    </Row>
                                }

                                {/* Tampilkan daftar penghutang bila ada */}
                                
                                {depts.length > 0 && 
                                    <Row>
                                        {depts.map((dept, index) => (
                                        <Col key={index} sm={12} md={4} className="mb-5">
                                            <Col className="text-dark">
                                                <Card className="b-radius-20" >
                                                    <Col className="p-2 text-center">
                                                        <Col className="lead mb-3"> {dept.name} </Col>
                                                        <Col className="mb-4 font-size-30"> {dept.original_dept} </Col>
                                                        {
                                                            dept.dept_until !== '' && 
                                                            <Col>
                                                                <Col className="text-muted font-size-11">Batas waktu</Col>
                                                                <Col>{dept.dept_until}</Col>
                                                            </Col>
                                                        }
                                                    </Col>
                                                    <Col className="text-center">
                                                        <img alt="check" onClick={ () => showEdit(dept.id) } width="30px" src="https://img.icons8.com/fluent/48/000000/pencil.png"/> {' '}
                                                        <img alt="check" onClick={ () => pickDeptData(dept, 'show') } width="30px" src="https://img.icons8.com/fluent/48/000000/view.png"/> {' '}
                                                        <img alt="check" onClick={ () => pickDeptData(dept, 'finish') } width="30px" src="https://img.icons8.com/emoji/48/000000/check-box-with-check-emoji.png"/> 
                                                    </Col>
                                                </Card>
                                            </Col>
                                        </Col>
                                        ))

                                        }                             
                                    </Row>
                                }
                            </Container>
                        </Col>
                    </Row>
                </>
            }

            <Modal animation={false} centered show={finishModal} onHide={() => setFinishModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Hutang sudah dibayar?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col className="mb-10">Apakah hutang ini sudah dibayar?</Col>
                   
                    <Col className="float-right">
                        <Button onClick={ () => handleFinish() }>Ya</Button>
                    </Col>
                </Modal.Body>
            </Modal>

            <Modal animation={false} centered show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detail Hutang
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { pickData && 
                        <>
                            <Col className="mb-10">
                                <Col className="text-secondary">Penghutang</Col>
                                <Col> { pickData.deptor.name } </Col> 
                            </Col>

                            <Col className="mb-10">
                                <Col className="text-secondary">Dibuat tanggal</Col>
                                <Col> { pickData.created_at } </Col> 
                            </Col>

                            <Col className="mb-10">
                                <Col className="text-secondary">Hutang</Col>
                                <Col> { pickData.original_dept } </Col> 
                            </Col>

                            { pickData.interest !== '' && 
                                <Col className="mb-10">
                                    <Col className="text-secondary">Bunga</Col>
                                    <Col> { pickData.interest } </Col> 
                                </Col> 
                            }

                            { pickData.dept_until !== '' && 
                                <Col className="mb-10">
                                    <Col className="text-secondary">Jatuh Tempo</Col>
                                    <Col> { pickData.dept_until } </Col> 
                                </Col> 
                            }
                        </> 
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Dashboard;