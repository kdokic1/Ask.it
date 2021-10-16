import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import QuestionWithAnswers from './components/QuestionWithAnswers';
import MyQuestions from './components/MyQuestions';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Account from './components/Account';
import Notifications from './components/Notifications';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  window.onbeforeunload = () => {
    localStorage.removeItem('token');
  }

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth}/>
        <div className="content">
          <Switch>

            <Route
              exact
              path="/home"
              render={props => 
                  <Home />
              }
            />

            <Route
              exact
              path="/"
              render={props => 
                  <Welcome />
              }
            />

            <Route
              exact
              path="/login"
              render={props => 
                !isAuthenticated? (
                  <Login setAuth={setAuth}/>
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            <Route
              exact
              path="/signup"
              render={props => 
                !isAuthenticated? (
                  <Signup setAuth={setAuth}/>
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            <Route
              exact
              path="/question/:questionId"
              render={props => 
                  <QuestionWithAnswers isAuthenticated={isAuthenticated} setAuth={setAuth}/>
              }
            />

            <Route
              exact
              path="/myQuestions"
              render={props => 
                  <MyQuestions isAuthenticated={isAuthenticated} />
              }
            />

            <Route
              exact
              path="/account"
              render={props => 
                  <Account />
              }
            />

            <Route
              exact
              path="/notifications"
              render={props => 
                  <Notifications />
              }
            />
        
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
