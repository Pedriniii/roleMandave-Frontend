import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorMessage = () => {
    toast.error('Usuário ou senha incorretos', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value); // Change apelido to email
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://role-mandave.vercel.app/loginAuth', {
        email, 
        password,
      });

      if (response.data.error){
        errorMessage();
        console.log(response.data.error)
      } else {
        navigate('/initialPage');
      }
    } catch (error) {
      console.log("caiu no catch");
    }
  };

  return (
    <div className={'logArea'}>
      <div className={'logo'}>Role Mandave</div>
      <div className={'compName'}>JYP</div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Digite seu email" 
            className={'userIn'}
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Senha"
            className={'userIn'}
            value={password}
            onChange={handlePasswordChange}
          />
          <input type="submit" className={'submitBtn'} value="Log in" />
        </div>
      </form>
    </div>
  );
};

export default Login;
