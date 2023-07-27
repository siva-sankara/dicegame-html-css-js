import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorList({ doctor }) {
  const navigate = useNavigate();
  return (
    <div >
      <div
        className="card m-3 doctorlist"
        style={{cursor:"pointer"}}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          DR.{doctor.firtName} {doctor.lastName}
        </div>
        <div className ="card-body">
          <p>
            <b>Specialization :</b>
            {doctor.specialization}
          </p>
          <p>
            <b>Experience :</b>
            {doctor.experience}
          </p>

          <p>
            <b>Fee Per Cunsaltation :</b>
            {doctor.feesPerCunsaltation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
