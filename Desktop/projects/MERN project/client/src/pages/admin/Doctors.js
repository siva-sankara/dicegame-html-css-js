import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, message } from "antd";
import axios from "axios";
import { white } from "colors";

function Doctors() {


  const [doctorsdata, setDoctorsData] = useState([]);
  const getDoctors = async () => {
    try {
      const doctors = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Baerer ${localStorage.getItem("token")}`,
        },
      });
      if (doctors.data.success) {
        setDoctorsData(doctors.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);


  const  handleAccountStatus = async(record ,status) =>{
    try {
      const res = await axios.post('/api/v1/admin/changeAccountStatus',{
        doctorId:record._id,
        userId :record.userId,
        status:status,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success)
      {
        message.success(res.data.message)
        window.location.reload();
      }
      
    } catch (error) {
      message.error("some thing went wrong ")
    }
  }
  const  handleAccountStatusBlock = async(record ,status) =>{
    try {
      const res = await axios.post('/api/v1/admin/changeAccountStatus',{
        doctorId:record._id,
        userId :record.userId,
        status:status,
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success)
      {
        message.success(res.data.message)
        window.location.reload();
      }
      
    } catch (error) {
      message.error("some thing went wrong ")
    }
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firtName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={()=> handleAccountStatus(record, "Approved")}>Approve</button>
          ) : (
            <button className="btn btn-danger"onClick={()=> handleAccountStatusBlock(record, "pending")}>Block</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout className="doctorslistitems">
      <h1 className="text-center m-2">Doctor's List</h1>
      <Table style={{background:white}} columns={columns} dataSource={doctorsdata} />
    </Layout>
  );
}

export default Doctors;
