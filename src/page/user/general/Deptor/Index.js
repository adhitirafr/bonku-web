import axios from 'axios';
import { useEffect, useState } from 'react';
import {  Container, Row, Col, Table, Button, ButtonGroup, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import AuthNavbar from '../component/AuthNavbar'

const ListDeptor = () => {

    const [deptors, setDeptors] = useState([])

    const [deptorData, setDeptorData] = useState({})

    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const { token } = useSelector( (state) => state.user )

    const history = useHistory();

    const getDeptors = () => {
        console.log('get deptor called')
        axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor`, {
            headers: { 
                Authorization: `Bearer ${token}`,
            } 
        })
        .then(res => {
            setDeptors(res.data.data)
        })
        .catch(err => {
            console.log('error')
            console.log(err.response)
        })
    }

    const showDeptor = (id) => {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/deptor/${id}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            console.log(res.data.data)
            setDeptorData(res.data.data)
            setShowModal(true);
        }).catch(err => {
            console.error(err.response)
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

    const handleDelete = (e) => {
        console.log('panggil handle')
        // e.preventDefault();
        
        axios.delete(`${process.env.REACT_APP_API_BASE}/api/deptor/${deptorData.id}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => {
            console.log('berhasil dihapus')
        })
        .catch(err => {
            console.error('salah')
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
        getDeptors()
    }, [])

    return(
        <Col>
            <AuthNavbar></AuthNavbar>
            <Row>
                <Col className="col-md-4 bg-dark vh-100"></Col>

                <Col className="col-md-8">
                    <Col className="display-4 mt-3">Daftar Penghutang</Col>
                    
                    <Container fluid className="mt-3">
                    <Button className="mb-3">
                        <Link to="/user/deptor/create" className="text-white">Tambah</Link>
                    </Button>
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
                                        <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-3">
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
                    </Container>
                </Col>
            </Row>
            
            <Modal centered show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col> Nama : {deptorData.name}</Col>
                    <Col> Nomor Telepon : {deptorData.phone_number} </Col>
                    <Col> Identitas : {deptorData.identity} </Col>
                    <Col> Alamat : {deptorData.address} </Col>
                    <Col> Catatan : </Col>
                    <Col> {deptorData.note} </Col>
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
                   
                    <Col className="float-right">
                        <Button onClick={ handleDelete }>Hapus</Button>
                    </Col>
                </Modal.Body>
            </Modal>
        </Col>
    );
};

export default ListDeptor;