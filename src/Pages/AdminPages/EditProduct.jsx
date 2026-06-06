import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    const apiUrl = "http://localhost:3000"
    const [product,setProduct] = useState({
        "name": "",
        "description": "",
        "price": "",
        "category": "",
        "image": "",
        "stock": "",  
    })
    const [category,setCategory] = useState([])
    const [alert,setAlert] = useState({
        success:true,
        message:""
    })
    const navigate = useNavigate()
    const {id} = useParams();

    const fetchProduct =async()=>{
        try{
       const res = await axios.get(`${apiUrl}/product/${id}`)
       if(res.data.success){
          setProduct(res.data.product);

        setAlert({
          status: res.data.success,
          message: res.data.message,
        });
       }
      
      
        }

       catch(err){
        console.log(err);     
       setAlert({
        success:false,
        message:err.response?.data?.message || "Error Ocuured"
       }) 
    }
    }


     const fetchCategory =async()=>{
        try{
       const res = await axios.get(`${apiUrl}/category`)
       setCategory(res.data.categories); 
        }

       catch(err){
        console.log(err);     
       setAlert({
        success:false,
        message:err.response?.data?.message || "Error Ocuured"
       }) 
    }
    }

    useEffect(()=>{
        fetchProduct()
        fetchCategory()
    },[])

      const handleInputOnChange = (e) => {
    let { name, value } = e.target;

    setProduct((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageInputOnChange = (e) => {
    let { name, files } = e.target;

    console.log(files[0]);

    setProduct({
      ...product,
      [name]: files[0],
    });
  };

    const handleProductEdit =async (e) =>{
        e.preventDefault();
        try{
         let formData = new FormData()

        formData.append("name",product.name);
        formData.append("description",product.description);
        formData.append("price",product.price);
        formData.append("category",product.category);
        formData.append("stock",product.stock);
       
        if(product.image instanceof File){
        
        formData.append("image",product.image);
        }
    let res = await axios.put(`${apiUrl}/product/${id}`,formData)
    if(res.data.success){

  setAlert({
    success:res.data.success,
    message:res.data.message
    })
    navigate('/dashboard/show-product')
    }    
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
            {alert.message && (
          <p style={{color: alert.success ? "green" : "red"}}>{alert.message}</p>
           )}
          <h3 className="text-center mb-4 fw-bold">
            Edit Product 🪑
          </h3>
           
          <form>

            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" name="name" value={product.name} onChange={handleInputOnChange} className="form-control rounded-3" placeholder="Enter product name"/>
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" name="price" value={product.price} onChange={handleInputOnChange} className="form-control rounded-3" placeholder="Enter price"/>
            </div>

            {/* Stock */}
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input type="number" name="stock" value={product.stock} onChange={handleInputOnChange} className="form-control rounded-3" placeholder="Enter stock quantity"/>
            </div>

            {/* Category Dropdown */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select name="category" value={product.category} onChange={handleInputOnChange} className="form-control rounded-3">

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
            type="file" name="image"  className="form-control rounded-3" onChange={handleImageInputOnChange}/>
<div className="form-group">
<img src={`${apiUrl}/uploads/${product.image}`} className="img-fluid" alt="" width="150px" />
                    
                  </div>
            {/* Description */}
            <div className="mb-4">
              <label className="form-label">Description</label>
              <textarea
                name="description" value={product.description} onChange={handleInputOnChange}
                className="form-control rounded-3" rows="4" placeholder="Enter product description">
                </textarea>
            </div>

            {/* Button */}
            <button
              type="submit" className="btn btn-dark w-25 rounded-3" onClick={handleProductEdit}> 
              Update Product
            </button>

          </form>

        </div>
      </div>

    </div>
  </div>
</div>
    </> );
}

export default EditProduct;