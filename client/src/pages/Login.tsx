import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import styles from '../styles/container.module.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {isAuthenticated,error} = useSelector((state: any) => state.LoginReducer);

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/map");
    }
  }, [isAuthenticated]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(username, password) as any);
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <label htmlFor="password">Password</label>
        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        <a href="/register">Register</a>
      </form>
    </div>
  );
};

export default LoginPage;
