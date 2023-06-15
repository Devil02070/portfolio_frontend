import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


import inner_img from '../../images/home-2.png';
import vector1 from '../../images/vector1.png';  //circle
import vector2 from '../../images/home-vc.png';  //top-left
import vector3 from '../../images/home-3.png';  //bottom-right

const Home = () => {

  const [text, setText] = useState('');
  const phrases = ["Welcome To My Portfolio App"];

  useEffect(() => {
    let count = 0;
    let index = 0;
    let currentText = '';
    let interval = setInterval(() => {
      if (count === phrases.length) {
        count = 0;
      }
      currentText = phrases[count];
      setText(currentText.slice(0, index));
      index++;
      if (index > currentText.length) {
        index = 0;
        count++;
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 1 */}
      <section className='ss_1 of-auto'>
          <img src={vector1} alt="banner-vec1" className='home-vec2 m-auto' />
          <img src={vector1} alt="banner-vec1" className='home-vec4 m-auto' />
          <img src={vector1} alt="banner-vec1" className='home-vec5 m-auto' />
          <img src={vector1} alt="banner-vec1" className='home-vec6 m-auto' />
          <img src={vector1} alt="banner-vec1" className='home-vec7 m-auto' />

          <img src={vector2} alt="banner-vec1" className='home-vec1 m-auto' />
          <img src={vector3} alt="banner-vec1" className='home-vec3 m-auto' />
        <div className="container text-center banner d-flex align-items-end flex-wrap">
          <div className="w-100 mb-5">
            <p className='py-1 w-100'>{text} |</p><hr className='w-50 m-auto' />
            <h1 className='text-center w-100'>Creative Portfolio</h1>
            <a class="scroll-link" href="#about">
              <svg class="mouse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 130" preserveAspectRatio="xMidYMid meet">
                <g fill="none" fill-rule="evenodd">
                  <rect width="70" height="118" x="1.5" y="1.5" stroke="#FFF" stroke-width="3" rx="36"/>
                  <circle class="scroll" cx="36.5" cy="31.5" r="4.5" fill="#FFF"/>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 2 */}
      <section className='ss_2 py-80' id="about">
        <div className="container section-2">
          <div className="row">
            <div className="col-12 col-md-6 col-first">
              <img src={inner_img} alt="" className='w-100 vector-1' />
            </div>
            <div className="col-12 col-md-6 d-flex align-items-center flex-wrap col-sec">
              <div>
                {/* <h2 className=''>Ready to get started?</h2> */}
                <p className='text-light sub-heading'>Highlight Your Skills</p>
                <h2 className=''>Build Your Own Portfolio Today</h2>
                <p className='text-para'>Hello and welcome to my portfolio website! My name is Shryder and I'm a full-stack web developer with a passion for creating beautiful, responsive, and user-friendly websites. I have created this website where users can create their resumes.</p>
                <Link to="/about"><button className='btn btn-red'>Create Now</button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
