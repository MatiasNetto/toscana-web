import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

//pages
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import CartegoryPage from './pages/CategoryPage';
import AdminEditProductPage from './pages/admin/AdminEditProductPage';
import ProductPage from './pages/ProductPage';
import NavBar from './components/NavBar';
import AdminPage from './pages/admin/AdminPage';
import AdminAddProductPage from './pages/admin/AdminAddProductPage';
import AdminDeleteProductPage from './pages/admin/AdminDeleteProductPage';
import { colorCrema } from './components/Styles';
import LoginPage from './pages/admin/LoginPage';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Page404 from './pages/admin/Page404';
import Admin from './pages/adminPage/Admin';
import { useEffect } from 'react';
import { db } from './components/Firebase';
import { AnalyticsProvider } from './components/adminPage/AnalitycsContext';

//STYLES

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400;1,600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${colorCrema};
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
      <AuthProvider>
        <AnalyticsProvider>
          <Switch>
            <Route path="/test" exact component={TestPage} />
            <Route path="/category/:category" exact component={CartegoryPage} />
            <Route path="/category/:category/:productId" exact component={ProductPage} />
            <Route path="/login" exact component={LoginPage} />
            <PrivateRoute path="/admin/" exact children={<Redirect to="/admin/products" />} />
            <PrivateRoute path="/admin/:section" exact component={Admin} />
            <Route exact path="/" component={HomePage} />
            <Route path="*" component={Page404} />
          </Switch>
        </AnalyticsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
