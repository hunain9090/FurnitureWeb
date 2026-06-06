// import WebLayout from "./components/Navbar";
// import Home from "./WebPages/Home";
// import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
// import Services from "./WebPages/Services";
// import About from "./WebPages/About";
// import Shop from "./WebPages/Shop";
// import Contact from "./WebPages/Contact";
import { RouterProvider } from "react-router-dom";
import webAndAdminRoutes from "./Config/MainRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return ( 
  <>
 <ToastContainer />
<RouterProvider router={webAndAdminRoutes}/>
 
  </>
   );
}

export default App;