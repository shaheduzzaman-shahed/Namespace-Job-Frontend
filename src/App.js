import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <div className="App">
     <Router>
     <NavBar/>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="*">
            <h1 className="text-center mt-5"><b>404 Page not found</b></h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
