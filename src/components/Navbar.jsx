import {Link, Outlet} from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function WebLayout() {
  const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("token");
    const apiUrl = 'http://localhost:3000';

  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      localStorage.removeItem("token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

 

  const fetchCategories = async () => {

    try {

      const res = await axios.get(`${apiUrl}/category`);

      setCategories(res.data.categories);

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(()=>{
  fetchCategories();
  },[])





    return ( 
    <>
  {/* Start Header/Navigation */}
 <nav
      className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
      arial-label="Furni navigation bar"
    >
      <div className="container">
         <Link className="nav-link" to="/"> Furni<span>.</span></Link>
       

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsFurni"
          aria-controls="navbarsFurni"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item active">
              
               <Link className="nav-link" to="/">Home</Link>
            </li>

       <li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    
  >
    Shop
  </a>
<ul>
  
</ul>
 <ul className="dropdown-menu">
  {categories.map((cat) => (
    <li key={cat._id}>
  <Link
  className="dropdown-item text-dark"
  to={`/shop/${cat._id}`}
>
  {cat.categoryname}
</Link>
    </li>
  ))}
</ul>
</li>
            <li>
              <Link className="nav-link" to="/about">About us</Link>
            </li>
            <li>
              <Link className="nav-link" to="/service">Services</Link>
            </li>
            <li>
              <Link className="nav-link" to="/contact">Contact us</Link>
            </li>
          </ul>

          {/* RIGHT SIDE (USER + CART) */}
          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            
            {/* USER */}
            <li className="nav-item d-flex align-items-center">
              {user ? (
                <>
                  <span className="text-white me-2">
                    {user.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-danger"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a className="nav-link" href="/login">
                  <img src="/images/user.svg" />
                </a>
              )}
            </li>

            {/* CART */}
            <li>
              <Link className="nav-link" to="/cart">
              <img src="/images/cart.svg" />
              </Link>              
            </li>

                            {
    token && (
      <li>
       <Link className="nav-link text-light" to="/myorders">
  📦 My Orders
</Link>
      </li>
    )
  }

          </ul>
        </div>
      </div>
    </nav>
  {/* End Header/Navigation */}

  <Outlet/>

  <>
  {/* Start Footer Section */}
  <footer className="footer-section mt-5">
    <div className="container relative">
      <div className="sofa-img">
        <img src="/images/sofa.png" alt="Image" className="img-fluid" />
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="subscription-form">
            <h3 className="d-flex align-items-center">
              <span className="me-1">
                <img
                  src="/images/envelope-outline.svg"
                  alt="Image"
                  className="img-fluid"
                />
              </span>
              <span>Subscribe to Newsletter</span>
            </h3>
            <form action="#" className="row g-3">
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>
              <div className="col-auto">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary">
                  <span className="fa fa-paper-plane" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row g-5 mb-5">
        <div className="col-lg-4">
          <div className="mb-4 footer-logo-wrap">
            <a href="#" className="footer-logo">
              Furni<span>.</span>
            </a>
          </div>
          <p className="mb-4">
            Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis
            nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate
            velit imperdiet dolor tempor tristique. Pellentesque habitant
          </p>
          <ul className="list-unstyled custom-social">
            <li>
              <a href="#">
                <span className="fa fa-brands fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa fa-brands fa-twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa fa-brands fa-instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa fa-brands fa-linkedin" />
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-8">
          <div className="row links-wrap">
            <div className="col-6 col-sm-6 col-md-3">
              <ul className="list-unstyled">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-6 col-md-3">
              <ul className="list-unstyled">
                <li>
                  <a href="#">Support</a>
                </li>
                <li>
                  <a href="#">Knowledge base</a>
                </li>
                <li>
                  <a href="#">Live chat</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-6 col-md-3">
              <ul className="list-unstyled">
                <li>
                  <a href="#">Jobs</a>
                </li>
                <li>
                  <a href="#">Our team</a>
                </li>
                <li>
                  <a href="#">Leadership</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-6 col-md-3">
              <ul className="list-unstyled">
                <li>
                  <a href="#">Nordic Chair</a>
                </li>
                <li>
                  <a href="#">Kruzo Aero</a>
                </li>
                <li>
                  <a href="#">Ergonomic Chair</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top copyright">
        <div className="row pt-4">
          <div className="col-lg-6">
            <p className="mb-2 text-center text-lg-start">
              Copyright ©. All Rights Reserved. — Designed with love by{" "}
              <a href="https://untree.co">Untree.co</a> Distributed By{" "}
              <a hreff="https://themewagon.com">ThemeWagon</a>{" "}
              {/* License information: https://untree.co/license/ */}
            </p>
          </div>
          <div className="col-lg-6 text-center text-lg-end">
            <ul className="list-unstyled d-inline-flex ms-auto">
              <li className="me-4">
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* End Footer Section */}
</>

</>




     );
}

export default WebLayout;