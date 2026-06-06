import { useState } from "react";
import axios from "axios"

function Signup() {

    const [signup,setSignup] = useState({
        name:"",
        email:"",
        phone:"",
        password:""
    })
    const [alert,setAlert] = useState({
        success:true,
        message:""
    })

    const apiUrl = "http://localhost:3000";

    const handleInputChange =(e)=>{
    let {name,value} = e.target
    setSignup((prev)=>{
        return{
            ...prev,
            [name]: value,
        }
    })
    }

    const handleSignupSubmit = async(e)=>{
        try{
       e.preventDefault();
       const res = await axios.post(`${apiUrl}/users`,signup)
        console.log(res);
        
        if(res.data.success){
            setAlert({
                success:res.data.success,
                message:res.data.message
            })
        }
          
        setSignup({
        name:"",
        email:"",
        phone:"",
        password:""
        })

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
  <div className="container d-flex align-items-center justify-content-center vh-100 my-5">

      <div className="row w-100 my-5">
       <div className="col-md-6 mx-auto">
        <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              
                 {alert.message && (
                    <p style={{color: alert.success ? "green" : "red"}}>
                        {alert.message}
                    </p>
                 )}
            <h2 className="text-center mb-4 fw-bold"> Create Account 🪑</h2>

              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text" name="name" onChange={handleInputChange} className="form-control rounded-3" placeholder="Enter your name"/>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" onChange={handleInputChange} className="form-control rounded-3" placeholder="Enter your email"/>
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" name="phone" onChange={handleInputChange} className="form-control rounded-3" placeholder="Enter your phone number"/>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" onChange={handleInputChange} className="form-control rounded-3" placeholder="Enter password"/>
                </div>

                <button className="btn btn-dark w-100 rounded-3" onClick={handleSignupSubmit}>Sign Up</button>

              </form>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <a href="/login">Login</a>
              </p>

            </div>
          </div>

        </div>

      </div>

    </div>

    </>
     );
}

export default Signup;