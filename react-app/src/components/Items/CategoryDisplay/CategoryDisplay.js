import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import './CategoryDisplay.css'


const CategoryDisplay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const closetOwner = useSelector(state => state.user.closetOwner);
    const sectionCategory = useSelector(state => state.category.category)
    const [categoryItems, setCategoryItems] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [styles, setStyles] = useState([]);
    const [weathers, setWeathers] = useState([]);

    useEffect(() => {
        return sectionCategory
    }, [dispatch])
    console.log(sectionCategory)

    const handleChangeSubCat = (e) => { }
    const handleChangeColor = (e) => { }
    const handleChangeStyle = (e) => { }
    const handleChangeWeather = (e) => { }
    const handleChangeClean = (e) => { }


    return (
        <div className="category-display-modal">
            <h1 className="category-display_header">{sectionCategory}</h1>
            <div className="category-display_body">
                <div className="category-display_items">
                    <ul>
                        {categoryItems.map(item => (
                            <li>
                                <Link to={`/closet/${closetOwner.id}/category/${item.id}`}></Link>
                            </li>
                        ))}
                    </ul>
                </div >
                <div className="category-display_filters">
                    <div>Filter Items</div>
                    <label>Sub-Category:</label>
                    <select id='Sub-Category' onChange={handleChangeSubCat}>
                        {subCategories.map(subCat => (
                            <option>{subCat}</option>
                        ))}
                    </select>
                    <label>Color:</label>
                    <select onChange={handleChangeColor}>
                        {colors.map(color => (
                            <option>{color}</option>
                        ))}
                    </select>
                    <label>Style:</label>
                    <select onChange={handleChangeStyle}>
                        {styles.map(style => (
                            <option>{style}</option>
                        ))}
                    </select>
                    <label>Weather:</label>
                    <select onChange={handleChangeWeather}>
                        {weathers.map(weather => (
                            <option>{weather}</option>
                        ))}
                    </select>
                    <label>Clean Only
                    <input type="checkbox" onChange={handleChangeClean} />
                    </label>
                </div>
            </div>
        </div >
    );
}

export default CategoryDisplay;
