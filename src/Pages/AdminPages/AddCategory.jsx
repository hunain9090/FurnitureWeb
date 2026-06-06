import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCatgory() {

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

    const handleCategoryInputChange =(e)=>{
    let {name,value} = e.target
    setCategory((prev)=>{
        return{
            ...prev,
            [name]: value,
        }
    })
    }

    const handleCategorySubmit = async(e)=>{
        try{
       e.preventDefault();
       const res = await axios.post(`${apiUrl}/category`,category)
        console.log(res);
        
        if(res.data.success){
            setAlert({
                success:res.data.success,
                message:res.data.message
            })
            navigate("/dashboard/show-category")
        }
          
        setCategory({
         categoryname: "",
        description: ""
        })

    }
    catch(err){
        console.log(err);
        setAlert({
            success: false,
            message: err.response?.data?.message || "Error occurred"
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
                Add Category 🪑
              </h3>

               {alert.message && (
                    <p style={{color: alert.success ? "green" : "red"}}>
                        {alert.message}
                    </p>
                 )}
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
                  <textarea name="description" value={category.description} onChange={handleCategoryInputChange} className="form-control rounded-3"
                    rows="4" placeholder="Enter category description"
                  ></textarea>
                </div>

                {/* Button */}
                <button
                  type="button"
                  className="btn btn-dark w-20 rounded-3"
                  onClick={handleCategorySubmit} 
                >
                  Add Category
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

export default AddCatgory;