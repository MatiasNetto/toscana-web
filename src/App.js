import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//pages
import TestPage from './pages/TestPage'

function App() {
  return (
    <Router>
      <Route path='/test' exact children={TestPage}/>
      <Route exact path='/' children='home'/>

    </Router>
  );
}

export default App;
