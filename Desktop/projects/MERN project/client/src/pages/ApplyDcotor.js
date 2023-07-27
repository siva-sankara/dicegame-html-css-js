import React from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Form, Row, Input, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showloading, hideloading } from "../redux/features/alertSlice";
function ApplyDcotor() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      dispatch(showloading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideloading());
      message.error("something went wrong");
    }
  };
  return (
    <Layout>
      <div>
        <h2 className="text-center doctorList">Apply Doctor</h2>
        <Form className="applydoctor" layout="vertical" onFinish={handleFinish}>
          <h4 className="">Personal Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="First Name"
                name="firtName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Phone "
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="E-mail"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="example@gmail.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Adress"
                name="adress"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Address" />
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
                <Input type="text" placeholder="Specification" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={20} lg={8}>
              <Form.Item
                label="Fee  "
                name="feesPerCunsaltation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Ammount / Fee" />
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
            <button className="btn btn-primary ml-auto" type="subbmit">
              Submit
            </button>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
}

export default ApplyDcotor;
