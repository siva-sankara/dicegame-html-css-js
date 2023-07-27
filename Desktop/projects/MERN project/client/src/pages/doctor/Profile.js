import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import useSelection from "antd/es/table/hooks/useSelection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row, Input, TimePicker, message } from "antd";
import { useDispatch } from "react-redux";
import { showloading, hideloading } from "../../redux/features/alertSlice";
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelection((state) => state.user);
  const [doctordata, setDoctordata] = useState(null);
  //form handlers
  const handleFinish = async (values) => {
    try {
      
      dispatch(showloading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {...values},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log("naidu");
      console.log(error);
      dispatch(hideloading());
      message.error("something went wrong");
    }
  };

  // get Doctor Details
  const getDoctorInfo = async (req, res) => {
    try {
      const res = await axios.post("/api/v1/doctor/getDoctorInfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctordata(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
      <h3 className="doctorList text-center">Manage Profile</h3>
      {doctordata && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={doctordata}
        >
          <h6 className="">Personal Details :</h6>
          <Row gutter={20}>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="First Name"
                name="firtName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Phone "
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="E-mail"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Adress"
                name="adress"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Fee  "
                name="feesPerCunsaltation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Timing"
                name="timing"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col> */}
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary mt-3 " type="submit">
              Update
            </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
}

export default Profile;
