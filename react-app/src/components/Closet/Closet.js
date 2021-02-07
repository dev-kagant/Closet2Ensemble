import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import theCloset from '../../images/okthistime.jpg';
import theDoor from '../../images/theGreenestDoor.jpg'
import "./Closet.css"

const MyCloset = () => {
    const currentUserCloset = useSelector(state => state.user.closetOwner);
    // const dispatch = useDispatch();
    // const [image, setImage] = useState('');
    // const [loaded, setLoaded] = useState(false);

    // useEffect(
    //     dispatch(setImage("../../../public/images/okthistime.jpg")).then(() => { setLoaded(true) })
    // )

    // if (!loaded) {
    //     return null
    // }

    return (
        <div className="closet-container" >
            <img alt="Closet" src={theCloset} className="closet-image" />
            {/* <div className="closet-image-overlay"></div> */}
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left30" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left20" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left10" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right30" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right20" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right10" />
            </div>
        </div>
    )
}

export default MyCloset;
