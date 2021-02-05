import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


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
        <div>
            <h1>Where is my image</h1>
            <img alt="Closet" src="../../images/okthistime.jpg" width="970" height="224" />
        </div>
    )
}

export default MyCloset;
