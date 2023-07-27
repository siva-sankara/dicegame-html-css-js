import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { hideloading, showloading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/UserSlice';
function ProctectedRoute({children}) {
 const dispatch =  useDispatch();
 const {user} = useSelector ( (state)=> state.user);
  const getUser = async()=>{
    try {
      dispatch(showloading());
      const res = await axios.post('/api/v1/user/getUserData',
      {token  : localStorage.getItem('token')},{
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideloading());
      if(res.data.success){
        dispatch(setUser(res.data.data));
      }
      else{
        <Navigate to="/login" />
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideloading())
      localStorage.clear();
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!user){
      getUser();
    }
  },[])


  if(localStorage.getItem("token")){
    return children;
  }else{
    return <Navigate to='/login'></Navigate> 
 }

}

export default ProctectedRoute