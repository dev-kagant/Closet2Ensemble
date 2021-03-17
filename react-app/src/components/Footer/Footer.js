import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Footer.css'

const Footer = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const currentClosetOwner = useSelector(state => state.user.closetOwner);


    return (
        <div className='footer'>
            <div className='footer-profiles'>
                <h3>Public Profiles</h3>
                <a href="https://angel.co/u/kerri-gant">AngelList</a>
                <a href="https://github.com/dev-kagant">GitHub</a>
                <a href="https://www.linkedin.com/in/kerrigant/">LinkedIn</a>
                <a href="https://docs.google.com/document/d/15KuwyXKcmjXxplEr68Quz8YXWX7JyhMDPzZHRpMX_Eg/edit?usp=sharing">Resume</a>
            </div>
            <div className="footer-projects">
                <h3>Personal Projects</h3>
                <a href="virus-overflow.herokuapp.com">Virus Overflow</a>
                {/* <a href="brainbloow.herokuapp.com">BrainGain</a> */}
                <a href="cheonjae.herokuapp.com">Cheonjae</a>
                <a href="closettoensemble.herokuapp.com">Closet To Ensemble</a>
            </div>
            <div className="footer-contacts">
                <h3>Contact Information</h3>
                <p>Kerri Ashley gant</p>
                <p>Phone: 540-273-0933</p>
                <p>Email: gant.kerri@gmail.com</p>
            </div>
        </div>
    );
}

export default Footer;
