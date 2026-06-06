import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ShopCategory() {

const {id} = useParams();
const [products,setProducts]= useState([])
const apiUrl = "http://localhost:3000"
const navigate= useNavigate();


const fetchProducts = async ()=>{
    try{
    const res = await axios.get(`${apiUrl}/category/catpro/${id}`)
    console.log(res.data.products);
    
    setProducts(res.data.products)
    }
   catch(err){
    console.log(err);    
   }
}

useEffect(()=>{
    fetchProducts()
},[id])

  let navigateToProductDetail =(proid)=>{
    navigate(`/productdetail/${proid}`)
  }

    return ( 
    <>
    <h1>ProductCatgoery</h1>
       <div className="container my-5">
      
        <div className="row g-4">

          {products.map((pro) => {

          return <div className="col-lg-3 col-md-4 col-6" key={pro._id}>

              <div
                className="card h-100"
                style={{borderRadius: "12px",overflow: "hidden",border: "0.5px solid #ddd",transition: "transform 0.2s",}}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                {/* Image Section */}
                <div className="position-relative"
                  style={{ height: "220px", background: "#F1EFE8" }}>
                  <img
                    src={`${apiUrl}/uploads/${pro.image}`} alt={pro.name} className="w-100 h-100" style={{ objectFit: "cover" }}/>
                  <span
                    className="badge position-absolute top-0 start-0 m-2"
                    style={{background: "#3C3489",color: "#EEEDFE",borderRadius: "20px",fontSize: "11px",}}>
                    New
                  </span>
                  <button
                    className="btn position-absolute top-0 end-0 m-2 p-1 bg-white rounded-circle"
                    style={{width: "32px",height: "32px",fontSize: "14px",border: "0.5px solid #ddd",}}>
                    ♡
                  </button>
                </div>

                {/* Card Body */}
                <div className="card-body p-3 d-flex flex-column">
                  <h6 className="card-title mb-2"
                    style={{fontWeight: "500",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",}}>
                    {pro.name}
                  </h6>

         
                  <div className="d-flex align-items-baseline gap-2 mb-3">
                    <span
                      style={{fontSize: "18px",fontWeight: "500",color: "#3C3489",}}>
                      ${pro.price}
                    </span>
                  </div>
                
    <button
      className="btn w-100 mt-2"
      style={{background: "transparent", color: "#3C3489", borderRadius: "8px", fontSize: "13px", border: "1px solid #3C3489"}}
      onClick={()=>{navigateToProductDetail(pro._id)}}>
      View Details
    </button>
                </div>
              </div>

            </div>
          })}

        </div>
      </div>
    </>
     );
}

export default ShopCategory;