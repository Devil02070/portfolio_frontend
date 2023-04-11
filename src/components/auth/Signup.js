import React, {useState}from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ 
    f_name:"", l_name:"", email:"", password:"", c_password:"", phone_no:"" 
  });
  const [errmsg, setErrmsg] = useState('')

  let field, value;
  const handleInputs = (e)=>{
    field = e.target.name;
    value = e.target.value;
    setUser({...user,[field]:value});
  }

  const PostData = async(e)=>{
    e.preventDefault();
    const {f_name, l_name, email, password, c_password, phone_no} = user;

    const res = await fetch("/user/register",{
      method: "POST",
      headers:{
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        f_name, l_name, email, password, c_password, phone_no
      })
    })

    const data = await res.json();
    if(res.status === 404 || !data){
      // window.alert(data.error);
      setErrmsg("All Fields Required")
    }
    else if(res.status === 422){
      // window.alert(data.error);
      setErrmsg("Email already registered. Please Try Different One.")
    }else{
      window.alert(data.success);
      navigate("/login");
    }
  }
  // useEffect(()=>{
  //   PostData();
  // }, []);
  return (
    <>
        <section className='dark-bg Signup pt-80'>
            <div className="container">
            <div className="row">
              <div className="col-12 w-50">
                <h2 className=''>Create Account <span><hr /></span></h2>
                <p>Already Have Account? <Link to="/login" className='web-link'>Log In</Link></p>
                <form className='signup-form' method="POST" onSubmit={PostData} autoComplete="off">
                  <div className="username d-flex">
                    <input type="text"  value={user.f_name} onChange={handleInputs} name="f_name" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light w-50 me-2' placeholder='First Name' autoComplete='off'/>
                    <input type="text"  value={user.l_name} onChange={handleInputs} name="l_name" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light w-50 ms-2' placeholder='last Name' autoComplete='off'/>
                  </div>
                  <input type="email"   value={user.email}  onChange={handleInputs}name="email" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light' placeholder='Email' autoComplete='off'/>
                  <div className="password d-flex">
                    <input type="text" value={user.password} onChange={handleInputs} name="password" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light w-50 me-2' placeholder='Password' />
                    <input type="text" value={user.c_password} onChange={handleInputs} name="c_password" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light w-50 ms-2' placeholder='Confirm Password' autoComplete='off'/>
                  </div>
                  <input type="text"   value={user.phone_no}   onChange={handleInputs} name="phone_no" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light' placeholder='Phone No.' autoComplete='off'/>

                  <p className='text-danger text-end mt-4'>{errmsg}</p>

                  <input type="submit" value='Create Account' className='mt-4 rounded btn btn-red' />
                </form>
              </div>
            </div>
            </div>
        </section>
    </>
  )
}

export default Signup
