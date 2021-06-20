import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './page/user/auth/Login'
import Register from './page/user/auth/Register'

import Dashboard from './page/user/general/Dashboard'
import DeptorList from './page/user/general/Deptor/Index'
import DeptorForm from './page/user/general/Deptor/Form'
import DeptForm from './page/user/general/Dept/Form'

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/register" component={Register} ></Route>
                    <Route exact path="/user/dashboard" component={Dashboard}></Route>
                    <Route exact path="/user/deptor" component={DeptorList}></Route>
                    <Route exact path="/user/deptor/create" component={DeptorForm}></Route>
                    <Route exact path="/user/deptor/:id" component={DeptorForm}></Route>
                    <Route exact path="/user/dept/create" component={DeptForm}></Route>
                    <Route exact path="/user/dept/:id" component={DeptForm} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
