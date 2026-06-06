import axios from "axios";
import { useEffect, useState } from "react";

function MyOrders() {

   const [orders,setOrders] = useState([]);

   const apiUrl = "http://localhost:3000";

   const fetchOrders = async () => {

      try{

         const token = localStorage.getItem("token");

         const res = await axios.get(

            `${apiUrl}/order/myorders`,

            {
               headers:{
                  Authorization:`Bearer ${token}`
               }
            }

         )

         setOrders(res.data.orders);

      }catch(err){
         console.log(err);
      }

   }

   useEffect(()=>{
      fetchOrders()
   },[])

   return (

      <div className="container py-5">

         <h2 className="mb-4">My Orders</h2>

         {
            orders.map((order)=>(

               <div
                  key={order._id}
                  className="card p-4 mb-4 shadow-sm"
               >

                  <h5>
                     Order Status:
                     <span className="ms-2 text-primary">
                        {order.orderStatus}
                     </span>
                  </h5>

                  <p>
                     Total Price: ${order.totalPrice}
                  </p>

                  <p>
                     Payment:
                     {order.paymentMethod}
                  </p>

                  <p>
                     Address:
                     {order.shippingAddress}
                  </p>

                  <hr/>

                  {
                     order.products.map((item)=>(

                        <div
                           key={item._id}
                           className="d-flex align-items-center gap-3 mb-3"
                        >

                           <img
                              src={`${apiUrl}/uploads/${item.product.image}`}
                              width="80"
                              height="80"
                              style={{objectFit:"cover"}}
                           />

                           <div>

                              <h6>
                                 {item.product.name}
                              </h6>

                              <p>
                                 Qty: {item.quantity}
                              </p>

                           </div>

                        </div>

                     ))
                  }

               </div>

            ))
         }

      </div>

   )
}

export default MyOrders;