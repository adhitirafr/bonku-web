import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from 'react-bootstrap';
import { removeAuthToken } from '../../../../redux/userAuth'
import { useHistory } from 'react-router-dom';
import logo from '../../../../logo.svg'; // with import

import axios from 'axios';

const AuthNavbar = () => {
    const [user, setUser] = useState({});
    const { token } = useSelector( (state) => state.user )

    const dispatch = useDispatch();
    const history = useHistory();

    //-- Fungsi untuk ambil info user berdasarkan token yang disimpan
    const getUser = () => {
        axios.get(`${process.env.REACT_APP_API_BASE}/api/profile`, {
            headers: { Authorization: `Bearer ${token}` } 
        }).then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    //-- Fungsi untuk menghapus token yang tersimpan, lalu redirect ke halaman login
    const handleLogOut = (e) => {
        dispatch(removeAuthToken());
        history.push('/');
    }

    //-- Setiap perubahan terjadi, panggil useEffect, fungsi mirip seperti mount vue.
    // [] berfungsi sebagai penanda bahwa use effect hanya dijalankan sekali saja saat awal render.
    // Bila [] tidak dipanggil, maka fungsi di use effect akan terpanggil terus menerus.

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Navbar>
            <Navbar.Brand href="/user/dashboard">
                <img
                    alt="logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Bonku
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Masuk sebagai: {user.name} | <a onClick={handleLogOut}>Log out</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AuthNavbar