import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Spinner from "./components/Spinner";
import ProctectedRoute from "./components/ProctectedRoute";
import PubliceRouter from "./components/PubliceRouter";
import ApplyDcotor from "./pages/ApplyDcotor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import ProfilePage from "./pages/admin/ProfilePage";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {


  const loading = useSelector((state) => state.alerts.loader);
  return (
    <div>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProctectedRoute>
                    <Homepage />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/notification"
                element={
                  <ProctectedRoute>
                    <NotificationPage />
                  </ProctectedRoute>
                }
              />
              



              <Route
                path="/admin/doctor"
                element={
                  <ProctectedRoute>
                    <Doctors />
                  </ProctectedRoute>
                }
              /><Route
              path="/apply-doctor"
              element={
                <ProctectedRoute>
                  <ApplyDcotor />
                </ProctectedRoute>
              }
            />
            <Route
                path="/admin/users"
                element={
                  <ProctectedRoute>
                    <Users />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProctectedRoute>
                    <ProfilePage />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/doctor/book-appointment/:doctorId"
                element={
                  <ProctectedRoute>
                    <BookingPage />
                  </ProctectedRoute>
                }
              />

              <Route
                path="/doctor/profile"
                element={
                  <ProctectedRoute>
                    <Profile />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/doctor-appointments"
                element={
                  <ProctectedRoute>
                    <DoctorAppointments />
                  </ProctectedRoute>
                }
              />
              
              <Route
                path="/appointments"
                element={
                  <ProctectedRoute>
                    <Appointments />
                  </ProctectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PubliceRouter>
                    <Login />
                  </PubliceRouter>
                }
              />
              <Route
                path="/register"
                element={
                  <PubliceRouter>
                    <Register />
                  </PubliceRouter>
                }
              />
               
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
