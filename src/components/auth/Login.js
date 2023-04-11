// import  {React, useState, useContext} from 'react';
import  {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

// import {UserContext} from '../../App';

const Login = () => {
  // const {state, dispatch} = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errmsg, setErrmsg] = useState('')

  const userLogin = async(e)=>{
    e.preventDefault();

    const res = await fetch("/user/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password})
    })
    const data = await res.json();

    if(res.status === 404 || !data){
      // window.alert("All Fields Required");
      setErrmsg('All Fields Required.')
    }else if(res.status === 400){
      // window.alert("Invalid Details");
      setErrmsg('Invalid Details.')
    }else{
      // dispatch({type:'USER', payload:true})
      navigate("/");
      localStorage.setItem('user_login', true);
      window.location.reload();
    }
  }

  return (
    <>
      <section className='dark-bg Login pt-80'>
          <div className="container">
            <div className="row">
              <div className="col-12 w-50">
                <h2 className=''>Login <span><hr /></span></h2>
                <p>Dont't Have Account? <Link to="/register" className='web-link'>Sign Up</Link></p>
                <form method="post" className='Login-form' onSubmit={userLogin}>
                  <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light' placeholder='Email' />

                  <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light' placeholder='Password' />

                  <p className='text-danger text-end mt-4'>{errmsg}</p>

                  <input type="submit" value='Login' className='mt-3 rounded btn btn-red' />
                </form>
                {/* <div className="text-end">
                  <Link>Forgot Password!</Link>
                </div> */}
              </div>
            </div>
          </div>
      </section>
    </>
  )
}

export default Login
