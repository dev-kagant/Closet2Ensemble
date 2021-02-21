// =========== Initial State ==============
const initialState = {
    category: null,
    colors: null,
    weather: null,
    styles: null,
    sizes: null,
    categories: null,
    subCategories: null,
    currentItem: null
}

// =========== Action Types ==============

const CATEGORY_ITEMS = "category/CATEGORY_ITEMS";
const SET_COLORS = "category/SET_COLORS";
const SET_STYLES = "category/SET_STYLES";
const SET_WEATHER = "category/SET_WEATHER";
const SET_SUBCATEGORIES = "category/SET_SUBCATEGORIES";
const SET_CATEGORIES = "category/SET_CATEGORIES";
const SET_SIZES = "category/SET_SIZES";
const SET_CURRENT_ITEM = "category/SET_CURRENT_ITEM";

// =========== POJO Actions ==============

const currentCategory = (categoryItems) => ({
    type: CATEGORY_ITEMS,
    categoryItems,
})

const allSizes = (sizes) => ({
    type: SET_SIZES,
    sizes,
})

const allColors = (colors) => ({
    type: SET_COLORS,
    colors,
})

const allWeather = (weather) => ({
    type: SET_WEATHER,
    weather,
})

const allStyles = (styles) => ({
    type: SET_STYLES,
    styles,
})

const allSubCategories = (subCategories) => ({
    type: SET_SUBCATEGORIES,
    subCategories,
})

const allCategories = (categories) => ({
    type: SET_CATEGORIES,
    categories,
})

const currentItem = (item) => ({
    type: SET_CURRENT_ITEM,
    item,
});
// =========== Thunk Actions ==============
export const setCategory = (category) => async (dispatch) => {
    const response = await fetch(`/api/items/${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const categoryItems = await response.json()
        await dispatch(currentCategory(categoryItems))
    }
}

export const setColors = () => async (dispatch) => {
    const response = await fetch('/api/items/colors')
    if (response.ok) {
        const colors = await response.json()
        await dispatch(allColors(colors))
    }
}

export const setStyles = () => async (dispatch) => {
    const response = await fetch('/api/items/styles')
    if (response.ok) {
        const styles = await response.json()
        await dispatch(allStyles(styles))
    }
}

export const setWeather = () => async (dispatch) => {
    const response = await fetch('/api/items/weather')
    if (response.ok) {
        const weather = await response.json()
        await dispatch(allWeather(weather))
    }
}

export const setSizes = () => async (dispatch) => {
    const response = await fetch('/api/items/sizes')
    if (response.ok) {
        const sizes = await response.json()
        await dispatch(allSizes(sizes))
    }
}

export const setSubCategories = () => async (dispatch) => {
    const response = await fetch('/api/items/subCates')
    if (response.ok) {
        const subCategories = await response.json()
        await dispatch(allSubCategories(subCategories))
    }
}

export const setCategories = () => async (dispatch) => {
    const response = await fetch('/api/items/categories')
    if (response.ok) {
        const categories = await response.json()
        await dispatch(allCategories(categories))
    }
}

export const addItem = (itemInfo) => async (dispatch) => {
    const {
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
        style } = itemInfo
    console.log("IMAGEONE", image)
    const saveImage = await fetch("/api/upload/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image,

        })
    })
    let newImage;
    if (saveImage.ok) {
        newImage = await saveImage.json()
    }
    console.log("IMAGE", newImage.img_url)
    const response = await fetch('/api/items/add', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ownerId,
            description,
            subCategoryId: subCategory,
            image,
            sizeId: size,
            purchasedAt,
            clean: true,
            datePurchased,
            lastWorn,
            timesWorn,
            colorId: color,
            weatherId: weather,
            styleId: style,
        })
    })
    if (response.ok) {
        const newItem = await response.json()
        console.log("NEW ITEM", newItem)
        await dispatch(currentItem(newItem))
    }
}

// =========== Reducers Function ==============

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_ITEMS:
            return {
                ...state,
                category: action.categoryItems
            }
        case SET_SUBCATEGORIES:
            return {
                ...state,
                subCategories: action.subCategories
            }
        case SET_COLORS:
            return {
                ...state,
                colors: action.colors
            }
        case SET_STYLES:
            return {
                ...state,
                styles: action.styles
            }
        case SET_WEATHER:
            return {
                ...state,
                weather: action.weather
            }
        case SET_SIZES:
            return {
                ...state,
                sizes: action.sizes
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case SET_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.item
            }
        default:
            return state;
    }
}

export default categoryReducer;
