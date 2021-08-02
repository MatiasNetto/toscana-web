import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

//assets
import logoIMG from '../../assets/logos/Logo-V2.png';
import { useAuth } from '../../auth/AuthContext';
import { colorBrown, colorCrema } from '../../components/Styles';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  height: 70%;
  width: 40%;
  background: #eaeaff;
  box-shadow: 0 5px 30px #0005;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* padding: 5% 0; */
`;

const Logo = styled.img`
  height: 10vh;
  transform: translateY(20px) scale(180%);
`;

const InputContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 2em;
`;

const Input = styled.input`
  height: 7vh;
  font-size: 2em;
  padding-left: 10px;
  border: 1px solid #009eff;

  &:focus {
    border: 3px solid #009eff;
    outline: none;
  }

  &::placeholder {
    font-size: 0.8em;
    opacity: 30%;
  }
`;

const InputSubmit = styled.input`
  height: 7vh;
  width: 80%;
  font-size: 2em;
  margin: 0 auto;
  cursor: pointer;
  background: #009eff;
  border: none;
`;

const LoginPage = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //hace login, en caso de ser correcto redirecciona a admin, si no muestra un error
    try {
      setLoading(true);
      await login(credentials.user, credentials.password);
      history.push('/admin');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          alert('Usuario o contrasena incorrecta');
          break;
        default:
          alert(err.message);
          break;
      }
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo src={logoIMG} />
        <InputContainer>
          <Label htmlFor="user">Usuario</Label>
          <Input onChange={handleChange} type="email" name="user" id="user" placeholder="e-mail" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">Contrasena</Label>
          <Input onChange={handleChange} type="password" name="password" id="password" placeholder="password" />
        </InputContainer>

        <InputSubmit type="submit" value="Log In" disabled={loading} />
      </Form>
    </Container>
  );
};

export default LoginPage;
