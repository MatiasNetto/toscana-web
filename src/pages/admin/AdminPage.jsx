import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import AdminAddProductPage from './AdminAddProductPage';
import AdminEditProductPage from './AdminEditProductPage';

//assets
import EditIMG from '../../assets/buttons/Edit-BTN.png';
import AddIMG from '../../assets/buttons/Add-BTN.png';
import DeleteIMG from '../../assets/buttons/Delete-BTN.png';

const Mode = styled(NavLink)`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #fff;
  transition: background 0.4s;

  &:hover {
    background: #ddf;
  }
`;

const Image = styled.img`
  width: 50%;
  padding-bottom: 20px;
`;

const Grid = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
`;

const AdminPage = () => {
  return (
    <>
      <Grid>
        <Mode to="/admin/edit">
          <Image src={EditIMG} />
          Edit Product
        </Mode>
        <Mode to="/admin/add">
          <Image src={AddIMG} />
          Add Product
        </Mode>
        <Mode to="/admin/delete">
          <Image src={DeleteIMG} />
          Delete Product
        </Mode>
      </Grid>
    </>
  );
};

export default AdminPage;
