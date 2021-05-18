import {  Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import AuthNavbar from './component/AuthNavbar'

import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const [depts, setDepts] = useState({})

    const { token } = useSelector( (state) => state.user )

    //-- Fungsi untuk mengambil daftar orang yang menghutang

    useEffect(() => {
        //-- Fungsi untuk mengambil daftar hutang.

        const getDepts = () => {
            axios.get(`${process.env.REACT_APP_API_BASE}/api/dept`, {
                headers: { Authorization: `Bearer ${token}` } 
            })
            .then(res => {
                console.log(res.data.data)
                setDepts(res.data.data[0])
            })
            .catch(err => {
                console.log(err.response)  
            })
        }

        getDepts()
    }, []);

    return (
        <Col>
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
                                                <img width="30px" src="https://img.icons8.com/emoji/48/000000/check-box-with-check-emoji.png"/> 
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
        </Col>
    );
}

export default Dashboard;