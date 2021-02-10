import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import './CategoryDisplay.css'


const CategoryDisplay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const closetOwner = useSelector(state => state.user.closetOwner);
    const [categoryItems, setCategoryItems] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [styles, setStyles] = useState([]);
    const [weathers, setWeathers] = useState([]);


    const handleChangeSubCat = (e) => { }
    const handleChangeColor = (e) => { }
    const handleChangeStyle = (e) => { }
    const handleChangeWeather = (e) => { }
    const handleChangeClean = (e) => { }


    return (
        <div>
            <h1>Category Name</h1>
            <div>
                <ul>
                    {categoryItems.map(item => (
                        <li>
                            <Link to={`/closet/${closetOwner.id}/category/${item.id}`}></Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <div>Filter Items</div>
                <select onChange={handleChangeSubCat}>
                    {subCategories.map(subCat => (
                        <option>{subCat}</option>
                    ))}
                </select>
                <select onChange={handleChangeColor}>
                    {colors.map(color => (
                        <option>{color}</option>
                    ))}
                </select>
                <select onChange={handleChangeStyle}>
                    {styles.map(style => (
                        <option>{style}</option>
                    ))}
                </select>
                <select onChange={handleChangeWeather}>
                    {weathers.map(weather => (
                        <option>{weather}</option>
                    ))}
                </select>
                <input type="checkbox" onChange={handleChangeClean} />
            </div>
        </div>
    );
}

export default CategoryDisplay;
