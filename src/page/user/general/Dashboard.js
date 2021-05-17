import {  Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

import AuthNavbar from './component/AuthNavbar'

import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const [depts, setDepts] = useState({})

    const { token } = useSelector( (state) => state.user )

    //-- Fungsi untuk mengambil daftar hutang.

    const getDepts = () => {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/dept`, {
            headers: { Authorization: `Bearer ${token}` } 
        })
        .then(res => {
            console.log('depts')
            console.log(res.data.data)
            setDepts(res.data.data)
        })
        .catch(err => {
            console.log(err.response.data.message)            
        })
    }

    //-- Fungsi untuk mengambil daftar orang yang menghutang

    useEffect(() => {
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
                        
                        <Button className="mb-3">
                            <Link to="/user/deptor" className="text-white">Penghutang</Link>
                        </Button>

                        <Button className="mb-3">
                            <Link to="/user/dept/create" className="text-white">Hutang Baru</Link>
                        </Button>

                        {/** Bila hutang belum ada, tampilkan */}
                        
                        {depts.length === 0 && 
                            <Row>
                                <Col>Hore! kamu belum dihutangi.</Col>
                            </Row>
                        }

                        {/* Tampilkan daftar penghutang bila ada */}
                        
                        {depts.length > 0 && 
                            <Row>
                                <Col>
                                    <Link to="/user/dashboard" className="text-dark">
                                        <Card className="b-radius-20" >
                                            <Col className="p-2 text-center">
                                                <Col className="lead mb-3">Adit Filkom</Col>
                                                <Col className="mb-4 font-size-30">Rp. 310.000</Col>
                                                <Col>
                                                    <Col className="text-muted font-size-11">Batas waktu</Col>
                                                    <Col>Senin, 18 April 2020</Col>
                                                </Col>
                                            </Col>
                                        </Card>
                                    </Link>
                                </Col>                                
                            </Row>
                        }

                        <Link></Link>
                    </Container>
                </Col>
            </Row>
        </Col>
    );
}

export default Dashboard;