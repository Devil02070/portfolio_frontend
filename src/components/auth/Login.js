import  {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errmsg, setErrmsg] = useState('')

  const [waiter,setWaiter] = useState(false);

  const userLogin = async(e)=>{
    e.preventDefault();
    setWaiter(true)

    const res = await fetch("https://portfolio-backend-hazel.vercel.app/user/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({email, password})
    })
    const data = await res.json();
    const token = data.user_token;

    if(res.status === 404 || !data){
      setErrmsg('All Fields Required.')
      setWaiter(false);
    }else if(res.status === 400){
      setErrmsg('Invalid Details.')
      setWaiter(false);
    }else{
      console.log('user logged in');
      setWaiter(false);
      navigate("/");
      localStorage.setItem('user_login', true);
      localStorage.setItem('user_token', token);
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
                {waiter ? (
                  <>
                    <div className='login-loader mt-2'></div>
                  </>
                ):(<></>)}
                
              </div>
            </div>
          </div>
      </section>
    </>
  )
}

export default Login
