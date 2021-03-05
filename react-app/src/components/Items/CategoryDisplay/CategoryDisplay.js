import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setCurrentItem } from "../../../store/category";
import ItemDisplay from "../ItemDisplayModal/ItemDisplay";
import { Modal } from "./../../Modal/Modal";
import $ from 'jquery';

import './CategoryDisplay.css'


const CategoryDisplay = (items) => {
    const dispatch = useDispatch();
    const closetOwner = useSelector(state => state.user.closetOwner);
    const sectionCategory = useSelector(state => state.category.category)
    let showItemModal = useSelector((state) => state.category.showItemModal)

    const originalCategoryItems = items.categoryItems
    const [categoryItems, setCategoryItems] = useState(items.categoryItems)
    const [subCate, setSubCate] = useState(items.subCates);
    const [colors, setColors] = useState([]);
    const [styles, setStyles] = useState([]);
    const [weathers, setWeathers] = useState([]);

    const [subCat, setSubCat] = useState("- - Select One - -");
    const [color, setColor] = useState("- - Select One - -");
    const [style, setStyle] = useState("- - Select One - -");
    const [weather, setWeather] = useState("- - Select One - -");

    const [errors, setErrors] = useState([]);


    useEffect(() => {
        setFilters()
        if (!colors || !styles || !weathers) {
            return
        }
    }, []);

    useEffect(() => {
        if (!categoryItems) {
            return
        }
        changeItemsViewed()
    }, [subCat, color, style, weather])

    const setFilters = () => {
        setColors([])
        setStyles([])
        setWeathers([])
        let cateColors = new Set()
        let cateStyles = new Set()
        let cateWeathers = new Set()
        for (let i = 0; i < originalCategoryItems.length; i++) {
            originalCategoryItems[i].colors.forEach((color) => {
                cateColors.add(color.color)                  //if id's needed come back here
            })
            originalCategoryItems[i].styles.forEach((style) => {
                cateStyles.add(style.styleType)
            })
            originalCategoryItems[i].weathers.forEach((weather) => {
                cateWeathers.add(weather.weatherType)
            })
        }
        setColors([...cateColors])
        setStyles([...cateStyles])
        setWeathers([...cateWeathers])
    }


    const handleChangeClean = (e) => { }


    const changeItemsViewed = () => {
        const newItemsViewed = new Set()
        for (let i = 0; i < originalCategoryItems.length; i++) {
            for (let c = 0; c < originalCategoryItems[i].colors.length; c++) {
                if (color === "- - Select One - -" || originalCategoryItems[i].colors[c].color === color) {
                    for (let s = 0; s < originalCategoryItems[i].styles.length; s++) {
                        if (style === "- - Select One - -" || originalCategoryItems[i].styles[s].styleType === style) {
                            for (let w = 0; w < originalCategoryItems[i].weathers.length; w++) {
                                if (weather === "- - Select One - -" || originalCategoryItems[i].weathers[w].weatherType === weather) {
                                    if (subCat === "- - Select One - -" || Number(subCat) === originalCategoryItems[i].subCategoryId) {
                                        newItemsViewed.add(originalCategoryItems[i])
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return setCategoryItems([...newItemsViewed])
    }


    const handleItemView = (e) => {
        e.preventDefault()
        setErrors([]);
        return dispatch(setCurrentItem(e.target.title))
            .then(() => showItemModal = true)
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            })
    }

    const handleItemDisplayClose = () => {
        showItemModal = false
    }



    return (
        <div className="category-display-modal">
            {showItemModal && (
                <div id='close-modal' >
                    <Modal onClose={handleItemDisplayClose}>
                        <ItemDisplay />
                    </Modal>
                </div>
            )}
            <h1 className="category-display_header">{sectionCategory.categoryName.toLowerCase()}</h1>
            <div className="category-display_body">
                <div >
                    <ul className="category-display_items">
                        {categoryItems && categoryItems.map(item => (
                            <li className="item-icon" onClick={handleItemView}>
                                <img id="item-image-sizing" src={item.image} alt={item.description} title={item.id} height="100%" width="100%" />
                            </li>
                        ))}
                    </ul>
                </div >
                <form className="category-display_filters" >
                    <div>Filter Items</div>
                    <label>Sub-Category:</label>
                    <select id='Sub-Category' onChange={(e) => setSubCat(e.target.value)}>
                        <option>- - Select One - -</option>
                        {subCate.map(subCat => (
                            <option value={subCat.id}>{subCat.subCategoryName}</option>
                        ))}
                    </select>
                    <label>Color:</label>
                    <select onChange={(e) => setColor(e.target.value)}>
                        {/* <select onClick={(e) => { setColor(e.target.value) }} onChange={changeItemsViewed}> */}
                        <option>- - Select One - -</option>
                        {colors.map(oneColor => (
                            <option value={oneColor}>{oneColor}</option>
                        ))}
                    </select>
                    <label>Style:</label>
                    <select onChange={(e) => setStyle(e.target.value)}>
                        <option>- - Select One - -</option>
                        {styles.map(style => (
                            <option value={style}>{style}</option>
                        ))}
                    </select>
                    <label>Weather:</label>
                    <select onChange={(e) => setWeather(e.target.value)}>
                        <option>- - Select One - -</option>
                        {weathers.map(weather => (
                            <option value={weather}>{weather}</option>
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
