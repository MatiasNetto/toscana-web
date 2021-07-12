import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

//pages
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import CartegoryPage from './pages/CategoryPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import ProductPage from './pages/ProductPage';
import NavBar from './components/NavBar';

//STYLES

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400;1,600&display=swap');

  * {
    scroll-behavior: smooth;
  }
  p,div,li,ul,a,button {
    font-family: 'Abhaya Libre', serif;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Playfair Display', serif;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <NavBar />
      <Switch>
        <Route path="/test" exact component={TestPage} />
        <Route path="/category/:category" exact component={CartegoryPage} />
        <Route path="/category/:category/:productId" exact component={ProductPage} />
        <Route path="/admin" exact component={AdminHomePage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
