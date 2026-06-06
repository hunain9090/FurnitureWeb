import { Link, Links, Outlet } from "react-router-dom";

function AdminNavbar() {
  
   const token = localStorage.getItem("token");

     const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
    return ( 
<>

  <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    {/* Navbar Brand*/}
    <a className="navbar-brand ps-3" href="index.html">
      Hunain AdminPannel
    </a>
    {/* Sidebar Toggle*/}
    <button
      className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
      id="sidebarToggle"
      href="#!"
    >
      <i className="fas fa-bars" />
    </button>
    {/* Navbar Search*/}
    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Search for..."
          aria-label="Search for..."
          aria-describedby="btnNavbarSearch"
        />
        <button className="btn btn-primary" id="btnNavbarSearch" type="button">
          <i className="fas fa-search" />
        </button>
      </div>
    </form>
    {/* Navbar*/}
    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li className="nav-item dropdown">     
     
          <li>
              <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-danger"
                  >
                    Logout
                  </button>
          </li>
   
      </li>
    </ul>
  </nav>
 
 <div id="layoutSidenav">
 <div id="layoutSidenav_nav">
  <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <div className="sb-sidenav-menu">
      <div className="nav">
        <div className="sb-sidenav-menu-heading">Core</div>

        <Link className="nav-link" to="/dashboard">
        <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt" />
          </div>
          Dashboard
        </Link>
  
        
        <div className="sb-sidenav-menu-heading">Addons</div>
        <Link className="nav-link" to="/dashboard/add-category">
           <div className="sb-nav-link-icon">
            <i className="fas fa-chart-area" />
          </div>
          Add Category
        </Link>
    
      <Link className="nav-link" to="/dashboard/show-category">
           <div className="sb-nav-link-icon">
            <i className="fas fa-chart-area" />
          </div>
          Show Category
        </Link>

          <Link className="nav-link" to="/dashboard/add-product">
           <div className="sb-nav-link-icon">
            <i className="fas fa-chart-area" />
          </div>
          Add Product
        </Link>

          <Link className="nav-link" to="/dashboard/show-product">
           <div className="sb-nav-link-icon">
            <i className="fas fa-chart-area" />
          </div>
          Show Product
        </Link>

         <Link className="nav-link" to="/dashboard/show-order">
           <div className="sb-nav-link-icon">
            <i className="fas fa-chart-area" />
          </div>
          Show Orders
        </Link>

          <Link className="nav-link" to="/dashboard/show-user">
           <div className="sb-nav-link-icon">
            <i className="fas fa-chart-area" />
          </div>
          Show Users
        </Link>
       
      </div>
    </div>
    <div className="sb-sidenav-footer">
      <div className="small">Logged in as:</div>
      Start Bootstrap
    </div>
  </nav>
</div>
 <div id="layoutSidenav_content">



    
    <Outlet/>

   <footer className="py-4 bg-light mt-auto">
  <div className="container-fluid px-4">
    <div className="d-flex align-items-center justify-content-between small">
      <div className="text-muted">Copyright © Your Website 2023</div>
      <div>
        <a href="#">Privacy Policy</a>·<a href="#">Terms &amp; Conditions</a>
      </div>
    </div>
  </div>
</footer>

</div>
</div>


 



</>
     );
}

export default AdminNavbar;