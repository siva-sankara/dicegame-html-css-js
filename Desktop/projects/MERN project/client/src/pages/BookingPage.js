import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideloading, showloading } from "../redux/features/alertSlice";

function BookingPage() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDooctors] = useState([]);
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [isavailable, setisavailable] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDooctors(res.data.data);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
    }
  };

  const handleBokking = async () => {
    try {
      setisavailable(true);
      if(!date && !time)
      {
        return alert("Date & time Required ")
      }
      dispatch(showloading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
      message.error("appointment went wrong please try again");
    }
  };
// ================handle availability ==========
  const handleAvailability = async () => {
    try {
      dispatch(showloading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        setisavailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <div className="text-center">
        <h4>BookingPage</h4>
      </div>
      <div className="continer m-2 p-2">
        {doctor && (
          <div>
            <h4>
              {" "}
              <i>
                <u>Doctor Name :</u>
              </i>
              {"  "}Dr.{doctor.firtName}
              {doctor.lastName}
            </h4>
            <h4>
              <i>
                <u>Specialization </u>{" "}
              </i>
              : {"  "}
              {doctor.specialization}
            </h4>
            <h4>
              <i>
                <u>Fees</u>{" "}
              </i>
              :{"  "}
              {doctor.feesPerCunsaltation}
            </h4>
            <h4>
              <i>
                <u>Timings</u>
              </i>{" "}
              :
            </h4>
            {/* <h4>Timings :{doctor.timings[0]}-{doctor.timing[1]}</h4> */}
            <div className="d-flex flex-column w-50">
              <DatePicker
              aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(values) => {
                   
                   setDate(moment(values).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
               aria-required={"true"}
                className="m-2"
                format="HH:mm"
                onChange={(values) => {
                  
                  setTime(moment(values).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary m-2 "
                onClick={handleAvailability}
              >
                Check Availability
              </button>
            
                
                    <button className="btn btn-dark m-2 " onClick={handleBokking}>
                Book Now
              </button>
               
              {/* <DatePicker format="DD-MM-YYYY" onChange={(values)=> moment(values).format("DD-MM-YYYY")} />
                  <TimePicker.RangePicker format="HH:mm" onChange={(values)=> setTiming([moment(values[0]).format("HH:mm"),
                moment(values[1]).format("HH:mm")])}/> */}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default BookingPage;
