import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import loading from '../../images/reveal-loading.gif'

const Members = () => {
  const [user, setUser] = useState([]);
  const [userprofile, setUserProfile] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  console.log('hello');
  const get_members = async () => {
    const res = await fetch('https://portfolio-backend-hazel.vercel.app/view_users', {
      // method : "GET",
      // headers : {
      //   Accept: "Application/json",
      //   "Content-Type": "application/json"
      // },
      credentials: "include"
    })

    const data = await res.json();
    console.log(data);

    setUser(data.all_users);
    setUserProfile(data.single_user_details);
    setIsLoading(false);
  }
  useEffect(() => {
    get_members();
  }, []);

  return (
    <>
      {isLoading ? (
        // Display the loader while the content is loading
        <>
          <seciton className="loading-screen">
            <div className='vector text-center'>
              <img src={loading} className='w-25 m-auto' />
            </div>
          </seciton>
        </>
      ) : (
        // Display the content once it's loaded
        <>
          <section className='members pb-5'>
            <div className="container pf-users">
              <h3 className='rounded'>Users Having portfolio:</h3>
              <div className="row">
                {
                  userprofile.map((elem) => {
                    return (
                      // <div key={elem._id} className="user_card m-2 p-4 rounded text-center border m-2">
                      <div key={elem._id} className="user_card m-2 text-center">

                        {/* <img src={elem.profile_pic} className='w-100 rounded user-profile-img' height={300}/> */}
                        <div className="flip-card">
                          <div className="flip-card-inner">
                            <div className="flip-card-front">
                              <img src={elem.profile_pic} className='w-100 user-profile-img' height={300} />
                            </div>
                            <div className="flip-card-back">
                              <p className='text-light fw-light p-3'>{elem.user_desc}</p>
                            </div>
                          </div>
                        </div>

                        <p className='mt-4 fs-5'>{elem.username}</p>
                        <p className='text-light fw-light'>{elem.profession}</p>
                        <Link to={`/user/${elem.user_id}`}><button className='btn-red rounded'>View Profile</button></Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </section>

          {/* <section className='members pb-5'>
            <div className="container">
              <h3 className='rounded'>All Members:</h3>
              <div className="row">
                {
                  user.map((single_user) => {
                    return (
                      <div key={single_user._id} className="user_card m-2 p-4 rounded text-center border">
                        <h6>{single_user.f_name + single_user.l_name}</h6>
                        <p>{single_user.email}</p>
                        <p>{single_user.phone_no}</p>
                        <Link to={`/user/${single_user._id}`}><button className='btn-red rounded'>View Portfolio</button></Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </section> */}
        </>
      )}
    </>
  )
}

export default Members
