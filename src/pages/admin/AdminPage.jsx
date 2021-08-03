import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

//assets
import EditIMG from '../../assets/buttons/Edit-BTN.png';
import AddIMG from '../../assets/buttons/Add-BTN.png';
import DeleteIMG from '../../assets/buttons/Delete-BTN.png';
import OutIMG from '../../assets/buttons/Exit-BTN.png';
import { colorBrown, colorCrema, desktopMediaQuery } from '../../components/Styles';
import { useAuth } from '../../auth/AuthContext';

const Mode = styled(NavLink)`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colorBrown};
  text-decoration: none;
  font-size: 1.5em;

  background: ${colorCrema};
  transition: filter 0.4s;

  &:hover {
    filter: brightness(80%);
  }
  ${desktopMediaQuery} {
    height: 100%;
    width: 50%;
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

const LogOutBtn = styled.img`
  width: 38px;
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;

  ${desktopMediaQuery} {
    width: 50px;
    top: 20px;
    left: 20px;
  }
`;

const AdminPage = () => {
  const { logOut } = useAuth();
  const handleLogOut = () => {
    logOut();
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

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
      <LogOutBtn src={OutIMG} onClick={handleLogOut} />
    </>
  );
};

export default AdminPage;
