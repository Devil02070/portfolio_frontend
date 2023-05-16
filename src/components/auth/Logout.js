import {React, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const Logout_user = async()=>{
      const res = await fetch('https://portfolio-backend-hazel.vercel.app/logout',{
        method:"GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"
      })
      console.log(res)
      if(res.status !== 201){
        console.log('failed')
        navigate('/login');
      }else{
        localStorage.removeItem('user_login')
        localStorage.removeItem('usre_token')
        navigate('/login');
        window.location.reload();
      }
    }

    useEffect(()=>{
      Logout_user();
    },[]);

  return (
    <>
      
    </>
  )
}

export default Logout
