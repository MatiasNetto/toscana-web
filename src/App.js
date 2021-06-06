import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//pages
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import CartegoryPage from './pages/CategoryPage';
import AdminHomePage from './pages/admin/AdminHomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/test" exact component={TestPage} />
        <Route path="/category/:category" exact component={CartegoryPage} />
        <Route path="/admin" exact component={AdminHomePage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
