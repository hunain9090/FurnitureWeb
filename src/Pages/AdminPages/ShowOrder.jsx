import axios from "axios";
import { useEffect, useState } from "react";

function ShowOrder() {
     const [orders, setOrders] = useState([]);

  const apiUrl = "http://localhost:3000";

  const fetchOrders = async () => {
    try {

      const token = localStorage.getItem("token");
      console.log(token);
      

      const res = await axios.get(`${apiUrl}/order`);

      setOrders(res.data.orders);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const updateStatus = async (id,status) => {
   try{
      const token = localStorage.getItem("token");
      const res = await axios.put(`${apiUrl}/order/orderstatus/${id}`,{
         orderStatus: status
         },
         {
            headers:{
               Authorization:`Bearer ${token}`
            }
         }
        )

      console.log(res.data);

      fetchOrders();

   }catch(err){

      console.log(err);

   }
}

const deleteOrder = async (id) => {

   try {

      const token = localStorage.getItem("token");

      const res = await axios.delete(`${apiUrl}/order/${id}`,{
            headers: {
               Authorization: `Bearer ${token}`
            }
         }

      );

      console.log(res.data);

      fetchOrders();

   } catch (err) {

      console.log(err);

   }

}
    return ( 
    <>

  <div className="container-fluid mt-5">

  <h2 className="mb-4">All Orders</h2>

  <div style={{overflowX: "auto",width: "100%"}}>

    <table
      className="table table-bordered table-striped align-middle"
      style={{
        minWidth: "1400px"
      }}
    >

      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Email</th>
          <th>Products</th>
          <th>Total Price</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {orders.map((item, index) => (

          <tr key={item._id}>

            <td>{index + 1}</td>

            <td>{item.user?.name}</td>

            <td>{item.user?.email}</td>

            <td>
              {item.products.map((p, i) => (
                <div key={i} className="mb-1">
                  🛒 {p.product?.name} × {p.quantity}
                </div>
              ))}
            </td>

            <td>${item.totalPrice}</td>

            <td>{item.paymentMethod}</td>

            <td style={{ minWidth: "180px" }}>
              <select
                className="form-select"
                value={item.orderStatus}
                onChange={(e) =>
                  updateStatus(item._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </td>

            <td style={{ minWidth: "300px" }}>
              {item.shippingAddress}
            </td>

            <td>
             <button className="btn btn-sm btn-danger" onClick={() => {
   const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
   );

   if (confirmDelete) {
      deleteOrder(item._id);
   }

}}>
             Delete
            </button>
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

    </> );
}

export default ShowOrder;