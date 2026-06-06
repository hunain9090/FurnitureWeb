import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCategory() {
    const [category,setCategory] = useState({
        categoryname: "",
        description: ""
    })
    const [alert,setAlert] = useState({
        success:true,
        message:""
    })

  const apiUrl = "http://localhost:3000";
   const navigate = useNavigate();
   const {id} = useParams()

   const fetchCategory = async()=>{
    try{
    const res = await axios.get(`${apiUrl}/category/${id}`)
      setCategory(res.data.category)

    }
    catch(err){
        console.log(err);     
       setAlert({
        success:false,
        message:err.res?.data?.message || "Error Ocuured"
       }) 
    }
   }
   useEffect(()=>{
    fetchCategory()
   },[])

   const handleCategoryInputChange =(e)=>{
     let {name,value} = e.target
     setCategory((prev)=>{
        return {
            ...prev,
            [name]: value
        }
     })
   }

  const handleEditsubmit = async () => {
    try{
     let res = await axios.put(`${apiUrl}/category/${id}`,category)
     console.log(res);
     
    setAlert({
      success:res.data.success,
      message: res.data.message
    }) 
     navigate('/dashboard/show-category')
    }
   catch(err){
    console.log(err);
      setAlert({
        success:false,
        message:err.response?.data?.message || "Error Ocuured"
       }) 
    
   }
  }
    return ( 
    <>
   <div className="container mt-5">
      
      <div className="row">
        <div className="col-md-12 mx-auto">

          <div className="card shadow-lg border-0 rounded-4">
            
            <div className="card-body p-4">

              <h3 className="text-center mb-4 fw-bold">
                Edit Category 🪑
              </h3>

            
              <form>

                {/* Category Name */}
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text" name="categoryname" value={category.categoryname} onChange={handleCategoryInputChange} className="form-control rounded-3" 
                    placeholder="Enter category name" required/>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea name="description" onChange={handleCategoryInputChange} value={category.description} className="form-control rounded-3"
                    rows="4" placeholder="Enter category description"
                  ></textarea>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={handleEditsubmit}
                  className="btn btn-dark w-20 rounded-3"
                >
                  Update
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

    </div>   
     </>
     );
}

export default EditCategory;