import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import ImageMap from "image-map";
import $ from 'jquery'
import theCloset from '../../images/okthistime.jpg';
import theDoor from '../../images/theGreenestDoor.jpg'
import "./Closet.css"

const MyCloset = () => {
    const currentUserCloset = useSelector(state => state.user.closetOwner);
    // const dispatch = useDispatch();
    // const [image, setImage] = useState('');
    // const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        ImageMap('img[usemap]', 0)
        hoverEffect()
    }, [])

    // if (!loaded) {
    //     return null
    // }


    const hoverEffect = () => {
        $('#image-map area').hover(
            function () {
                var coords = $(this).attr('coords').split(','),
                    width = $('.closet-container').width(),
                    height = $('.closet-container').height();
                $('.closet-container .map-selector').addClass('hover').css({
                    'left': coords[0] + 'px',
                    'top': coords[1] + 'px',
                    'right': width - coords[2],
                    'bottom': height - coords[3]
                })
            },
            function () {
                $('.closet-container .map-selector').removeClass('hover').attr('style', '');
            }
        )
    }


    return (

        <div className="big-closet-container">
            <div className="closet-container">
                <img src={theCloset} usemap="#closet-sections" alt="The Closet" />
                <div className="map-selector"></div>
            </div>
            <map name="closet-sections" id="image-map">
                <area data-title="jackets-one" shape="rect" coords="260,100,430,320" href="" />
                <area data-title="Sweaters" shape="rect" coords="440,59,605,236" href="" />
                <area id="bottoms" shape="rect" coords="275,357,450,569" href="" />
                <area id="dresses-one" shape="rect" coords="824,621,650,355" href="" />
                <area id="dresses-two" shape="rect" coords="470,268,533,591" href="" />
                <area id="accessories-one" shape="rect" coords="359,570,436,626" href="" />
            </map>
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
