import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShowProduct() {
    const [products,setProducts] = useState([])
const [alert,setAlert] = useState({
    success:true,
    message: ""
})

const apiUrl = "http://localhost:3000";
const navigate = useNavigate()

const fetchProducts = async()=>{
    try{
  const res = await axios.get(`${apiUrl}/product`)
  console.log(res); 

  setProducts(res.data.products)
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
    fetchProducts()
},[])

const deleteProduct = async (id)=>{
    try{
    const res = await axios.delete(`${apiUrl}/product/${id}`)

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
  fetchProducts()
}

 const editProduct = async (id) => {
    navigate(`/dashboard/edit-product/${id}`)
  }

    return ( 
    <>
    <div className="container mt-5">
  <div className="card shadow-lg border-0 rounded-4">
    <div className="card-body">

      <h3 className="text-center mb-4 fw-bold">
        All Products 🪑
      </h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {/* yahan map chalega */}
            {products.map((product, index) => (
              <tr key={product._id}>
                
                <td>{index + 1}</td>

                {/* Image */}
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${product.image}`}
                    alt="product"
                    width="60"
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                </td>

                {/* Name */}
                <td>{product.name}</td>

                {/* Price */}
                <td>Rs. {product.price}</td>

                {/* Stock */}
                <td>
                  <span className={`badge ${product.stock > 0 ? "bg-success" : "bg-danger"}`}>
                    {product.stock > 0 ? product.stock : "Out of Stock"}
                  </span>
                </td>

                {/* Category */}
                <td>{product.category?.categoryname}</td>

                {/* Description */}
                <td style={{ maxWidth: "200px" }}>
                  {product.description?.slice(0, 50)}...
                </td>

                {/* Actions */}
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={()=>editProduct(product._id)}>
                    Edit
                  </button>

                  <button className="btn btn-danger btn-sm" onClick={()=>deleteProduct(product._id)}>
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </div>
  </div>
</div>
    </>
     );
}

export default ShowProduct;