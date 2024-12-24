import { ChangeEvent, useEffect, useState } from "react";
import styles from '../styles/container.module.css';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {result,error} = useSelector((state: any) => state.RegisterReducer);

  useEffect(()=>{
    if(result){
      navigate("/login");
    }
  }, [result]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(formData.username, formData.password) as any);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <p style={{color:"red"}}>{error}</p>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <a href="/login">Login</a>
      </form>
    </div>
  );
};

export default RegisterPage;
