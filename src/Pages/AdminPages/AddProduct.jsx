import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [category,setCategory] = useState([])

      const [product,setProduct] = useState({
        name: "",
        description:"",
        price:"",
        category:"",
        image:"",
        stock:""
    })
    const [alert,setAlert] = useState({
        success:true,
        message:""
    })

  const apiUrl = "http://localhost:3000";
   const navigate = useNavigate();

    const fetchCategories = async()=>{
    try{
  const res = await axios.get(`${apiUrl}/category`)
  console.log(res); 

  setCategory(res.data.categories)
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


    const handleProductInputChange =(e)=>{
    let {name,value} = e.target
    setProduct((prev)=>{
        return{
            ...prev,
            [name]: value,
        }
    })
    }

      const handleProductImageInputChange =(e)=>{
    let {name,files} = e.target
    setProduct((prev)=>{
        return{
            ...prev,
            [name]: files[0],
        }
    })
    }

    const handleProductSubmit = async(e)=>{
        try{
          e.preventDefault();
          let formData = new FormData();

          formData.append("name",product.name)
          formData.append("description",product.description)
          formData.append("price",product.price)
          formData.append("category",product.category)
          formData.append("image",product.image)
          formData.append("stock",product.stock)
   
       const res = await axios.post(`${apiUrl}/product`,formData)
        console.log(res);
         if (res.data.success) {
        setAlert({
          success: res.data.success,
          message: res.data.message
        })

          navigate('/dashboard/show-product')
      }
          
        setProduct({
         name: "",
        description:"",
        price:"",
        category:"",
        image:"",
        stock:""
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
            {alert.message && (
                    <p style={{color: alert.success ? "green" : "red"}}>
                        {alert.message}
                    </p>
                 )}
          <h3 className="text-center mb-4 fw-bold">
            Add Product 🪑
          </h3>
           
          <form>

            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" name="name" value={product.name} onChange={handleProductInputChange} className="form-control rounded-3" placeholder="Enter product name"/>
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" name="price" value={product.price} onChange={handleProductInputChange} className="form-control rounded-3" placeholder="Enter price"/>
            </div>

            {/* Stock */}
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input type="number" name="stock" value={product.stock} onChange={handleProductInputChange} className="form-control rounded-3" placeholder="Enter stock quantity"/>
            </div>

            {/* Category Dropdown */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select name="category" value={product.category} onChange={handleProductInputChange} className="form-control rounded-3">

                 <option value="">Select Category</option>
                {
                  category.map((cat)=>{                
                    return <option key={cat._id} value={cat._id}>{cat.categoryname}</option> 
                    })         
                  }
              </select> 
                      
            </div>

            {/* Image URL */}
          <input
            type="file" onChange={handleProductImageInputChange} name="image" className="form-control rounded-3"/>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label">Description</label>
              <textarea
                name="description" value={product.description} onChange={handleProductInputChange}
                className="form-control rounded-3" rows="4" placeholder="Enter product description">
                </textarea>
            </div>

            {/* Button */}
            <button
              type="button" className="btn btn-dark w-25 rounded-3" onClick={handleProductSubmit}> 
              Add Product
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

export default AddProduct;