import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminRoute({ children }) {

   const token = localStorage.getItem("token");

   // Login check
   if (!token) {
      return <Navigate to="/login" />
   }

   // Decode token
   const decoded = jwtDecode(token);

   // Admin check
   if (decoded.role !== "admin") {
      return <Navigate to="/" />
   }

   return children;
}

export default AdminRoute;