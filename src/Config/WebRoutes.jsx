import WebNavbar from "../components/Navbar"
import Home from "../Pages/WebPages/Home"
import Contact from "../Pages/WebPages/Contact"
import Shop from "../Pages/WebPages/Shop"
import About from "../Pages/WebPages/About"
import Services from "../Pages/WebPages/Services"
import Signup from "../Pages/WebPages/Signup"
import Login from "../Pages/WebPages/Login"
import ProductDetail from "../Pages/WebPages/ProductDetail"
import Cart from "../Pages/WebPages/Cart"
import Checkout from "../Pages/WebPages/Checkout."
import ProtectedRoute from "../components/ProtectedRoute";
import MyOrders from "../Pages/WebPages/MyOrders"
import ShopCategory from "../Pages/WebPages/ShopCategory"

let webRoutes ={
    path:"/",
    element:<WebNavbar/>,
    children:[
        {index: true,element:<Home/>},
        {path:"/contact",element:<Contact/>},
        {path:"/shop",element:<Shop/>},
         {path:"/shop/:id",element:<ShopCategory/>},
        {path:"/about",element:<About/>},
        {path:"/service",element:<Services/>},
        {path:"/sign-up",element:<Signup/>},
        {path:"/login",element:<Login/>},
        {path:"/productdetail/:id",element:<ProductDetail/>},
        {
   path:"/cart",
   element:(
      <ProtectedRoute>
         <Cart/>
      </ProtectedRoute>
   )
},
       {
   path:"/checkout",
   element:(
      <ProtectedRoute>
         <Checkout/>
      </ProtectedRoute>
   )
},
   {
   path:"/myorders",
   element:(
      <ProtectedRoute>
         <MyOrders/>
      </ProtectedRoute>
   )
},
    ],
}

export default webRoutes;