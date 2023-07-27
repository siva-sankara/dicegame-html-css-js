import React, { useEffect ,useState} from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import DoctorList from "../components/DoctorList";
function Homepage() {
  const [doctors , setDooctors] = useState([])
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",
        {
          headers : {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setDooctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <div >
      <Layout >
         <h2 className="text-center doctorList">All Doctors List</h2>
        <Row  className="alldoctors">
          {
            doctors && doctors.map((doctor) =>(
              <DoctorList  doctor={doctor} />
            ))
          }
        </Row>
      </Layout>
    </div>  );
}

export default Homepage;
