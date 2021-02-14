import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import './CategoryDisplay.css'


const CategoryDisplay = () => {
    const dispatch = useDispatch();
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
    const [subCateId, setSubCateId] = useState("-- Select One --");
    const [colorId, setColorId] = useState("-- Select One --");
    const [styleId, setStyleId] = useState(null);
    const [weatherId, setWeatherId] = useState(null);

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!sectionCategory) {
            return
        }
        setSubCate(sectionCategory.subCategories)
        getColors()
        // setSubCateId(getIds(sectionCategory.subCategories))
        getStyles()
        getWeather()
        setOriginalCategoryItems(allItems(sectionCategory.subCategories))
        setCategoryItems(allItems(sectionCategory.subCategories))
    }, []);

    console.log("STYLINGS", styles)

    useEffect(() => {
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
        console.log("WE IN COLORS")
        const response = await fetch("/api/items/colors")
        if (response.ok) {
            const theColors = await response.json()
            return setColors(theColors.colors)
        }
    }
    const getStyles = async () => {
        console.log("WE IN COLORS")
        const response = await fetch("/api/items/styles")
        if (response.ok) {
            const theStyles = await response.json()
            return setStyles(theStyles.styles)
        }
    }
    const getWeather = async () => {
        console.log("WE IN COLORS")
        const response = await fetch("/api/items/weather")
        if (response.ok) {
            const theWeather = await response.json()
            console.log("WE GOT STYLES", theWeather)
            return setWeathers(theWeather.weather)
        }
    }

    // const getIds = (filters) => {
    //     let allIds = [];
    //     for (let i = 0; i < filters.length; i++) {
    //         allIds.push(filters[i].id)
    //     }
    //     return allIds
    // }

    // const handleChangeSubCate = (e) => {
    //     setErrors([]);
    //     return dispatch(setSubCateId(e.target.value))
    //         .then((res) => subCateId)
    //         .then(() => changeItemsViewed())
    //         .catch((res) => {
    //             if (res.data && res.data.errors) setErrors(res.data.errors);
    //         })
    //     // console.log("Maybe", subCateId)
    //     // console.log("Okay", e.target.value)
    //     // changeItemsViewed(e.target.value, colorId, styleId, weatherId)
    // }
    // console.log("Checking", subCateId)
    // const handleChangeColor = (e) => {
    //     // changeItemsViewed(_, e.target.value)
    // }
    // const handleChangeStyle = (e) => {
    //     // changeItemsViewed(_, _, e.target.value)
    // }
    // const handleChangeWeather = (e) => {
    //     // changeItemsViewed(_, _, _, e.target.value)
    // }
    const handleChangeClean = (e) => { }

    // const changeItemsViewed = (subCateId, colors, weather, style) => {

    const changeItemsViewed = () => {
        const itemsViewed = originalCategoryItems;
        const itemsReturned = []
        for (let i = 0; i < itemsViewed.length; i++) {
            if (subCateId && itemsViewed[i].subCategoryId == subCateId) {
                itemsReturned.push(itemsViewed[i])
            } else if (colorId && itemsViewed[i].colorId == colorId) {
                itemsReturned.push(itemsViewed[i])
            } else if (styleId && itemsViewed[i].styleId == styleId) {
                itemsReturned.push(itemsViewed[i])
            } else if (weatherId && itemsViewed[i].weatherId == weatherId) {
                itemsReturned.push(itemsViewed[i])
            }
        }
        if ((subCateId === '- - Select One - -') && (colorId === '- - Select One - -')) {
            return setCategoryItems(originalCategoryItems)
        }
        // return setCategoryItems(itemsReturned)
    }


    console.log("SOME ITEMS", categoryItems)

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
                    <select id='Sub-Category' onChange={(e) => setSubCateId(e.target.value)}>
                        <option>- - Select One - -</option>
                        {subCate.map(subCat => (
                            <option value={subCat.id}>{subCat.subCategoryName}</option>
                        ))}
                    </select>
                    <label>Color:</label>
                    <select onChange={(e) => setColorId(e.target.value)}>
                        <option>- - Select One - -</option>
                        {colors.map(color => (
                            <option value={color.id}>{color.color}</option>
                        ))}
                    </select>
                    <label>Style:</label>
                    <select onChange={(e) => setStyleId(e.target.value)}>
                        <option>- - Select One - -</option>
                        {styles.map(style => (
                            <option value={style.id}>{style.styleType}</option>
                        ))}
                    </select>
                    <label>Weather:</label>
                    <select onChange={(e) => setWeatherId(e.target.value)}>
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
