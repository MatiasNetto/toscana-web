import './App.css';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

//pages
import TestPage from './pages/TestPage'

function App() {
  return (
    <Router>
      <Switch>

      <Route path='/test' exact children={TestPage}/>
      <Route exact path='/' children='home'/>

      </Switch>
    </Router>
  );
}

export default App;
