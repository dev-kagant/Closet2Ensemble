import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import './CategoryDisplay.css'


const CategoryDisplay = () => {
    const dispatch = useDispatch();

    const closetOwner = useSelector(state => state.user.closetOwner);
    const sectionCategory = useSelector(state => state.category.category)

    const [originalCategoryItems, setOriginalCategoryItems] = useState([])
    const [categoryItems, setCategoryItems] = useState(null)
    const [subCate, setSubCate] = useState([]);
    const [colors, setColors] = useState([]);
    const [styles, setStyles] = useState([]);
    const [weathers, setWeathers] = useState([]);
    const [subCateId, setSubCateId] = useState("- - Select One - -");
    const [colorId, setColorId] = useState("- - Select One - -");
    const [styleId, setStyleId] = useState("- - Select One - -");
    const [weatherId, setWeatherId] = useState("- - Select One - -");


    useEffect(() => {
        if (!sectionCategory) {
            return
        }
        setCategoryItems(allItems(sectionCategory.subCategories))
        setOriginalCategoryItems(allItems(sectionCategory.subCategories))
        setSubCate(sectionCategory.subCategories)
        getColors()
        getStyles()
        getWeather()
    }, []);

    useEffect(() => {
        if (!categoryItems) {
            return
        }
        changeItemsViewed()
    }, [subCateId, colorId, styleId, weatherId])

    const allItems = (subs) => {
        let all = []
        for (let i = 0; i < subs.length; i++) {
            all.push(...subs[i].items)
        }
        return all
    }

    const getColors = async () => {
        const response = await fetch("/api/items/colors")
        if (response.ok) {
            const theColors = await response.json()
            return setColors(theColors.colors)
        }
    }
    const getStyles = async () => {
        const response = await fetch("/api/items/styles")
        if (response.ok) {
            const theStyles = await response.json()
            return setStyles(theStyles.styles)
        }
    }
    const getWeather = async () => {
        const response = await fetch("/api/items/weather")
        if (response.ok) {
            const theWeather = await response.json()
            return setWeathers(theWeather.weather)
        }
    }

    const handleChangeColor = (e) => {
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].id == e.target.value) {
                return setColorId(colors[i])
            }
        }
        setColorId(e.target.value)
    }

    const handleChangeStyle = (e) => {
        for (let i = 0; i < styles.length; i++) {
            if (styles[i].id == e.target.value) {
                return setStyleId(styles[i])
            }
        }
        setStyleId(e.target.value)
    }

    const handleChangeWeather = (e) => {
        for (let i = 0; i < weathers.length; i++) {
            if (weathers[i].id == e.target.value) {
                return setWeatherId(weathers[i])
            }
        }
        setWeatherId(e.target.value)
    }

    const handleChangeClean = (e) => { }

    const changeItemsViewed = () => {
        const itemsViewed = originalCategoryItems;
        const itemsReturned = []
        for (let i = 0; i < itemsViewed.length; i++) {
            if (subCateId && itemsViewed[i].subCategoryId == subCateId) {
                itemsReturned.push(itemsViewed[i])
            } else if (colorId !== "- - Select One - -" && colorId.items.length !== 0) {
                for (let c = 0; c < colorId.items.length; c++) {
                    if (colorId.items[c].id === itemsViewed[i].id) {
                        itemsReturned.push(itemsViewed[i])
                    }
                }
            } else if (styleId !== "- - Select One - -" && styleId.items.length !== 0) {
                for (let s = 0; s < styleId.items.length; s++) {
                    if (styleId.items[s].id === itemsViewed[i].id) {
                        itemsReturned.push(itemsViewed[i])
                    }
                }
            } else if (weatherId !== "- - Select One - -" && weatherId.items.length !== 0) {
                for (let w = 0; w < weatherId.items.length; w++) {
                    if (weatherId.items[w].id === itemsViewed[i].id) {
                        itemsReturned.push(itemsViewed[i])
                    }
                }
            }
        }
        if ((subCateId === '- - Select One - -') &&
            (colorId === '- - Select One - -') &&
            (styleId === '- - Select One - -') &&
            (weatherId === '- - Select One - -')) {
            return setCategoryItems(originalCategoryItems)
        }
        return setCategoryItems(itemsReturned)
    }


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
                <form className="category-display_filters" >
                    <div>Filter Items</div>
                    <label>Sub-Category:</label>
                    <select id='Sub-Category' onChange={(e) => { setSubCateId(e.target.value) }}>
                        <option>- - Select One - -</option>
                        {subCate.map(subCat => (
                            <option value={subCat.id}>{subCat.subCategoryName}</option>
                        ))}
                    </select>
                    <label>Color:</label>
                    <select onChange={handleChangeColor}>
                        <option>- - Select One - -</option>
                        {colors.map(color => (
                            <option value={color.id}>{color.color}</option>
                        ))}
                    </select>
                    <label>Style:</label>
                    <select onChange={handleChangeStyle}>
                        <option>- - Select One - -</option>
                        {styles.map(style => (
                            <option value={style.id}>{style.styleType}</option>
                        ))}
                    </select>
                    <label>Weather:</label>
                    <select onChange={handleChangeWeather}>
                        <option>- - Select One - -</option>
                        {weathers.map(weather => (
                            <option value={weather.id}>{weather.weatherType}</option>
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
