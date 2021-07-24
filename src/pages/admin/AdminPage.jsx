import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import AdminAddProductPage from './AdminAddProductPage';
import AdminEditProductPage from './AdminEditProductPage';

const Nav = styled.div`
  height: 5vh;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Mode = styled(NavLink)`
  height: 3em;
  width: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdminPage = () => {
  return (
    <>
      <Router>
        <Nav>
          <Mode to="/admin/edit">Edit</Mode>
          <Mode to="/admin/add">Add</Mode>
        </Nav>
        <Switch>
          <Route path="/admin/add" exact component={AdminAddProductPage} />
          <Route path="/admin/edit" exact component={AdminEditProductPage} />
        </Switch>
      </Router>
    </>
  );
};

export default AdminPage;
