import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Button, Table, message } from "antd";
import moment from "moment";
function Appointments() {
  const [appointments, setAppointments] = useState();

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
        getAppointments();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleStatus(record, "Approved")}
            >
              Approve
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => handleStatus(record, "pending")}
            >
              Block
            </button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h3 className="text-center doctorList">Appointments List</h3>
      <Table 
        columns={columns}
        dataSource={appointments}
        className="appointment--table"
        bordered="2px solid black"
      ></Table>
    </Layout>
  );
}

export default Appointments;
