import React, { useState, useEffect } from 'react'
// import { json } from 'react-router-dom';
import {CgCloseO} from 'react-icons/cg';

const Profile = (props) => {

  const c_user = props.user_id;
  const u_exp = props.exp;
  
  const [file, setFile] = useState();
  const [message, setMessage] = useState({ profile: '', project: '', skill: '', work: '', exp:'', qlf:'' });        //response


  const [profile, setProfile] = useState({
    profession: props.all_data.profession,
    user_desc: props.all_data.user_desc,
    address: props.all_data.address,
    mobile_no: props.all_data.mobile_no,
    email: props.all_data.email
  })
  const [experience, setExperience] = useState({
    exp_time:u_exp[0]['exp_time'],
    exp_department:u_exp[0]['exp_department'],
    exp_company:u_exp[0]['exp_company'],
    exp_role:u_exp[0]['exp_role']
  })

  const [project, setProject] = useState({ pj_name: '', pj_desc: '', pj_link: '' })
  const [skills, setSkills] = useState({ sk_name: '', sk_pctage: '', sk_desc: '' })
  const [work, setWork] = useState({ work_type: '', work_name: '', work_desc: '' })
  const [qualification, setQualification] = useState({ qlf_type: '', qlf_in: '', qlf_from: '', qlf_pctage:'' })
  // const [experience, setExperience] = useState({exp_time:'', exp_department:'', exp_company:'', exp_role:''})

  const handleInput = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setProfile({ ...profile, [field]: value });
    setProject({ ...project, [field]: value });
    setSkills({ ...skills, [field]: value });
    setWork({ ...work, [field]: value })
    setQualification({ ...qualification, [field]: value })
    setExperience({ ...experience, [field]: value })
  }

  //_________Profile______________________________________
  const editProfile = async (e) => {
    e.preventDefault();
    const { profession, user_desc, address, mobile_no, email } = profile;
    const res = await fetch(`/upload_pic/${c_user}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        profile_pic: file, profession, user_desc, address, mobile_no, email
      })
    })
    const data = await res.json();
    if (res.status === 201 || res.status === 200) {
      setMessage({ ...message, profile: "Changes Saved successfully" })
    } else {
      setMessage({ ...message, profile: "Failed to update, Please try again later" })
    }
  }

  // _________Project______________________________________
  const add_project = async (e) => {
    e.preventDefault();
    const { pj_name, pj_desc, pj_link } = project;
    const res = await fetch(`add_project/${c_user}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        pj_name, pj_desc, pj_link
      })
    })
    await res.json();
    if (res.status === 200) {
      setMessage({ ...message, project: "Project Added" })
    } else {
      setMessage({ ...message, project: "Failed to Add Project" })
    }
  }

  // Add Skills____________________________
  const add_skills = async (e) => {
    e.preventDefault();
    try {
      const { sk_name, sk_pctage, sk_desc } = skills;
      const res = await fetch(`/add_skills/${c_user}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({ sk_name, sk_pctage, sk_desc })
      })
      if (res.status === 200) {
        console.log("data inserted");
        setMessage({ ...message, skill: "New Skill Added" })
      } else {
        setMessage({ ...message, skill: "Failed to Add New Skill." })
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Add Work________________________________
  const add_work = async (e) => {
    e.preventDefault();
    try {
      const { work_type, work_name, work_desc } = work;
      const res = await fetch(`/add_work/${c_user}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({ work_type, work_name, work_desc })
      })
      if (res.status === 200) {
        console.log("data inserted");
        setMessage({ ...message, work: "New work Added" })
      } else {
        setMessage({ ...message, work: "Failed to Add work." })
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Add Qualificatoin______________________________
  const add_qualfication = async (e) => {
    e.preventDefault();
    try{
      const {qlf_type, qlf_in, qlf_from, qlf_pctage} = qualification;
      const res = await fetch(`/add_qualification/${c_user}`,{
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({qlf_type, qlf_in, qlf_from, qlf_pctage})
      })
      if (res.status === 200) {
        console.log("data inserted");
        setMessage({ ...message, qlf: "Added" })
      } else {
        setMessage({ ...message, qlf: "Failed to Add Qlf." })
      }
    }catch(e){
      console.log(e)
    }
  }

   // Add Experience______________________________
   const add_exp = async(e)=>{
    e.preventDefault()
    try{
      const {exp_time, exp_department,exp_company, exp_role} = experience;
      const res = await fetch(`/add_experience/${c_user}`,{
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({exp_time, exp_department,exp_company, exp_role})
      })
      if (res.status === 200) {
        console.log("data inserted");
        setMessage({ ...message, exp: "Added" })
      } else {
        setMessage({ ...message, exp: "Failed to Add Exp." })
      }
    }catch(e){
      console.log(e)
    }
   }

  // Upload File----------------------------------------------------------------
  const [imagefile, setimage] = useState();
  const UploadFile = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("profile_image", JSON.stringify(imagefile));
    console.log(imagefile)  //returns object

    console.log(formdata);  // returns empty object why
    const boundary = Math.random().toString();
    try {
      const res = await fetch('/uploadfile', {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=boundary=${boundary}`,
        },
        body: formdata
      })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {/* __________________________-Upload image MODAL-___________________________ */}
      <div className="modal fade" id="upload-profile-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Projects</h5>
              <button type="button" class="close rounded-circle border fs-5" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={UploadFile}>
                <input type="file" className='border w-100 my-4 rounded p-2' name="profile_image" onChange={(e) => setimage(e.target.files[0])} />
                <div className="text-end">
                  <input type="submit" value="Change" className='btn-red border-0 rounded' />
                  {/* <p>{message}</p> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* __________________________-EDIT PROFILE MODAL-___________________________ */}
      <div className="modal fade" id="profile-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Profile (basic details):</h5>
              <button type="button" class="close bg-transparent fs-3" data-bs-dismiss="modal" aria-label="Close">
              <CgCloseO />
              </button>
            </div>
            <div class="modal-body">
              <form method="POST" onSubmit={editProfile} encType="multipart/form-data">
                <input type="hidden" data={props.user_id} name='user_id' />

                <label htmlFor="" className='mt-3'>Profession:</label>
                <input type="text" name="profession" value={profile.profession} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Description:</label>
                <input type="text" name="user_desc" value={profile.user_desc} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Address:</label>
                <input type="text" name="address" value={profile.address} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Mobile No.:</label>
                <input type="text" name="mobile_no" value={profile.mobile_no} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Email:</label>
                <input type="text" name="email" value={profile.email} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Profile Image:</label>
                <input type="file" class="rounded border p-2 w-100" name="profile_pic" onChange={(e) => setFile(e.target.files[0].name)} className='w-100 bg-transparent mt-2 border p-2 pointer' /><br />

                <p>{message.profile}</p>

                <div className="text-end">
                  <input type="submit" value="Save" className='btn-red border-0 rounded' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* __________________________-ADD PROJECTS MODAL-____________________________ */}
      <div className="modal fade" id="project-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Projects:</h5>
              <button type="button" class="close bg-transparent fs-3" data-bs-dismiss="modal" aria-label="Close">
              <CgCloseO />
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={add_project} encType="multipart/form-data">

                <label htmlFor="" className='mt-3'>Project Name:</label>
                <input type="text" name="pj_name" value={project.pj_name} onChange={handleInput} placeholder="Project Name" className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />
                <label htmlFor="" className='mt-3'>Project Description:</label>
                <input type="text" name="pj_desc" value={project.pj_desc} onChange={handleInput} placeholder="Project Description" className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />
                <label htmlFor="" className='mt-3'>Link to Project:</label>
                <input type="text" name="pj_link" value={project.pj_link} onChange={handleInput} placeholder="Project Link" className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />
                <label htmlFor="" className='mt-3'>Project Thumbnail:</label>
                <input type="file" name='pj_thumbnail' className='p-3'/>

                <div className="text-end">
                  <input type="submit" value="Save" className='btn-red border-0 rounded' />
                  <p>{message.project}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* __________________________-Add Skills MODAL-______________________________ */}
      <div className="modal fade" id="skills-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">My Skills:</h5>
              <button type="button" class="close bg-transparent fs-3" data-bs-dismiss="modal" aria-label="Close">
              <CgCloseO />
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={add_skills} encType="multipart/form-data">

                <input type="text" name="sk_name" value={skills.sk_name} onChange={handleInput} placeholder="Skill" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="sk_pctage" value={skills.sk_pctage} onChange={handleInput} placeholder="Rating b/w (1-100)%" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <textarea name="sk_desc" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' placeholder="Description" onChange={handleInput}></textarea>
                <div className="text-end">
                  <input type="submit" value="Save" className='btn-red border-0 rounded mt-4' />
                  <p>{message.skill}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* __________________________-MY-WORK MODAL-_________________________________ */}
      <div className="modal fade" id="mywork-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">What I Do:</h5>
              <button type="button" class="close bg-transparent fs-3" data-bs-dismiss="modal" aria-label="Close">
                <CgCloseO />
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={add_work} encType="multipart/form-data">

                <input type="text" name="work_type" value={work.work_type} onChange={handleInput} placeholder="Type" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="work_name" value={work.work_name} onChange={handleInput} placeholder="Name" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <textarea name="work_desc" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' placeholder="Description" onChange={handleInput}></textarea>
                <div className="text-end">
                  <input type="submit" value="Save" className='btn-red border-0 rounded mt-4' />
                  <p>{message.work}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* __________________________-QUALIFICSTION MODAL-___________________________ */}
      <div className="modal fade" id="qualification-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">MY Qualifications:</h5>
              <button type="button" class="close bg-transparent fs-3" data-bs-dismiss="modal" aria-label="Close">
                <CgCloseO />
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={add_qualfication} encType="multipart/form-data">
                <select name="qlf_type" value={qualification.qlf_type} onChange={handleInput} className='bg-transparent text-light w-100 p-2 mt-4'>
                  <option value="Matriculation" className='text-dark'>Matriculation</option>
                  <option value="10+2" className='text-dark'>10+2</option>
                  <option value="Graduation" className='text-dark'>Graduation</option>
                  <option value="Post Gradustion" className='text-dark'>Post Gradustion</option>
                  <option value="other" className='text-dark'>other</option>
                </select>
                <input type="text" name="qlf_in" value={qualification.qlf_in} onChange={handleInput} placeholder="Qualification In" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="qlf_from" value={qualification.qlf_from} onChange={handleInput} placeholder="Board/Institute/University Name" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="qlf_pctage" value={qualification.qlf_pctage} onChange={handleInput} placeholder="Total Percentage" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <div className="text-end">
                  <input type="submit" value="Save" className='btn-red border-0 rounded mt-4' />
                  <p>{message.qlf}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* __________________________-Experience MODAL-____________________________ */}
      <div className="modal fade" id="experience-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Work Experience:</h5>
              <button type="button" class="close bg-transparent fs-3" data-bs-dismiss="modal" aria-label="Close">
                <CgCloseO />
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={add_exp} encType="multipart/form-data">
                <select name="exp_time" value={experience.exp_time} onChange={handleInput} className='bg-transparent text-light w-100 p-2 mt-4'>
                  <option value="Fresher(No work experience)" className='text-dark'>Fresher(No work experience)</option>
                  <option value="1-6 Months" className='text-dark'>1-6 Months</option>
                  <option value="6-10 Months" className='text-dark'>6-10 Months</option>
                  <option value="1 Year" className='text-dark'>1 Year</option>
                  <option value="2-3 Year" className='text-dark'>2-3 Year</option>
                  <option value="More than 3 Years" className='text-dark'>More than 3 Years</option>
                </select>
                <input type="text" name="exp_department" value={experience.exp_department} onChange={handleInput} placeholder="Industry/ Department" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="exp_company" value={experience.exp_company} onChange={handleInput} placeholder="Company Name" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="exp_role" value={experience.exp_role} onChange={handleInput} placeholder="Working Role" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <div className="text-end">
                  <input type="submit" value="Save / Update" className='btn-red border-0 rounded mt-4' />
                  <p>{message.exp}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Profile
