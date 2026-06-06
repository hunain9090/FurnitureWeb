import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ShowCategory() {

const [category,setCategories] = useState([])
const [alert,setAlert] = useState({
    success:true,
    message: ""
})

const apiUrl = "http://localhost:3000";
const navigate = useNavigate()

const fetchCategories = async()=>{
    try{
  const res = await axios.get(`${apiUrl}/category`)
  console.log(res); 

  setCategories(res.data.categories)
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
    fetchCategories()
},[])

const deletCategory = async (id)=>{
    try{
    const res = await axios.delete(`${apiUrl}/category/${id}`)

   setAlert({
    success: res.data.success,
    message: res.data.message
   }) 
    }
  catch(err){
     console.log(err);
     setAlert({
        success: false,
        message: err.response?.data?.message || "Error Occured"
     })
  }
  fetchCategories()
}

 const editCategory = async (id) => {
    navigate(`/dashboard/edit-category/${id}`)
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
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                    category.map((cat,index)=>{
                        return <tr key={cat._id}>
                      <td>{index + 1}</td>
                      <td>{cat.categoryname}</td>
                      <td>{cat.description}</td>
                     

                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={()=>editCategory(cat._id)}>Update</button>

                        <button className="btn btn-sm btn-danger" onClick={()=>deletCategory(cat._id)}>Delete</button>
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

export default ShowCategory;