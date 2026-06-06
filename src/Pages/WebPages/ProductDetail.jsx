import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const apiUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${apiUrl}/product/${id}`);
        setProduct(res.data.product); 
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");
    
       if (!token) {
      toast.error("Please login first");
      navigate("/login");

      return;
    }

    const res = await axios.post(`${apiUrl}/cart`,{
        product: id,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   toast.success(res.data.message)

 

  } catch (err) {
    console.log(err);
  }
};


  if (loading) return (
    <div className="container my-5 text-center">
      <div className="spinner-border" style={{color: "#3C3489"}} role="status" />
    </div>
  );

  if (!product) return (
    <div className="container my-5 text-center">
      <h4>Product not found</h4>
      <button className="btn mt-3" style={{background: "#3C3489", color: "white"}}
        onClick={() => navigate("/shop")}>
        Back to Shop
      </button>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Product Detail</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Section */}
      <div className="container my-5">
        <div className="row g-5 align-items-center">

          {/* Image */}
          <div className="col-lg-5">
            <div style={{borderRadius: "16px", overflow: "hidden", background: "#F1EFE8", height: "400px"}}>
              <img
                src={`${apiUrl}/uploads/${product.image}`}
                alt={product.name}
                className="w-100 h-100"
                style={{objectFit: "cover"}}
              />
            </div>
          </div>

          {/* Info */}
          <div className="col-lg-7">
            {/* Badge */}
            <span className="badge mb-3" style={{background: "#3C3489", color: "#EEEDFE", borderRadius: "20px", fontSize: "12px"}}>
              New Arrival
            </span>

            {/* Name */}
            <h2 style={{fontWeight: "500", color: "#26215C"}}>{product.name}</h2>

            {/* Price */}
            <h3 className="my-3" style={{color: "#3C3489", fontWeight: "500"}}>
              ${product.price}
            </h3>

            {/* Divider */}
            <hr style={{borderColor: "#ddd"}} />

            {/* Description */}
            <p className="text-muted" style={{lineHeight: "1.8"}}>
              {product.description || "No description available."}
            </p>

            {/* Extra Info */}
            <div className="row g-3 my-3">
              {product.category && (
                <div className="col-6">
                  <div className="p-3" style={{background: "#F1EFE8", borderRadius: "10px"}}>
                    <small className="text-muted d-block">Category</small>
                    <strong>{product.category?.categoryname}</strong>
                  </div>
                </div>
              )}
              {product.stock !== undefined && (
                <div className="col-6">
                  <div className="p-3" style={{background: "#F1EFE8", borderRadius: "10px"}}>
                    <small className="text-muted d-block">Stock</small>
                    <strong>{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</strong>
                  </div>
                </div>
              )}
            </div>

        <div className="d-flex align-items-center gap-3 mt-3">

          <button
            className="btn btn-outline-dark" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
            -
          </button>

          <span>{quantity}</span>

          <button className="btn btn-outline-dark" onClick={() => setQuantity(quantity + 1)}>
            +
          </button>

        </div>

            {/* Buttons */}
            <div className="d-flex gap-3 mt-4">
              <button className="btn px-4 py-2"
                style={{background: "#3C3489", color: "#EEEDFE", borderRadius: "8px", fontSize: "14px"}} onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn px-4 py-2"
                style={{background: "transparent", color: "#3C3489", border: "1px solid #3C3489", borderRadius: "8px", fontSize: "14px"}}
                onClick={() => navigate("/shop")}>
                ← Back to Shop
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;