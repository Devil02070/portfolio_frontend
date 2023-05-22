import React, { useState, useEffect } from 'react'
import { CgCloseO } from 'react-icons/cg';
import axios from 'axios';

const Profile = (props) => {

  const c_user = props.user_id;
  const userInfo = props.userdetail;
  const userExp = props.exp;
  const userScl = props.social;

  const userdata = props.usernm;
  const name = userdata[0].f_name +' ' + userdata[0].l_name
  // console.log(name);
  // console.log(userInfo[0]["profession"]);

  // const [file, setFile] = useState();
  const [message, setMessage] = useState({ profile: '', project: '', skill: '', work: '', exp: '', qlf: '', pf_pic:'', social:'' });        //response

  const [profile, setProfile] = useState({ 
    username:name,
    profession: '', user_desc: '', address: '', mobile_no: '', email: '' })
  const [experience, setExperience] = useState({ exp_time: '', exp_department: '', exp_company: '', exp_role: '' })
  const [social, setSocial] = useState({scl_facebook:'', scl_linkedin:'', scl_github:'', scl_twitter:''});

  const [work, setWork] = useState({ work_type: '', work_name: '', work_desc: '' })
  const [skills, setSkills] = useState({ sk_name: '', sk_pctage: '', sk_desc: '' })
  const [project, setProject] = useState({ pj_name: '', pj_desc: '', pj_link: '' })
  const [qualification, setQualification] = useState({ qlf_type: '', qlf_in: '', qlf_from: '', qlf_pctage: '' })

  const getData = () => {
    if (userInfo.length > 0) {
      setProfile({
        ...profile,
        username: userInfo[0]["username"],
        // username: name,
        profession: userInfo[0]["profession"],
        user_desc: userInfo[0]["user_desc"],
        address: userInfo[0]["address"],
        mobile_no: userInfo[0]["mobile_no"],
        email: userInfo[0]["email"]
      })
    }
    if (userExp.length > 0) {
      setExperience({
        ...experience,
        exp_time: userExp[0]['exp_time'],
        exp_department: userExp[0]['exp_department'],
        exp_company: userExp[0]['exp_company'],
        exp_role: userExp[0]['exp_role']
      })
    }
    if (userScl.length > 0) {
      setSocial({
        ...social,
        scl_facebook: userScl[0]['scl_facebook'],
        scl_linkedin: userScl[0]['scl_linkedin'],
        scl_github: userScl[0]['scl_github'],
        scl_twitter: userScl[0]['scl_twitter']
      })
      // console.log(social);
    }
  }

  useEffect(() => {
    getData();
  }, [userInfo, userExp])


  const handleInput = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setProfile({ ...profile, [field]: value });
    setWork({ ...work, [field]: value })
    setSkills({ ...skills, [field]: value });
    setProject({ ...project, [field]: value });
    setQualification({ ...qualification, [field]: value })
    setExperience({ ...experience, [field]: value })
    setSocial({...social, [field]:value});
  }

  const token = localStorage.getItem('user_token');

  //_________Profile______________________________________
  const editProfile = async (e) => {
    e.preventDefault();
    const { username, profession, user_desc, address, mobile_no, email } = profile;
    console.log(profile);
    const res = await fetch(`https://portfolio-backend-hazel.vercel.app/edit_profile/${c_user}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        username, profession, user_desc, address, mobile_no, email
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
  const [thumbnail, setThumbnail] = useState();
  const add_project = async (e) => {
    e.preventDefault();
    const { pj_name, pj_desc, pj_link } = project;
    const formdata = new FormData();
    formdata.append("pj_thumbnail", thumbnail);
    formdata.append("pj_name", pj_name);
    formdata.append("pj_desc", pj_desc);
    formdata.append("pj_link", pj_link);
    const res = await axios.post(`https://portfolio-backend-hazel.vercel.app/add_project/${c_user}`, formdata, {
      headers:{
        "Content-type": "multipart/fprm-data",
        Authorization: `Bearer ${token}`
      }
    });
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
      const res = await fetch(`https://portfolio-backend-hazel.vercel.app/add_skills/${c_user}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`
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
      // console.log(work)
      const res = await fetch(`https://portfolio-backend-hazel.vercel.app/add_work/${c_user}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`
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
    try {
      const { qlf_type, qlf_in, qlf_from, qlf_pctage } = qualification;
      const res = await fetch(`https://portfolio-backend-hazel.vercel.app/add_qualification/${c_user}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ qlf_type, qlf_in, qlf_from, qlf_pctage })
      })
      if (res.status === 200) {
        console.log("data inserted");
        setMessage({ ...message, qlf: "Added" })
      } else {
        setMessage({ ...message, qlf: "Failed to Add Qlf." })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Add Experience______________________________
  const add_exp = async (e) => {
    e.preventDefault()
    try {
      const { exp_time, exp_department, exp_company, exp_role } = experience;
      const res = await fetch(`https://portfolio-backend-hazel.vercel.app/add_experience/${c_user}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ exp_time, exp_department, exp_company, exp_role })
      })
      if (res.status === 200) {
        console.log("data inserted");
        setMessage({ ...message, exp: "Added" })
      } else {
        setMessage({ ...message, exp: "Failed to Add Exp." })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Add Social Links-______________________________
  const add_social = async(e) =>{
    e.preventDefault();
    try{
      console.log(social);
      const res = await axios.patch(`https://portfolio-backend-hazel.vercel.app/social_links/${c_user}`, social, { headers: { Authorization: `Bearer ${token}` }});
      if (res.status === 201 || res.status === 200) {
        setMessage({ ...message, social: "Changes Saved successfully" })
      } else {
        setMessage({ ...message, social: "Failed to update" })
      }
    }catch(e){
      console.log(e);
    }
  }

  // Upload File----------------------------------------------------------------
  const [imagefile, setimage] = useState();
  const UploadFile = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("profile_image", imagefile);
    console.log(imagefile)  //returns object

    console.log(formdata);  // returns empty object why?
    try {
      const res = await axios.patch(`https://portfolio-backend-hazel.vercel.app/uploadfile/${c_user}`, formdata, {
        headers:{
          "Content-type":"multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      console.log(res);
      if(res.status === 200){
        setMessage({...message, pf_pic:'Profile Picture Updated.'})
      }else{
        setMessage({...message, pf_pic:'Failed Uo Update.'})
      }
    } catch (e) {
      console.log(e);
    }
  }

  // const edit_work = async()=>{
  //   try{
  //     console.log()
  //     // const res = axios.patch('/edit_work')
  //   }catch(e){

  //   }
  // }

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
                <input type="file" className='border w-100 my-4 rounded p-2 text-light' name="profile_image" onChange={(e) => setimage(e.target.files[0])} />
                <div className="text-end">
                  <input type="submit" value="Change" className='btn-red border-0 rounded' />
                  <p className='resp_msg'>{message.pf_pic}</p>
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

                <label htmlFor="" className='mt-3'>Name:</label>
                <input type="text" name="username" value={profile.username} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Profession:</label>
                <input type="text" name="profession" value={profile.profession} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Description:</label>
                <textarea name="user_desc" rows="3" value={profile.user_desc} onChange={handleInput} className='w-100 bg-transparent text-light mt-2 p-2'></textarea>
                <label htmlFor="" className='mt-3'>Address:</label>
                <input type="text" name="address" value={profile.address} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Mobile No.:</label>
                <input type="text" name="mobile_no" value={profile.mobile_no} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <label htmlFor="" className='mt-3'>Email:</label>
                <input type="text" name="email" value={profile.email} onChange={handleInput} className='w-100 bg-transparent mt-2 border p-2 rounded text-light' /><br />

                <div className="text-end">
                  <input type="submit" value="Save" className='btn-red border-0 rounded' />
                  <p className='resp_msg'>{message.profile}</p>
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
                <input type="file" name='pj_thumbnail' onChange={(e)=>setThumbnail(e.target.files[0])} className='p-3 text-light' />

                <div className="text-end">
                  <input type="submit" value="Save" className='btn-red border-0 rounded' />
                  <p className='resp_msg'>{message.project}</p>
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
                  <p className='resp_msg'>{message.skill}</p>
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
                  <p className='resp_msg'>{message.work}</p>
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
                  <p className='resp_msg'>{message.qlf}</p>
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
                  <p className='resp_msg'>{message.exp}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* __________________________-SOCIAL LINKS MODAL-____________________________ */}
      <div className="modal fade" id="social_links" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Social Links:</h5>
              <button type="button" class="close bg-transparent fs-3" data-bs-dismiss="modal" aria-label="Close">
                <CgCloseO />
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={add_social} encType="multipart/form-data">
                <input type="text" name="scl_facebook" value={social.scl_facebook} onChange={handleInput} placeholder="Facebook" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="scl_linkedin" value={social.scl_linkedin} onChange={handleInput} placeholder="Linkedin" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="scl_github" value={social.scl_github} onChange={handleInput} placeholder="Github" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="scl_twitter" value={social.scl_twitter} onChange={handleInput} placeholder="Twitter" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <div className="text-end">
                  <input type="submit" value="Save / Update" className='btn-red border-0 rounded mt-4' />
                  <p className='resp_msg'>{message.social}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>










      {/* EDIT MODALS */}
      {/* __________________________-edit Work MODAL-____________________________ */}
      {/* <div className="modal fade" id="edit-work" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg rounded">
          <div className="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">What I Do:</h5>
              <button type="button" class="close bg-transparent fs-3" data-bs-dismiss="modal" aria-label="Close">
                <CgCloseO />
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={edit_work} encType="multipart/form-data">

                <input type="text" name="work_type" value={editworkcard.work_typee} onChange={handleInput} placeholder="Type" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <input type="text" name="work_name" value={editworkcard.work_namee} onChange={handleInput} placeholder="Name" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' /><br />
                <textarea name="work_desc" className='w-100 bg-transparent mt-4 border p-2 rounded text-light' placeholder="Description" onChange={handleInput} value={editworkcard.work_descc}></textarea>
                <div className="text-end">
                  <input type="submit" value="Save" className='btn-red border-0 rounded mt-4' />
                  <p className='resp_msg'>{message.work}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}

    </>
  )
}

export default Profile
