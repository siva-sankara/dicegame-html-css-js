import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideloading, showloading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NotificationPage() {
    const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();



  const handleMarkAllRead = async () => {
    try {
      dispatch(showloading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
        console.log(res.data.message);
      } else {
        message.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Some thing went Wrong");
    }
  };

  //delete notifications
  const handleDeleteAllRead = async(res,req) => {
    try {
        dispatch(showloading());
        const res = await axios.post('/api/v1/user/delete-all-notification',{userId : user._id},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideloading())
        if(res.data.success)
        {
            message.success(res.data.message)
            window.location.reload();
        }else{
            message.error(res.data.message)
        }
    } catch (error) {
        console.log(error);
        message.error("Some thing went Wrong");
    }
  };
  const userNotification = user.notification;
  const seenNotification =  user.seenNotification;
  return (
    <Layout>
      <h3 className="p-3 doctorList textd-center">Notifications</h3>
      <Tabs>
        <Tabs.TabPane tab="UnRead " key={0}>
          <div className="d-flex justify-content-end"style={{cursor:"pointer"}} >
            <h6 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h6>
          </div>
          {user &&
            userNotification.map((notificationMsg) => (
              <div className="card notification-tab" style={{cursor:"pointer"}} >
                <div className="card-text"onClick={navigate(notificationMsg.onClickPath)}>{notificationMsg.message}</div>
              </div>
            ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end"style={{cursor:"pointer"}}>
            <h6 className="p-2" onClick={handleDeleteAllRead}>
              Delete All Read
            </h6>
          </div>
          {user &&
            seenNotification.map((notificationMsg) => (
              <div className="card" style={{cursor:"pointer"}} >
                <div className="card-text"onClick={navigate(notificationMsg.onClickPath)}>{notificationMsg.message}</div>
              </div>
            ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default NotificationPage;
