import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import { useForm, ValidationError } from '@formspree/react';
import {FcCheckmark} from 'react-icons/fc';
import {FcApproval} from 'react-icons/fc';

const Contact = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState('');

  const [state, handleSubmit] = useForm("mleklawg");

  const contactPage = async()=>{
    try{
      const res = await fetch("https://portfolio-backend-hazel.vercel.app/contact",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
  
      const data = await res.json();
      setUserdata(data);
  
      if(res.status !== 200){
        localStorage.removeItem('user_login')
        navigate("/login");
      }
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    contactPage();
  },[]);

  const goBack =()=>{
    window.location.reload()
  }

  if (state.succeeded) {
    return (
      <>
      <section className='bg-dark contact-form-success py-80'>
        <div className='msg text-center w-50 m-auto'>
          <FcCheckmark className='success-icon mb-2'/> 
          <p className='text-light fw-bold'>Thanks for the response, We will contact you soon.</p>
          <button className='btn btn-red mt-5' onClick={()=>goBack()}>Go Back</button>
        </div>
      </section>
      </>
    )
  }

  return (
    <>
      <section className='dark-bg Contact py-80'>
          {/* <div className="container">
            <div className="row">
              <div className="me-3 px-3 pt-2 rounded card">
                <i className='fa fa-email'></i>
                <h3>Email</h3>
                <p className='t-light'>{userdata.email}</p>
              </div>
              <div className="mx-3 px-3 pt-2 rounded card">
                <h3>Phone</h3>
                <p className='t-light'>{userdata.phone_no}</p>
              </div>
              <div className="ms-3 px-3 pt-2 rounded card">
                <h3>Address</h3>
                <p className='t-light'>abcd</p>
              </div>
            </div>
          </div> */}
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 w-75 m-auto p-3">
                <h3 className='text-center t-light'>How Can WE Help You?<hr className='w-50 m-auto mt-2'/></h3>
                <form onSubmit={handleSubmit} className='contact-form'>
                  <div className="username d-flex">
                    <input type="text" name="f_name" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light me-2' placeholder='First Name'/>
                    <input type="text" name="l_name" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light ms-2' placeholder='Last Name'/>
                  </div>
                  <input type="email" name="email" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light' placeholder='Email'/>
                  <textarea name="message" id="" cols="30" rows="8" className='form-control mt-4 py-3 px-4 rounded bg-transparent t-light' placeholder='Message'></textarea>
                  <input type="submit" value="SEND" className='btn btn-red mt-3'/>
                </form>
              </div>
            </div>
          </div>
      </section>
    </>
  )
}

export default Contact
