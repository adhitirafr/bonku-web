import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Table, Button, ButtonGroup, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import AuthNavbar from '../component/AuthNavbar'
import LoadingPage from '../component/LoadingPage';

const ListDeptor = () => {

    const [deptors, setDeptors] = useState([])

    const [deptorData, setDeptorData] = useState({})

    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const [loadingPage, setLoadingPage] = useState(true)

    const { token } = useSelector( (state) => state.user )

    const history = useHistory();

    const getDeptors = () => {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor`, {
            headers: { 
                Authorization: `Bearer ${token}`,
            } 
        })
        .then(res => {
            
            setDeptors(res.data.data)
        })
        .catch(err => {
        })
    }

    const showDeptor = (id) => {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor/${id}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            setDeptorData(res.data.data)
            setShowModal(true);
        }).catch(err => {
        })
    }

    //-- Handle Delete

    const deletePreparation = (data) => {
        setDeptorData(data)
        showDeleteModal(true)
    }

    const showDeleteModal = (condition) => {
        setDeleteModal(condition)
    }

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_BASE}/api/deptor/${deptorData.id}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
        })
        .catch(err => {
        })
        .finally(() => {
            showDeleteModal(false)
            getDeptors()
        })
    }

    const showEdit = (id) => {
        history.push(`deptor/${id}`)
    }

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getDeptorAPI = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor`, {
                    headers: { Authorization: `Bearer ${token}` } ,
                    cancelToken: source.token,
                })
                .then(res => {
                    setDeptors(res.data.data)
                })
                .catch(err => {
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoadingPage(false)
                    }, 300)
                })
            }
            catch(error) {
                if (axios.isCancel(error)) { } 
                else {
                    throw error
                }
            }
        }

        getDeptorAPI()

        return function () {
            source.cancel("Cancelling in cleanup");
        };
    }, [token])

    return(
        <>
            { loadingPage && <LoadingPage></LoadingPage> }
            { !loadingPage && 
                <>
                    <AuthNavbar></AuthNavbar>
                    <Row className="vh-100">
                        <Col className="col-md-4 bg-dark"></Col>

                        <Col className="col-md-8">
                            <Col className="display-4 mt-3">Daftar Penghutang</Col>
                            
                            <Container fluid className="mt-3">
                            <Button href="/user/deptor/create" className="mb-3">
                                Tambah
                            </Button>
                                {
                                    deptors.length > 0 && 
                                    <Table bordered hover>
                                        <thead>
                                            <tr>
                                            <th>#</th>
                                            <th>Nama</th>
                                            <th>Total Hutang</th>
                                            <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {deptors.map((deptor, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{deptor.name}</td>
                                                    <td>{deptor.total_dept}</td>
                                                    <td>
                                                    <ButtonGroup vertical>
                                                        <DropdownButton as={ButtonGroup} title="Aksi" id="bg-vertical-dropdown-3">
                                                            <Dropdown.Item eventKey="1" onClick={() => showDeptor(deptor.id)}>Detail</Dropdown.Item>
                                                            <Dropdown.Item eventKey="2" onClick={ () => showEdit(deptor.id) }>Edit</Dropdown.Item>
                                                            <Dropdown.Item eventKey="3" onClick={ () => deletePreparation(deptor) } >Hapus</Dropdown.Item>
                                                        </DropdownButton>
                                                    </ButtonGroup>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                }

                                {
                                    deptors.length === 0 &&
                                    <Row><Col>Belum ada penghutang</Col></Row>
                                }
                                
                            </Container>
                        </Col>
                    </Row>
                </>
            }
            
            
            <Modal centered show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col className="mb-10">
                        <Col className="text-secondary"> Nama </Col>
                        <Col> {deptorData.name} </Col>
                    </Col>

                    <Col className="mb-10">
                        <Col className="text-secondary">Nomor Telepon</Col>
                        <Col> {deptorData.phone_number ? deptorData.phone_number : '-'} </Col>
                    </Col>

                    <Col className="mb-10">
                        <Col className="text-secondary">Identitas</Col>
                        <Col> {deptorData.identity ? deptorData.identity : '-'} </Col>
                    </Col>

                    <Col className="mb-10">
                        <Col className="text-secondary">Alamat</Col>
                        <Col> {deptorData.address ? deptorData.address : '-'} </Col>
                    </Col>
                    
                    <Col className="mb-10">
                        <Col className="text-secondary">Catatan</Col>
                        <Col> {deptorData.note ? deptorData.note : '-'} </Col> 
                    </Col>
                </Modal.Body>
            </Modal>

            <Modal centered show={deleteModal} onHide={() => setDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Hapus
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col className="mb-10">Yakin ingin menghapus penghutang ini?</Col>
                   
                    <Col className="d-flex flex-row-reverse">
                        <Button variant="danger" onClick={ handleDelete }>Hapus</Button>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ListDeptor;