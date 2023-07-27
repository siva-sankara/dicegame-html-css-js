import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {  showloading, hideloading } from "../redux/features/alertSlice";
import {useDispatch} from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showloading());
      const res = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      window.location.reload();
      const data = await res.json();
      dispatch(hideloading());
      // if(!data.token){
      //   message.error("check password");
      // }
      if(data.success) {
        localStorage.setItem("token",data.token);
        message.success("Login successfully !");
        navigate("/");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <div className="login-main">
      <div className="form-container">
        <Form
          className="register-form"
          layout="vertical"
          onFinish={onfinishHandler}
        >
          <h1 className="text-center  login--head">Login Form</h1>

          <Form.Item label="Email :"  name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password :" name="password">
            <Input type="password" required />
          </Form.Item>
          <div className="btn-div">
          <Link to="/register" className="m-2 ">
            Not a user Register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
