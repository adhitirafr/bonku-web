import {  Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/counter'

import AuthNavbar from '../component/AuthNavbar'

const Dashboard = () => {

    //-- other wrinting
    // const count = useSelector((state) => state.counter.count)

    const { count } = useSelector( (state) => state.counter )

    const dispatch = useDispatch();

    return (
        <div>
            <AuthNavbar></AuthNavbar>
            <Row>
                <div className="col-md-4 bg-dark vh-100">
                    
                </div>
                <div className="col-md-8 bg-wheat">
                    
                    <Container fluid className="mt-3">
                        
                        <Button className="mb-3">
                            <Link to="/user/deptor/create" className="text-white">+ Tambah Orang yang menghutang</Link>
                        </Button>
                        
                        <Row>
                            <Col>
                                <Link to="/" className="text-dark">
                                    <Card className="b-radius-20" >
                                        <div className="vh-2 bg-info display-block text-info">e</div>
                                        <div className="p-2 text-center">
                                            <Col className="lead mb-3">Adit Filkom</Col>
                                            <Col className="mb-4 font-size-30">Rp. 310.000</Col>
                                            <Col>
                                                <Col className="text-muted font-size-11">Batas waktu</Col>
                                                <Col>Senin, 18 April 2020</Col>
                                            </Col>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                            <Col>
                                <Card className="p-2">
                                    test : {count}
                                    <div>
                                        <button onClick={() => dispatch(increment())}> tambah </button>
                                    </div>
                                    <div>
                                        <button onClick={() => dispatch(decrement())}> tambah </button>
                                    </div>
                                </Card>
                            </Col>
                            
                        </Row>
                    </Container>
                </div>
            </Row>
        </div>
    );
}

export default Dashboard;