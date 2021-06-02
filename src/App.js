import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

//pages
import TestPage from './pages/TestPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/test" exact children={TestPage} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
