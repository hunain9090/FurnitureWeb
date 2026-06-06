import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [loading, setLoading] = useState(false);

  const apiUrl = "http://localhost:3000";

  const placeOrder = async () => {
    try {

      if (!shippingAddress) {
        return toast.error("Please enter shipping address");
      }

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(`${apiUrl}/order`,{
          shippingAddress,
          paymentMethod
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      if (res.data.success) {
        toast.success("Order Placed Successfully ✅");

      }

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <h2 className="mb-4">Checkout</h2>

      <div className="row">

        {/* Left Side - Form */}
        <div className="col-md-7">

          <div className="card p-4 shadow-sm">

            {/* Shipping Address */}
            <div className="mb-3">
              <label className="form-label">Shipping Address</label>
              <textarea
                className="form-control"
                rows="4"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your full address"
              ></textarea>
            </div>

            {/* Payment Method */}
            <div className="mb-3">
              <label className="form-label">Payment Method</label>

              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Cash On Delivery</option>
                <option>Online Payment</option>
              </select>

            </div>

          </div>

        </div>

        {/* Right Side - Summary */}
        <div className="col-md-5">

          <div className="card p-4 shadow-sm">

            <h4>Order Summary</h4>

            <hr />

            <p className="text-muted">
              Review your order before placing it.
            </p>

            <button
              className="btn btn-dark w-100 mt-3"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;