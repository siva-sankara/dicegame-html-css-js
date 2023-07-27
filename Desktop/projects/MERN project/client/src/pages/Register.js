import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showloading, hideloading } from "../redux/features/alertSlice";

function Register() {
  const navigate = useNavigate();

  //dispatch
  const dispatch = useDispatch()
  
  const onfinishHandler = async (values) => {
    try {
      dispatch(showloading());
      const res = await fetch("http://localhost:3000/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      dispatch(hideloading());
      if (res.ok) {
        message.success("Register successfully !");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <div className="login-main" >
      <div className="form-container">
        <Form
          className="register-form"
          layout="vertical"
          onFinish={onfinishHandler}
        >
          <h1 className="text-center  login--head">Register Form</h1>

          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <div className="btn-div">
          <Link to="/login" className="m-2 ">
            Alraedy user login here
          </Link>
          <button className="btn btn-primary d-end" type="submit">
            Register
          </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
