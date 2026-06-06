import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {

 const [login,setLogin] = useState({
   email: "",
  password: ""
  })

 const [alert,setAlert] = useState({
  success:true,
  message:""
  })

const apiUrl = "http://localhost:3000";

const navigate = useNavigate()

const handleLoginInputChange =(e)=>{
    let {name,value} = e.target

    setLogin((prev)=>{
        return {
         ...prev,
         [name]: value
        }
    })
}
 

const handleLogin = async (e) =>{
    try{
    e.preventDefault(); 

   const res = await axios.post(`${apiUrl}/users/login`,login)
  console.log(res);
if(res.data.success){

   localStorage.setItem("token", res.data.token);

   const decoded = jwtDecode(res.data.token);

   if(decoded.role === "admin"){
      navigate("/dashboard");
   }else{
      navigate("/");
   }

}

    }

    catch(err){
        console.log(err);
        setAlert({
            success: false,
            message: err.response?.data?.message || "Error occurred"
        })
        
    }
}
    return ( 
    <>
<div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row w-100">
         <div className="col-md-5 mx-auto">
            <div className="card shadow-lg border-0 rounded-4">           
            <div className="card-body p-5">

                {alert.message && (
                    <p style={{color: alert.success ? "green" : "red"}}>
                        {alert.message}
                    </p>
                 )}
              <h2 className="text-center mb-4 fw-bold"> Login 🪑 </h2>

              <form >
                
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" onChange={handleLoginInputChange} className="form-control rounded-3" placeholder="Enter your email" required/>
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" onChange={handleLoginInputChange} className="form-control rounded-3" placeholder="Enter password" required/>
                </div>

          
                <button type="button" onClick={handleLogin} className="btn btn-dark w-100 rounded-3">
                  Login
                </button>

              </form>

              {/* Footer */}
              <p className="text-center mt-3">
                Don’t have an account?
                <a href="/sign-up">Sign Up</a>
              </p>

            </div>
          </div>

        </div>

      </div>

    </div>
        </>
     );
}

export default Login;