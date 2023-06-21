import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { FcApproval } from 'react-icons/fc';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlinePhone } from 'react-icons/hi';
import { FaRegAddressBook } from 'react-icons/fa';

// import profile_img from '../../images/12341.jpg';
import vector1 from '../../images/vector1.png';
// import vector2 from '../../images/sp-2.png';

import loading from '../../images/reveal-loading.gif'


const SingleUser = () => {
  const [single_user_data, setSingleuserdata] = useState([]);
  const [single_user_details, setSingleuserDetails] = useState([]);
  const [project_details, setProjectDetails] = useState([]);
  const [user_skill, setSkills] = useState([]);
  const [user_work, setWork] = useState([]);
  const [user_qlf, setQualification] = useState([]);
  const [user_exp, setExperience] = useState([]);
  let { id } = useParams();
  // console.log(id);
  const [isLoading, setIsLoading] = useState(true)

  const Single_user = async () => {
    try {
      const res = await fetch(`https://portfolio-backend-hazel.vercel.app/user/${id}`, {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
      const data = await res.json();
      setSingleuserdata(data.single_user_data);
      setSingleuserDetails(data.single_user_details);
      setSkills(data.user_skills[0]['skills']);
      setWork(data.user_skills[0]['work']);
      setProjectDetails(data.user_skills[0]['projects']);
      setQualification(data.user_skills[0]['qualification']);
      setExperience(data.user_skills[0]['experience']);
      setIsLoading(false);
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    Single_user();
    const team = document.querySelectorAll('.tm-row');
    team.forEach(item => {
      item.addEventListener('mouseover', () => {
        item.classList.add('active');
      })
      item.addEventListener('mouseout', () => {
        item.classList.remove('active')
      });
    })
    console.log('coming here')
  }, [])

  return (
    <>
      {isLoading ? (
        <>
          <seciton className="loading-screen">
            <div className='vector text-center'>
              <img src={loading} className='w-25 m-auto' />
            </div>
          </seciton>
        </>
      ) : (
        <>


          <section className='user py-80 sp-banner'>
            <div className='overlay'>
              <div className="container">
                <img src={vector1} alt="banner-vec1" className='banner-vec1 m-auto rounded-circle' />
                <img src={vector1} alt="banner-vec1" className='banner-vec2 m-auto rounded-circle' />
                <img src={vector1} alt="banner-vec1" className='banner-vec3 m-auto rounded-circle' />
                <img src={vector1} alt="banner-vec1" className='banner-vec4 m-auto rounded-circle' />
                <div className="row pb-3 profile-banner-pc">
                  {
                    single_user_data.map((elem) => {
                      return (
                        <div className="col-12 col-md-7 content-col justify-content-center" key={elem._id}>
                          <h3 className='mt-4'><span className='sp-title'><em> Hello__</em></span></h3>
                          {/* <h3 className='mt-4'><span className='sp-title'><em> Hello, My Name is</em> </span> {elem.f_name + ' ' + elem.l_name}<span className='fs-3 ms-2'><sup><FcApproval /></sup></span></h3> */}
                          {
                            single_user_details.map((sng_elem) => {
                              return (
                                <>
                                  <div key={sng_elem._id}>
                                    <h5 className='mt-4 sp-title'>I'm <span>{sng_elem.profession}</span></h5>
                                    {/* <h5 className='mt-4 sp-title'>I'm <span>{text}</span></h5> */}
                                    <p className='mt-4'>{sng_elem.user_desc}</p>
                                    <hr className='mt-3' />
                                    <div className="row mt-5 mb-3">
                                      <div className="col-12 col-md-12 mt-3 sp-username"><p>{sng_elem.username}</p></div>
                                      <div className="col-12 col-md-12 mt-3"><p><FaRegAddressBook /> {sng_elem.address}</p></div>
                                      <div className="col-12 col-md-12 mt-3"><p><HiOutlinePhone /> {sng_elem.mobile_no}</p></div>
                                      <div className="col-12 col-md-12 mt-3"><p> <AiOutlineMail /> {sng_elem.email}</p></div>
                                    </div>
                                  </div>
                                </>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }

                  <div className="col-12 col-md-5 image-col d-flex align-items-center justify-content-end">
                    {
                      single_user_details.map((elem) => {
                        const profile_pic = `http://localhost:5000/${elem.profile_pic}`;
                        return (
                          <img key={elem._id} src={profile_pic} alt="" className='p-2 profileImage w-100 m-auto rounded-circle' />
                        )
                      })
                    }
                  </div>
                </div>
                {/* <hr className='m-0 p-0 ' /> */}
              </div>
            </div>
          </section>
          <section className='tab bg-dark text-light py-5'>
            <div className='container'>
              <div className="nav nav-tabs" id="myTab" role="tablist">
                <button className="tabs t-light active bg-transparent ms-0 ms-md-2" id="qualification-tab" data-bs-toggle="tab" data-bs-target="#qualification" type="button" role="tab" aria-controls="qualification" aria-selected="false">Qualifictaion</button>
                <button className="tabs t-light bg-transparent ms-0 ms-md-2" id="experience-tab" data-bs-toggle="tab" data-bs-target="#experience" type="button" role="tab" aria-controls="experience" aria-selected="false">Experience</button>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-md-9 ms-md-5 px-md-5 tabs-content">
                  <div className="tab-content" id="myTabContent">
                    {/* Qualification */}
                    <div className="tab-pane fade active" id="qualification" role="tabpanel" aria-labelledby="qualification-tab">
                      {user_qlf.map((elem) => {
                        const { _id, qlf_type, qlf_in, qlf_from, qlf_pctage } = elem
                        return (
                          <div className="row py-2 mt-2" key={_id}>
                            <div className="col-4 col-md-5"><h5>{qlf_type}</h5></div>
                            <div className="col-2 col-md-2"><h5 className='text-center'>:</h5></div>
                            <div className="col-6 col-md-5">
                              <p>{qlf_in}, <em>From </em>{qlf_from}</p>
                              <p>{qlf_pctage}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {/* Experience */}
                    <div className="tab-pane fade" id="experience" role="tabpanel" aria-labelledby="experience-tab">
                      {
                        user_exp.map((elem) => {
                          const { _id, exp_time, exp_department, exp_company, exp_role } = elem;
                          return (
                            <div key={_id}>
                              <div className="row mt-2">
                                <div className="col-4 col-md-5"><h5>Work Experience</h5></div>
                                <div className="col-2 col-md-2"><h5 className='text-center'>:</h5></div>
                                <div className="col-6 col-md-5"><p>{exp_time}</p></div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-4 col-md-5"><h5>Industry/ Department</h5></div>
                                <div className="col-2 col-md-2"><h5 className='text-center'>:</h5></div>
                                <div className="col-6 col-md-5"><p>{exp_department}</p></div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-4 col-md-5"><h5>Company Name:</h5></div>
                                <div className="col-2 col-md-2"><h5 className='text-center'>:</h5></div>
                                <div className="col-6 col-md-5"><p>{exp_company}</p></div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-4 col-md-5"><h5>Working Role:</h5></div>
                                <div className="col-2 col-md-2"><h5 className='text-center'>:</h5></div>
                                <div className="col-6 col-md-5"><p>{exp_role}</p></div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT I DO */}
          <section className='text-light py-80 mywork'>
            <div className="container">
              <div className="row text-center">
                <h2>WHAT I DO</h2>
                <p className=''>MY<em>Services</em></p>
              </div>
              <div className="row ">
                {
                  user_work.map((elem) => {
                    const { _id, work_type, work_name, work_desc } = elem;
                    return (
                      <div className="col border rounded m-2 p-4" key={_id}>
                        <h6>{work_type}</h6>
                        <h3>{work_name}</h3>
                        <p>{work_desc}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </section>

          {/* <section className='bg-dark py-80 text-light'>
            <div className="container">
              <div className="row text-center">
                <h2>PROFESSIONAL SKILLS</h2>
                <p className=''>MY<em>Talent</em></p>
              </div>
              <div className="row skills">
                 {
                  user_skill.map((elem) => {
                    const { _id, sk_name, sk_pctage, sk_desc } = elem;
                    return (
                      <div key={_id} className="border rounded m-2 mt-3 p-4 box">
                        <div className="row">
                          <div className="col-6"><h5>{sk_name}</h5></div>
                          <div className="col-6 text-end"><p>{sk_pctage}</p></div>
                        </div>
                        <p>{sk_desc}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </section> */}

          {/* ***************************************************************************** */}
          {/* ***************************************************************************** */}
          {/* testing sections 1*/}

          <section className='myteam py-120'>
            <div className="container">
              {user_skill.map((skill) => {
                const { _id, sk_name, sk_pctage, sk_desc } = skill;
                return (
                  <div key={_id}>
                    <div className="row align-items-center tm-row">
                      <div className="col-5 name">
                        <h2 className="normal">{sk_name}</h2>
                        <h2 className="hovered">{sk_name}</h2>
                      </div>
                      <div className="col-5 px-5"><p className='sktext'>{sk_desc}</p></div>
                      <div className="col-2"><p className='text-end'>{sk_pctage}</p></div>
                    </div>
                    <hr className="m-0 p-0" />
                  </div>
                )
              })}

            </div>
          </section>
          <hr />
          {/* ***************************************************************************** */}
          {/* ***************************************************************************** */}


          <section className='dark py-80 text-light mywork'>
            <div className="container">
              <div className="row text-center">
                <h2>PORTFOLIO</h2>
                <p className=''>MY<em>Projects</em></p>
              </div>
              <div className="row">
                {project_details.map((elem) => {
                  const pj_thumbnail = `http://localhost:5000/${elem.pj_thumbnail}`;
                  return (
                    <div className="col border p-4 m-2 rounded" key={elem._id}>
                      <img src={pj_thumbnail} alt="sdsdl" class="w-100" />
                      <h3 className='fw-bold ls-1 mt-2'>{elem.pj_name}</h3>
                      <p>{elem.pj_desc}</p>
                      <p>Link: <em><a href={elem.pj_link} className='web-link'>{elem.pj_link}</a></em></p>
                    </div>
                  )
                })
                }
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default SingleUser
