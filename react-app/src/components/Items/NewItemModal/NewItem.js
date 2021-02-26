import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import $ from 'jquery';
import { Modal } from "./../../Modal/Modal";
import ItemDisplay from "../ItemDisplayModal/ItemDisplay"
import { addItem } from "../../../store/category";
import theClothes from "../../../images/clothesCollage.jpg"
import ItemsNav from "./ItemsNav"

import './NewItem.css'


const NewItems = () => {
    const dispatch = useDispatch();

    const ownerId = useSelector(state => state.user.closetOwner.id);
    const [showNewItems, setShowNewItems] = useState(true)
    const [description, setDescription] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [image, setImage] = useState(theClothes)
    const [file, setFile] = useState('')
    const [size, setSize] = useState(null)
    const [purchasedAt, setPurchasedAt] = useState("")
    const [datePurchased, setDatePurchased] = useState("")
    const [lastWorn, setLastWorn] = useState("")
    const [timesWorn, setTimesWorn] = useState(0)
    const [color, setColor] = useState(null)
    const [style, setStyle] = useState(null)
    const [weather, setWeather] = useState(null)
    const [category, setCategory] = useState(null);
    const [currentItem, setCurrentItem] = useState(null)
    const [errors, setErrors] = useState([]);
    const sizes = useSelector((state) => state.category.sizes.sizes)
    const subCates = useSelector((state) => state.category.subCategories.subCates)
    const categories = useSelector((state) => state.category.categories.categories)
    const colors = useSelector((state) => state.category.colors.colors)
    const styles = useSelector((state) => state.category.styles.styles)
    const weathers = useSelector((state) => state.category.weather.weather)

    const [showAddColorModal, setShowAddColorModal] = useState(false)
    const [showAddStyleModal, setShowAddStyleModal] = useState(false)
    const [showAddWeatherModal, setShowAddWeatherModal] = useState(false)
    const [showItemModal, setShowItemModal] = useState(false)


    useEffect(() => {
        // setStateFilters()
        if (!subCates && !colors && !styles && !weathers && !categories) {
            return
        }
    }, [])


    const addNewColor = async (e) => {
        e.preventDefault()
        if (!showAddColorModal) {
            return setShowAddColorModal(true)
        }
        const response = await fetch('/api/items/add-color', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                color
            })
        })
        if (response.ok) {
            let newColor = await response.json()
            console.log("THE COLOR", newColor)
            await setColor(newColor.color)
            setShowAddColorModal(false)
        }
    }

    const addNewStyle = async (e) => {
        e.preventDefault()
        if (!showAddStyleModal) {
            return setShowAddStyleModal(true)
        }
        const response = await fetch('/api/items/add-style', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                styleType: style
            })
        })
        if (response.ok) {
            let newStyle = await response.json()
            console.log("THE STYLE", newStyle)
            await setStyle(newStyle.styleType)
            setShowAddStyleModal(false)
        }
    }

    const addNewWeather = async (e) => {
        e.preventDefault()
        if (!showAddWeatherModal) {
            return setShowAddWeatherModal(true)
        }
        const response = await fetch('/api/items/add-weather', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                weatherType: weather
            })
        })
        if (response.ok) {
            let newWeather = await response.json()
            await setWeather(newWeather.weatherType)
            console.log("THE WEATHER", weather)
            setShowAddWeatherModal(false)
        }
    }

    const turnOnItems = () => {
        setShowNewItems(true)
    }
    const turnOnStaples = () => {
        setShowNewItems(false)
    }

    const readUrl = async (input) => {
        console.log("OKOKOK", input)
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imagePreview')
                    .attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }


    // ============= THE MESS THAT IS AWS =========================

    // const uploadImage = async (e) => {
    //     e.preventDefault()
    //     // let result = await readUrl(image)
    //     console.log("Something to pass the time", e.target[0].files[0])
    //     setImage(e.target[0].value)
    //     const res = await fetch("/api/upload/new", {
    //         method: "POST",
    //         // headers: {
    //         //     // 'Content-Type': 'multipart/form-data'
    //         //     'Content-Type': 'application/json'
    //         // },
    //         // body: e.target[0].value
    //         body: JSON.stringify({
    //             file: e.target[0].files[0],
    //             filename: e.target[0].files[0].name
    //         })
    //     })
    //     if (res.ok) {
    //         const thisPhoto = await res.json()
    //         console.log("NEW STUFF", thisPhoto)
    //         const photo = await fetch(`/api/upload/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ photo: thisPhoto })
    //         })
    //         if (photo.ok) {
    //             console.log("THE RESPONSE", photo)
    //             const showPhoto = await photo.json()
    //             console.log("THIS", showPhoto.filename)
    //             setImage(showPhoto)
    //         }
    //     }
    // }

    // if (image.files && image.files[0]) {

    // var reader = new FileReader();
    // reader.onload = function (evt) {
    //     console.log(evt.target.result);
    // };
    // reader.onload = function (e) {
    //     $(result = e.target.result);
    //     console.log("Something is here", result)
    // };
    // if (file.name == null) {
    //     setErrors(["Choose a file"]);
    //     return;
    // }

    // console.log("KEEP", res)
    // if (res.ok)
    // if (res.data.postUrl) {
    //     setErrors([]);
    //     window.fetch(res.data.postUrl,
    //         {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": file.type,
    //             },
    //             body: file,
    //         }
    //     ).then(() => {
    //         setFile(null);
    //         setImage(res.data.getUrl);
    //     })
    // }
    // else if (res.data.error) {
    //     setErrors([res.data.error]);
    // }


    // }
    // ===================== WHERE DOES IT END =======================================


    const handleNewItem = (e) => {
        e.preventDefault()
        // console.log("The Stuff", ownerId, description, subCategory,
        //     image, size, purchasedAt, datePurchased, lastWorn,
        //     timesWorn, color, weather, style)
        setErrors([]);
        return dispatch(addItem({
            ownerId,
            description,
            subCategory,
            image,
            size,
            purchasedAt,
            datePurchased,
            lastWorn,
            timesWorn,
            color,
            weather,
            style,
        })).then(() => setShowItemModal(true))
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            })
    }

    // console.log("COLORS", size)

    return (
        <div className="new-items-main">
            <div className="new-items-switch">
                <div className="itmes-adding" onClick={turnOnItems}>Add New Items</div>
                <div className="staples-management" onClick={turnOnStaples}>Add Some Staples</div>
            </div>
            {showAddColorModal && (
                <Modal onClose={() => setShowAddColorModal(false)}>
                    <form className="add-color-modal" onSubmit={addNewColor}>
                        <label>Add a color</label>
                        <input
                            className="song-edit_input-box"
                            type="text"
                            onChange={(e) => setColor(e.target.value)}
                            required
                        />
                        <button>Add</button>
                    </form>
                </Modal>
            )}
            {showAddStyleModal && (
                <Modal onClose={() => setShowAddStyleModal(false)}>
                    <form className="add-color-modal" onSubmit={addNewStyle}>
                        <label>Add a style</label>
                        <input
                            className=""
                            type="text"
                            onChange={(e) => setStyle(e.target.value)}
                            required
                        />
                        <button>Add</button>
                    </form>
                </Modal>
            )}
            {showAddWeatherModal && (
                <Modal onClose={() => setShowAddWeatherModal(false)}>
                    <form className="add-color-modal" onSubmit={addNewWeather}>
                        <label>Add weather</label>
                        <input
                            className=""
                            type="text"
                            onChange={(e) => setWeather(e.target.value)}
                            required
                        />
                        <button>Add</button>
                    </form>
                </Modal>
            )}
            {(showNewItems) ? (
                <div className="new-item-body">
                    {showItemModal && (
                        <Modal onClose={() => setShowItemModal(false)}>
                            <ItemDisplay />
                        </Modal>
                    )}
                    <form onSubmit={handleNewItem}>
                        {/* <form> */}
                        <div className="new-item-title">
                            <h1>New to the Closet</h1>
                            <button type="submit">Add Item</button>
                        </div>
                        <div className="new-item-form">
                            {/* <div className="new-item-form" onSubmit={handleNewItem}> */}
                            <div className="image-description">
                                <div className="image-box"><img id="imagePreview" src={image} width="100%" height="100%" /></div>
                                {/* <form enctype="multipart/form-data" className="add-item_form">
                                <div className="image-box"></div>
                                    <form action="/api/upload/new" method="post" className="add-item_form">
                                    <label className="add-item_label">Image</label>
                                    <input
                                        type="file"
                                        name="file"
                                    enctype="multipart/form-data"
                                    accept=".png,.jpg,.jpeg"
                                        onChange={(e) => {  uploadImage(e.target);setFile(e.target.files[0]) }}
                                    onChange={(e) => { readUrl(e.target); setFile(e.target.files[0]) }}
                                    />
                                    <button type="submit" name="submit">Upload</button>
                                </form> */}
                                <div className="add-item_form item-description">
                                    <label className="add-item_label">Description</label>
                                    <textarea
                                        className=""
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="new-item-info">
                                <div className="new-item_columnOne">
                                    <div className="stack-label">
                                        <label>Categorey</label>
                                        <select onChange={(e) => setSubCategory(e.target.value)}>
                                            {categories.map(category => (
                                                <optgroup label={category.categoryName}>
                                                    {category.subCategories.map(subCate => (
                                                        <option value={subCate.id}>{subCate.subCategoryName}</option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="purchased-from">
                                        <label>Purchased From </label>
                                        <input
                                            type="text"
                                            onChange={(e) => setPurchasedAt(e.target.value)}
                                            value={purchasedAt}
                                        />
                                    </div>
                                    <div className="stack-label">
                                        <label>Times Worn </label>
                                        <input
                                            type="number"
                                            onChange={(e) => setTimesWorn(e.target.value)}
                                            value={timesWorn}
                                        />
                                    </div>
                                </div>
                                <div className="new-item_columnTwo">
                                    <div className="stack-label">
                                        <label>Size </label>
                                        <select onChange={(e) => setSize(e.target.value)}>
                                            <option>{size ? size : "- - Select One - -"}</option>
                                            {sizes.map(size => (
                                                <option value={size.id}>{size.sizeDescription}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label>Date Purchased </label>
                                        <input
                                            type="date"
                                            onChange={(e) => setDatePurchased(e.target.value)}
                                            value={datePurchased}
                                        />
                                    </div>
                                    <div className="stack-label">
                                        <label>Last Worn </label>
                                        <input
                                            type="date"
                                            onChange={(e) => setLastWorn(e.target.value)}
                                            value={lastWorn}
                                        />
                                    </div>
                                </div>
                                <div className="new-item_columnThree">
                                    <div className="stack-label">
                                        <label>Color </label>
                                        <select onChange={(e) => setColor(e.target.value)}>
                                            <option>{color ? color : "- - Select One - -"}</option>
                                            {colors.map(color => (
                                                <option value={color.id}>{color.color}</option>
                                            ))}
                                        </select>
                                        <Link onClick={addNewColor}>Add</Link>
                                    </div>
                                    <div className="stack-label">
                                        <label>Style </label>
                                        <select onChange={(e) => setStyle(e.target.value)}>
                                            <option>{style ? style : "- - Select One - -"}</option>
                                            {styles.map(aStyle => (
                                                <option value={aStyle.id}>{aStyle.styleType}</option>
                                            ))}
                                        </select>
                                        <Link onClick={addNewStyle}>Add</Link>
                                    </div>
                                    <div className="stack-label">
                                        <label>Weather </label>
                                        <select onChange={(e) => setWeather(e.target.value)}>
                                            <option>{weather ? weather : "- - Select One - -"}</option>
                                            {weathers.map(weather => (
                                                <option value={weather.id}>{weather.weatherType}</option>
                                            ))}
                                        </select>
                                        <Link onClick={addNewWeather}>Add</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                            <label>Category </label>
                            <select >
                                <option>{style ? style : "- - Select One - -"}</option>
                                {styles.map(aStyle => (
                                    <option value={aStyle.id}>{aStyle.styleType}</option>
                                ))}
                            </select>
                            <Link onClick={addStyle}>Add</Link>
                        </div> */}
                            {/* <div className="add-item_form">
                            <label className="add-item_label">Description</label>
                            <input
                                className=""
                                value={format(new Date(release_date), "yyyy-MM-dd")}
                                onChange={(e) => setRelease_date(e.target.value)}
                                type="date"
                            />
                        </div> */}
                        </div>
                    </form>
                </div>
            ) : (<div></div>)
            }
        </div >
    )
}

export default NewItems;
