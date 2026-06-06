import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ShowUser() {
    const apiUrl = "http://localhost:3000"
    const [user,setUser] = useState([])
    const [alert,setAlert] = useState({
        success: true,
        message: ""
    })


    const fetchUsers = async () =>{

    try{
    const res =  await axios.get(`${apiUrl}/users`)
    console.log(res);
   setUser(res.data.users)
   }

   catch(err){
    console.log(err);
    setAlert({
        success:false,
        message: err.response?.data?.message || "Error occurred"
    })
    
}
    }

    useEffect(()=>{
        fetchUsers()
    },[])

    const deleteUser = async (id)=>{
    try{
    const res = await axios.delete(`${apiUrl}/users/${id}`)

  
    toast.success(res.data.message)
  
    }
  catch(err){
     console.log(err);
    
        toast.error(err.response?.data?.message || "Error Occured")
     
  }
  fetchUsers()
}
    return ( 
        <>
 <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">        
        <div className="card-body">
          <h3 className="mb-4 fw-bold">Category List 🪑</h3>
          {alert.message && (
          <p style={{color: alert.success ? "green" : "red"}}>{alert.message}</p>
           )}
          <div className="table-responsive">
            
            <table className="table table-bordered table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {
                    user.map((user,index)=>{
                        return <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                     

                      <td>

                        <button className="btn btn-sm btn-danger" onClick={()=>deleteUser(user._id)}>Delete</button>
                      </td>
                    </tr>
                    })
                    
                }
            
                   
              

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
        </>
     );
}

export default ShowUser;