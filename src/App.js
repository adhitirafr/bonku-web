import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './page/user/auth/Login'
import Register from './page/user/auth/Register'

import Dashboard from './page/user/general/Dashboard'
import DeptorCreate from './page/user/general/Deptor/Create'

require('dotenv').config()

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Login></Login>
                    </Route>
                    <Route path="/register">
                        <Register></Register>
                    </Route>
                    <Route path="/user/dashboard">
                        <Dashboard></Dashboard>
                    </Route>
                    <Route path="/user/deptor/create">
                        <DeptorCreate></DeptorCreate>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
