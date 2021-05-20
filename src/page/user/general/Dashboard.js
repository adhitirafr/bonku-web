import {  Container, Card, Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import AuthNavbar from './component/AuthNavbar'

import axios from "axios";
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const [depts, setDepts] = useState({});

    const [showModal, setShowModal] = useState(false);

    const [pickData, setPickData] = useState({});

    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const { token } = useSelector( (state) => state.user );

    useEffect(() => {
        const source = axios.CancelToken.source();
        
        //-- Fungsi untuk mengambil daftar hutang.
        
        const getDepts = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_BASE}/api/dept`, {
                    headers: { Authorization: `Bearer ${token}` },
                    cancelToken: source.token,
                })
                .then(res => {
                    if(res.data.data.length !== 0) {
                        setDepts(res.data.data[0])
                    } else setDepts(res.data.data)
                })
            } catch (error) {
                if (axios.isCancel(error)) { } 
                else {
                    throw error
                }
            }
        }

        getDepts();

        return function () {
            source.cancel("Cancelling in cleanup");
        };
    }, [token]);

    const pickDeptData = (data) => {
        setPickData(data)
        setShowModal(true)
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
            setShowModal(false)

            setTimeout(() => {
                setShowAlert(false)
            }, 1500)
        })
    }

    return (
        <>
            <AuthNavbar></AuthNavbar>
            <Row>
                <Col className="col-md-4 bg-dark vh-100"></Col>
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
                                <Col key={index} sm={12} md={6}>
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
                                                <img alt="check" onClick={ () => pickDeptData(dept) } width="30px" src="https://img.icons8.com/emoji/48/000000/check-box-with-check-emoji.png"/> 
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

            <Modal centered show={showModal} onHide={() => setShowModal(false)}>
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
        </>
    );
}

export default Dashboard;