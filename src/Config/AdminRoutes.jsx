import AddCatgory from "../Pages/AdminPages/AddCategory";
import AddProduct from "../Pages/AdminPages/AddProduct";
import Dashboard from "../Pages/AdminPages/Dashboard";
import EditCategory from "../Pages/AdminPages/EditCategory";
import EditProduct from "../Pages/AdminPages/EditProduct";
import ShowCategory from "../Pages/AdminPages/ShowCategory";
import ShowOrder from "../Pages/AdminPages/ShowOrder";
import ShowProduct from "../Pages/AdminPages/ShowProduct";
import ShowUser from "../Pages/AdminPages/ShowUser";
import AdminNavbar from "../components/AdminNavbar"
import AdminRoute from "../components/AdminRoute";
  
let adminRoute = {
  path: "/dashboard",

  element: (
    <AdminRoute>
      <AdminNavbar />
    </AdminRoute>
  ),

  children: [
    { index: true, element: <Dashboard /> },

    { path: "add-product", element: <AddProduct /> },
    { path: "show-product", element: <ShowProduct /> },

    { path: "add-category", element: <AddCatgory /> },
    { path: "show-category", element: <ShowCategory /> },
    { path: "show-user", element: <ShowUser /> },
    { path: "show-order", element: <ShowOrder /> },

    { path: "edit-category/:id", element: <EditCategory /> },
    { path: "edit-product/:id", element: <EditProduct /> }
  ],
}
export default adminRoute;