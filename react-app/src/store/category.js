// =========== Initial State ==============
const initialState = {
    category: null,
    colors: null,
    weather: null,
    styles: null,
    sizes: null,
    categories: null,
    subCategories: null,
    currentItem: null,
    showItemModal: false,
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
const SET_SHOW_ITEM_MODAL = "category/SET_SHOW_ITEM_MODAL"

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

const showItemModal = (view) => ({
    type: SET_SHOW_ITEM_MODAL,
    view
})
// =========== Thunk Actions ==============
export const setCurrentItem = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`)
    if (response.ok) {
        const item = await response.json()
        await dispatch(currentItem(item))
        await dispatch(showItemModal(true))
    }
}

export const itemModalClose = () => async (dispatch) => {
    await dispatch(showItemModal(false))
}

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
        return categoryItems.subCategories
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


// export const setPic = async (data) => {
//     const response = await fetch("/api/auth/test", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             data
//         }),
//     });
//     return await response.json();
// }


export const setImage = (file) => async (dispatch) => {

    const formData = new FormData();

    // for single file
    formData.append("image", file);

    const res = await fetch(`/api/auth/test`, {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        // dispatch(setProfilePic(data.file));
        return data;
    } else {
        console.log('error')
    }
};

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
        })
    })
    if (response.ok) {
        const newItem = await response.json()
        const res = await fetch('/api/items/add-to-item', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newItem,
                color,
                weather,
                style
            })
        })
        if (res.ok) {
            const theItem = await res.json()
            await dispatch(currentItem(theItem))
            await dispatch(showItemModal(true))
        }
    }
}

export const itemDelete = (itemId) => async (dispatch) => {
    const deleteItem = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
    })
    if (deleteItem.ok) {
        setCurrentItem(null)
        await dispatch(showItemModal(false))
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
        case SET_SHOW_ITEM_MODAL:
            return {
                ...state,
                showItemModal: action.view
            }
        default:
            return state;
    }
}

export default categoryReducer;
