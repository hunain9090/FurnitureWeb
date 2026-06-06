import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {

const [cartItems,setCartItems] = useState([])
const apiUrl = "http://localhost:3000"
const navigate = useNavigate()

const fetchCartItems = async () => {

   try{

      const token = localStorage.getItem("token");

      const res = await axios.get(`${apiUrl}/cart`,{
            headers:{
               Authorization:`Bearer ${token}`
            }
         }
      )

      console.log(res.data);

      if(res.data.success){
         setCartItems(res.data.cartItems)
      }

   }catch(err){
      console.log(err);
   }
}
useEffect(()=>{
    fetchCartItems()
},[])


const updateCartQuantity = async (id, type) => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.put(`${apiUrl}/cart/${id}`,{ 
      type},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(res.data);

    if (res.data.success) {
      fetchCartItems()
    }

  } catch (err) {
    console.log(err);
  }
}

const deleteCart = async (id)=>{
  try{
    const res = await axios.delete(`${apiUrl}/cart/${id}`)
  toast.success(res?.data?.message || "Deleted successfully")

   fetchCartItems()
  }
   catch (err) {
     toast.error(err?.response?.data?.message || "Something went wrong");
  }

}

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)

   
return (
<>
 {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Shopping Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="untree_co-section before-footer-section">
        <div className="container">

          {
            cartItems.length === 0 ?

              <div className="text-center py-5">
                <h3>Your Cart is Empty 🛒</h3>
              </div>

              :

              <div className="row mb-5">

                {/* Cart Table */}
                <div className="col-md-8">

                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body">

                      <table className="table align-middle">

                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>

                          {
                            cartItems.map((item) => {

                              return (

                                <tr key={item._id}>

                                  {/* Image */}
                                  <td>
                                    <img
                                      src={`${apiUrl}/uploads/${item.product.image}`}
                                      alt=""
                                      width="80"
                                      height="80"
                                      style={{
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                      }}
                                    />
                                  </td>

                                  {/* Name */}
                                  <td>
                                    <h6 className="mb-0">
                                      {item.product.name}
                                    </h6>
                                  </td>

                                  {/* Price */}
                                  <td>
                                    ${item.product.price}
                                  </td>

                                  {/* Quantity */}
                                  <td>

                                    <div className="d-flex align-items-center gap-2">

                                      <button className="btn btn-sm btn-outline-dark" onClick={() => updateCartQuantity(item._id, "decrease")}>
                                        -
                                      </button>

                                      <span>
                                        {item.quantity}
                                      </span>

                                      <button className="btn btn-sm btn-outline-dark" onClick={() => updateCartQuantity(item._id, "increase")}>
                                        +
                                      </button>

                                    </div>

                                  </td>

                                  {/* Total */}
                                  <td>
                                    $
                                    {
                                      item.product.price * item.quantity
                                    }
                                  </td>

                                  {/* Remove */}
                                  <td>
                                    <button className="btn btn-danger btn-sm" onClick={()=>deleteCart(item._id)}>
                                      Remove
                                    </button>
                                  </td>

                                </tr>
                              )
                            })
                          }

                        </tbody>

                      </table>

                    </div>
                  </div>

                </div>

                {/* Summary */}
                <div className="col-md-4">

                  <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body">

                      <h4 className="mb-4">
                        Cart Summary
                      </h4>

                      <div className="d-flex justify-content-between mb-3">
                        <span>Items</span>
                        <span>{cartItems.length}</span>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <span>Total</span>
                        <strong>${totalPrice}</strong>
                      </div>

                      <hr />

                      <button className="btn btn-dark w-100 py-2 rounded-3" onClick={()=>navigate('/checkout')}>
                        Proceed To Checkout
                      </button>

                    </div>

                  </div>

                </div>

              </div>
          }

        </div>
      </div>
    </>

    );
   }

export default Cart;