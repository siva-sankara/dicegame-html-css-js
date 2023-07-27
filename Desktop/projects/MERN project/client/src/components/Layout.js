import React from "react";

import { adminMenu, userMenu } from "../data/homedata";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsBellFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { LuLogOut } from "react-icons/lu";
import { message, Badge } from "antd";
import { AiFillHome } from "react-icons/ai";
import { BsListStars } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };
  // doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <AiFillHome />,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: <BsListStars />,
    },
    {
      name: "Profile",
      path: "/doctor/profile",
      icon: <FaUserAlt />,
    },
  ];
  // rendering menu list
  const sideBarMenu =
    user && user.isAdmin
      ? adminMenu
      : user && user.isDoctor
      ? doctorMenu
      : userMenu;
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo ">
            <div className="logo-img">
              {/* <img src={img1} className="logo-img" /> */}
              <FaHandHoldingMedical className="logo1" />
              <h4>Doctor App</h4>
            </div>
            <hr></hr>
          </div>
          <div className="menu">
            {sideBarMenu.map((obj, index) => {
              let isActive = location.pathname === obj.path;

              return (
                <div
                  key={index}
                  className={`menu-items ${isActive && `active`}`}
                >
                  <span className="icons">{obj.icon}</span>
                  <Link
                    to={obj.path}
                    className={`menu-links ${
                      isActive && `active`
                    } nav-animation`}
                  >
                    {obj.name}
                  </Link>
                </div>
              );
            })}
            <div className={`menu-items`} onClick={handleLogOut}>
              <span className="icons">
                <LuLogOut />
              </span>
              <Link to="/login" className="menu-links">
                LogOut
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content" style={{ cursor: "pointer" }}>
            <TypeAnimation className="animated-text"
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "We produce food for Mice We produce food for Mice",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "We produce food for Hamsters",
                  1000,
                  "We produce food for Guinea Pigs",
                  1000,
                  "We produce food for Chinchillas",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "16px", display: "inline-block" }}
                repeat={Infinity}
              />
              <div>
                <Badge
                  className=" badge"
                  onClick={() => {
                    navigate("/notification");
                  }}
                  count={user && user.notification.length}
                >
                  <BsBellFill className="notification" />
                </Badge>
                <span>
                  <Link className="profile " to="/doctor/profile">
                    {user.name}
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
        <div className="sidebar1">
          <div className="menu1">
            {sideBarMenu.map((obj, index) => {
              let isActive = location.pathname === obj.path;
              return (
                <div
                  key={index}
                  className={`menu-items1 ${isActive && `active1`}`}
                >
                  <Link
                    to={obj.path}
                    className={`menu-links1 ${
                      isActive && `active1`
                    } `}
                  >
                    {/* {obj.name} */}<span className="iconsq">{obj.icon}</span>
                  </Link>
                </div>
              );
            })}
            <div className={`menu-items1`} onClick={handleLogOut}>
              <span className="icons">
                <LuLogOut />
              </span>
              <Link to="/login" className="menu-links1">
                {/* LogOut */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
