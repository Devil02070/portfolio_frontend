import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcApproval } from 'react-icons/fc';

import ProfileModal from '../modals/Profile';
import profile_img from '../../images/12341.jpg';

const About = () => {
  const [userdata, setUserdata] = useState([]);
  const [userOtherdata, setUserOtherdata] = useState([]);
  const [project_details, setProjectDetails] = useState([]);
  const [user_skill, setSkills] = useState([]);
  const [user_work, setWork] = useState([]);
  const [user_exp, setExperience] = useState([]);
  const [user_qlf, setQualification] = useState([]);

  const navigate = useNavigate();
  const aboutPage = async () => {
    try {
      // fetch api
      const res = await fetch("/aboutme", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      // get response
      if (res.status !== 200 || !data) {
        localStorage.removeItem('user_login');
        navigate('/login');

      } else {
        setUserdata(data.single_user_data);
        setUserOtherdata(data.single_user_details);
        setProjectDetails(data.project_details);
        setSkills(data.user_skills[0]['skills']);
        setWork(data.user_skills[0]['work']);
        setExperience(data.user_skills[0]['experience']);
        setQualification(data.user_skills[0]['qualification']);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    aboutPage();
  }, [])

  return (
    <>


      <section className='dark-bg About py-80'>
        <div className="container shadow">
          <div className="row px-3 p-md-0">
            <div className="col-12 col-md-2 profileImg p-2 d-flex rounded">
              <img src={profile_img} alt="" className='w-100 rounded' />
            </div>
            <div className="col-12 col-md-9 px-0 ms-md-5 ps-md-5">
              <div className="row mt-3 mt-md-0">
                <div className="col-6 col-md-6">
                  {userdata.map((elem) => { return (<div key={elem._id}><h3>{elem.f_name + ' ' + elem.l_name}<FcApproval /></h3></div>) })}
                </div>
                <div className="col-6 col-md-6 text-end">
                  <button type="button" className="btn btn-red" data-bs-toggle="modal" data-bs-target="#profile-modal">Edit Details</button>
                </div>
              </div>
              {userOtherdata.map((elemt) => {
                return (
                  <div key={elemt._id}>
                    <ProfileModal user_id={elemt.user_id} all_data={elemt} exp={user_exp} />
                    <p className='t-light pt-3 mt-md-0'>{elemt.profession}</p><hr className='w-50' />
                    <p>Email: <span className='t-light'>{elemt.email}</span></p>
                    <p>Phone: <span className='t-light'>{elemt.mobile_no}</span></p>
                  </div>
                )
              })}


              {/* Tabs */}
              <div className="nav nav-tabs mt-5" id="myTab" role="tablist">
                <button className="tabs t-light active bg-transparent ms-0 ms-md-3" id="intro-tab" data-bs-toggle="tab" data-bs-target="#intro" type="button" role="tab" aria-controls="intro" aria-selected="true">Intro</button>
                <button className="tabs t-light bg-transparent ms-0 ms-md-2" id="qualification-tab" data-bs-toggle="tab" data-bs-target="#qualification" type="button" role="tab" aria-controls="qualification" aria-selected="false">Qualifictaion</button>
                <button className="tabs t-light bg-transparent ms-0 ms-md-2" id="experience-tab" data-bs-toggle="tab" data-bs-target="#experience" type="button" role="tab" aria-controls="experience" aria-selected="false">Experience</button>
                <button className="tabs t-light bg-transparent ms-0 ms-md-2" id="projects-tab" data-bs-toggle="tab" data-bs-target="#projects" type="button" role="tab" aria-controls="projects" aria-selected="false">Projects</button>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-2 col-md-2 social-links">
              <button type="button" className='btn border text-light mb-3' data-bs-toggle="modal" data-bs-target="#upload-profile-modal">Change profile</button>
              <h5>Social:</h5>
              <p><Link className='text-decoration-none web-link'>Facebook</Link></p>
              <p><Link className='text-decoration-none web-link'>Instagram</Link></p>
              <p><Link className='text-decoration-none web-link'>Twitter</Link></p>
              <p><Link className='text-decoration-none web-link'>Github</Link></p>
              <p><Link className='text-decoration-none web-link'>Youtube</Link></p>
            </div>
            <div className="col-12 col-md-9 ms-md-5 px-md-5 tabs-content">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="intro" role="tabpanel" aria-labelledby="intro-tab">
                  <p className='t-light text-decoration-none'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque recusandae mollitia aperiam animi ut velit incidunt nemo aspernatur tenetur veniam.lorem30
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque recusandae mollitia aperiam animi ut velit incidunt nemo aspernatur tenetur veniam.lorem30
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque recusandae mollitia aperiam animi ut velit incidunt nemo aspernatur tenetur veniam.lorem30
                  </p>
                </div>
                <div className="tab-pane fade" id="qualification" role="tabpanel" aria-labelledby="qualification-tab">
                  <div className="row"><button type="button" className='btn-red rounded w-25 ms-auto' data-bs-toggle="modal" data-bs-target="#qualification-modal">Add Qualificaion</button></div>
                  {
                    user_qlf.map((elem) => {
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
                    })
                  }

                </div>
                <div className="tab-pane fade" id="experience" role="tabpanel" aria-labelledby="experience-tab">
                  <div className="row"><button type="button" className='btn-red rounded w-25 ms-auto' data-bs-toggle="modal" data-bs-target="#experience-modal">Add Experience</button></div>
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
                <div className="tab-pane fade" id="projects" role="tabpanel" aria-labelledby="projects-tab">
                  <div className="row"><button type="button" className='btn-red rounded w-25 ms-auto' data-bs-toggle="modal" data-bs-target="#project-modal">Add New</button></div>
                  {project_details.map((elem) => {
                    const { _id, pj_name, pj_desc, pj_link } = elem;
                    return (
                      <div className="row mt-3" key={_id}>
                        <div className="col-4 col-md-5">
                          <h5>{pj_name}</h5>
                        </div>
                        <div className="col-1 col-md-2"><h5 className='text-center'>:</h5></div>
                        <div className="col-7 col-md-5">
                          <p>{pj_desc}</p>
                          <p>Link:<em><a href={pj_link} className='web-link'>{pj_link}</a></em></p>
                          {/* <p>Language: <span>PHP, HTML, CSS, JS</span></p> */}
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
      <section className='text-light pb-80 mywork'>
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
          <div className="row w-75 ms-auto pe-2 mt-3">
            <button type="button" className='btn-red rounded w-25 ms-auto' data-bs-toggle="modal" data-bs-target="#mywork-modal">Add Work</button>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className='pb-80 text-light mywork'>
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

          <div className="row w-75 ms-auto pe-2 mt-3">
            <button type="button" className='btn-red rounded w-25 ms-auto' data-bs-toggle="modal" data-bs-target="#skills-modal">Add New Skill</button>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className='pb-80 text-light mywork'>
        <div className="container">
          <div className="row text-center">
            <h2>PORTFOLIO</h2>
            <p className=''>MY<em>Projects</em></p>
          </div>
          <div className="row">
            {project_details.map((elem) => {
              return (
                <div className="col border p-4 m-2 rounded" key={elem._id}>
                  <img src="" alt="project thumbnail" />
                  <h3 className='fw-bold ls-1 mt-2'>{elem.pj_name}</h3>
                  <p>{elem.pj_desc}</p>
                  <p>Link: <em><a href={elem.pj_link} className='web-link'>{elem.pj_link}</a></em></p>
                </div>
              )
            })
            }
          </div>
          <div className="row w-75 ms-auto pe-2 mt-3">
            <button type="button" className='btn-red rounded w-25 ms-auto' data-bs-toggle="modal" data-bs-target="#project-modal">Add Project</button>
          </div>
        </div>
      </section>
      {/* <ProfileModal user_id={userdata.user_id} /> */}
    </>
  )
}

export default About
