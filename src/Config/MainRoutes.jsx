import {createBrowserRouter } from "react-router-dom";
import webRoutes from "./WebRoutes";
import adminRoute from "./AdminRoutes";

let webAndAdminRoutes = createBrowserRouter(
[
    webRoutes,
    adminRoute
]
)

export default webAndAdminRoutes;