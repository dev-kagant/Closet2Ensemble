import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import theDoor from '../../images/theGreenestDoor.jpg';


import './outfitPlanner.css'


const OutfitPlanner = (items) => {
    return (
        <div className="planner-main">
            <div className="planner-header">
                Coming Soon ...
            </div>
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


export default OutfitPlanner
