import React,{ useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'





function Users() {
  const [ userdata , setuserdata] = useState([])

  // const handleBlockUser = async(req,res) =>{
  //   try {
  //     const { appointmentsId, status } = req.body;
  //     const appointments = await appointmentModel.findByIdAndUpdate(
  //       appointmentsId,
  //       { status }
  //     );
  //     const user = await userModel.findOne({ _id: appointments.userId });
  //     const notification = user.notification;
  //     notification.push({
  //       type: "Status - Updated",
  //       message: `Your appointment has been Deletedd ${status} `,
  //       onclickPpath: "/block-user",
  //     });
  //     await user.save();
  //     res.status(200).send({
  //       success: true,
  //       data: user,
  //       message: "status updated Successfully",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       message: "Error  in  update status",
  //       success: false,
  //       error,
  //     });
  //   }
  // };
  

  //getusers
  const getUsers = async()=>{
      try {
        const res = await axios.get('/api/v1/admin/getAllUsers',{
          headers:{
            Authorizationn :` Baerer ${localStorage.getItem('token')}`
          }
        });
        
        if(res.data.success)
        {
          setuserdata(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(()=>{
    getUsers();
  },[])
  
//antd table col
const columns = [
  {
    title:'Name',
    dataIndex:'name'
  },
  {
    title:'Email',
    dataIndex:'email',
  },
  // {
  //   title:"Created At",
  //   dataIndex:"createdAt",
  // },
 {
    title:"Doctor",
    dataIndex:"isDoctor",
    render:(text, record)=>(
      <span>{record.isDoctor ? "Yes"  : " No"}</span>
    )
  },
  {
    title:"Action",
    dataIndex:"actions",
    render:(text,record)=>(
      <div className='d-flex'>
        <button className='btn btn-danger'>Block</button>
      </div>
    )
  }

]

  return (
   <Layout >
     <h1  className='text-center m-2'>users list</h1>
     <Table columns={columns} dataSource={userdata} />
   </Layout>
  )
}

export default Users