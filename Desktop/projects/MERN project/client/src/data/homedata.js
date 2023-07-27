import React from 'react';

import {AiFillHome} from 'react-icons/ai';
import {BsListStars} from 'react-icons/bs';
import {GiDoctorFace} from 'react-icons/gi';
import {FaUserAlt} from 'react-icons/fa';

export const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    name: "Appointment",
    path: "/appointments",
    icon: <BsListStars />,
  },    
  {
    name: "Apply-Doctor",
    path: "/apply-doctor",
    icon: <GiDoctorFace />,
  }, 
  {
    name: "Profile",
    path: "/doctor/profile",
    icon: <FaUserAlt />,
  }
];



//admin  menu data
export const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: <AiFillHome />,
  },
  {
    name: "Doctors",
    path: "/admin/doctor",
    icon: <GiDoctorFace />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <FaUserAlt />,
  },
  // {
  //   name: "Profile",
  //   path: "/admin/profile",
  //   icon: <FaUserAlt />,
  // },


];
