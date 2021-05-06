import {  Container, Card, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import AuthNavbar from '../component/AuthNavbar'

const Dashboard = () => {
    return (
        <div>
            <AuthNavbar></AuthNavbar>
            
            <Container>
                <div className="mt-3">
                    
                    <Button>
                        <Link to="/user/deptor/create" className="text-white">+ Tambah Orang yang menghutang</Link>
                    </Button>

                    <div className="mt-3">
                        
                        <Row>
                            <div className="col-md-4">
                                <Card className="p-2">
                                    test
                                </Card>
                            </div>
                        </Row>

                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Dashboard;