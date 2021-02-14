import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import './CategoryDisplay.css'


const CategoryDisplay = () => {
    // const dispatch = useDispatch();
    // const history = useHistory();
    const closetOwner = useSelector(state => state.user.closetOwner);
    const sectionCategory = useSelector(state => state.category.category)
    const [originalCategoryItems, setOriginalCategoryItems] = useState([])
    const [categoryItems, setCategoryItems] = useState(null)
    // const getItems = useSelector(state => state.category.category.subCategories)
    const [subCate, setSubCate] = useState([]);
    const [colors, setColors] = useState([]);
    const [styles, setStyles] = useState([]);
    const [weathers, setWeathers] = useState([]);
    // const [subCateId, setSubCateId] = useState(null);
    // const [colorId, setColorId] = useState(null);
    // const [styleId, setStyleId] = useState(null);
    // const [weatherId, setWeatherId] = useState(null);

    useEffect(() => {
        if (!sectionCategory) {
            return
        }
        setSubCate(sectionCategory.subCategories)
        // setSubCateId(getIds(sectionCategory.subCategories))
        // setColors()
        // setStyles()
        // setWeathers()
        setOriginalCategoryItems(allItems(sectionCategory.subCategories))
        setCategoryItems(allItems(sectionCategory.subCategories))
    }, []);

    const allItems = (subs) => {
        let all = []
        for (let i = 0; i < subs.length; i++) {
            all.push(...subs[i].items)
        }
        return all
    }

    const getIds = (filters) => {
        let allIds = [];
        for (let i = 0; i < filters.length; i++) {
            allIds.push(filters[i].id)
        }
        return allIds
    }

    const handleChangeSubCate = (e) => {
        // await setSubCateId()
        console.log("Checking", e.target.value)
        changeItemsViewed({ subCateId: e.target.value })
    }
    const handleChangeColor = (e) => {
        // changeItemsViewed(_, e.target.value)
    }
    const handleChangeStyle = (e) => {
        // changeItemsViewed(_, _, e.target.value)
    }
    const handleChangeWeather = (e) => {
        // changeItemsViewed(_, _, _, e.target.value)
    }
    const handleChangeClean = (e) => { }

    // const changeItemsViewed = (subCateId, colors, weather, style) => {

    const changeItemsViewed = ({ subCateId }) => {
        const itemsViewed = originalCategoryItems;
        const itemsReturned = []
        for (let i = 0; i < itemsViewed.length; i++) {
            console.log("Working", itemsViewed[i].subCategoryId)
            if (itemsViewed[i].subCategoryId == subCateId) {
                itemsReturned.push(itemsViewed[i])
            }
        }
        console.log("These Items", subCateId)
        if ((subCateId === '- - Select One - -')) {
            return setCategoryItems(originalCategoryItems)
        }
        return setCategoryItems(itemsReturned)
    }

    console.log("Lets see", categoryItems)

    return (
        <div className="category-display-modal">
            <h1 className="category-display_header">{sectionCategory.categoryName.toLowerCase()}</h1>
            <div className="category-display_body">
                <div >
                    <ul className="category-display_items">
                        {categoryItems && categoryItems.map(item => (
                            <li className="item-icon">
                                <Link to={`/closet/${closetOwner.id}/category/${item.id}`}>
                                    <img src={item.image} alt={item.description} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div >
                <form className="category-display_filters">
                    <div>Filter Items</div>
                    <label>Sub-Category:</label>
                    <select id='Sub-Category' onChange={handleChangeSubCate}>
                        <option>- - Select One - -</option>
                        {subCate.map(subCat => (
                            <option value={subCat.id}>{subCat.subCategoryName}</option>
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
                </form>
            </div>
        </div >
    );
}

export default CategoryDisplay;
