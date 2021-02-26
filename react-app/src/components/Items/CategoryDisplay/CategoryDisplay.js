import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setCurrentItem } from "../../../store/category";
import ItemDisplay from "../ItemDisplayModal/ItemDisplay";
import { Modal } from "./../../Modal/Modal";
import $ from 'jquery';

import './CategoryDisplay.css'


const CategoryDisplay = () => {
    const dispatch = useDispatch();

    const closetOwner = useSelector(state => state.user.closetOwner);
    const sectionCategory = useSelector(state => state.category.category)
    let showItemModal = useSelector((state) => state.category.showItemModal)

    const [originalCategoryItems, setOriginalCategoryItems] = useState([])
    const [categoryItems, setCategoryItems] = useState(null)
    // const subCate = useSelector((state) => state.category.subCategories.subCates)
    const colors = useSelector((state) => state.category.colors.colors)
    const styles = useSelector((state) => state.category.styles.styles)
    const weathers = useSelector((state) => state.category.weather.weather)
    const [subCate, setSubCate] = useState([]);
    // const [colors, setColors] = useState([]);
    // const [styles, setStyles] = useState([]);
    // const [weathers, setWeathers] = useState([]);
    const [subCateId, setSubCateId] = useState("- - Select One - -");
    const [colorId, setColorId] = useState("- - Select One - -");
    const [styleId, setStyleId] = useState("- - Select One - -");
    const [weatherId, setWeatherId] = useState("- - Select One - -");

    const [errors, setErrors] = useState([]);
    // const [showItemModal, setShowItemModal] = useState(false)


    useEffect(() => {
        if (!sectionCategory) {
            return
        }
        setCategoryItems(allItems(sectionCategory.subCategories))
        setOriginalCategoryItems(allItems(sectionCategory.subCategories))
        setSubCate(sectionCategory.subCategories)
        // setSubCatItems(sectionCategory.subCategories.)

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

    const changeItemsViewed = async () => {
        let sendFilters = []
        if (colorId !== "- - Select One - -") {
            sendFilters.push(colorId.id)
        } else {
            sendFilters.push("")
        }
        if (styleId !== "- - Select One - -") {
            sendFilters.push(styleId.id)
        } else {
            sendFilters.push("")
        }
        if (weatherId !== "- - Select One - -") {
            sendFilters.push(weatherId.id)
        } else {
            sendFilters.push("")
        }
        const response = await fetch('/api/items/get-items', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                colorId: sendFilters[0],
                styleId: sendFilters[1],
                weatherId: sendFilters[2]
            })
        })
        if (response.ok) {
            const res = await response.json()
            let colorItems = res.color.items
            let styleItems = res.style.items
            let weatherItems = res.weather.items

            const itemsViewed = originalCategoryItems;
            const itemsReturned = []
            let newReturnedItems = []
            for (let i = 0; i < itemsViewed.length; i++) {
                if (subCateId !== "- - Select One - -" && itemsViewed[i].subCategoryId == subCateId) {
                    itemsReturned.push(itemsViewed[i])
                }
                if (colorId !== "- - Select One - -" && colorItems.length !== 0) {
                    for (let c = 0; c < colorItems.length; c++) {
                        if (colorItems[c].colors[0].id === itemsViewed[i].colors[0].id) {
                            itemsReturned.push(itemsViewed[i])
                        }
                    }
                }
                if (styleId !== "- - Select One - -" && styleItems.length !== 0) {
                    for (let s = 0; s < styleItems.length; s++) {
                        if (styleItems[s].styles[0].id === itemsViewed[i].styles[0].id) {
                            itemsReturned.push(itemsViewed[i])
                        }
                    }
                }
                if (weatherId !== "- - Select One - -" && weatherItems.length !== 0) {
                    for (let w = 0; w < weatherItems.length; w++) {
                        if (weatherItems[w].weathers[0].id === itemsViewed[i].weathers[0].id) {
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
    }

    // ========================== POSSIBLE FIX FOR FILTERING =========================================================
    // for (let r = 0; r < itemsReturned.length; r++) {
    //     if ((subCateId !== "- - Select One - -" && itemsReturned[r].subCategoryId === (subCateId)),
    //         (colorId !== "- - Select One - -" && itemsReturned[r].colors[0].id === (colorId)),
    //         (styleId !== "- - Select One - -" && itemsReturned[r].styles[0].id === (styleId)),
    //         (weatherId !== "- - Select One - -" && itemsReturned[r].weathers[0].id === (weatherId))
    //     ) {
    //         newReturnedItems.push(itemsReturned[r])
    //     }
    // }

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
