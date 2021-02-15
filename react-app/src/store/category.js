// =========== Initial State ==============
const initialState = {
    category: null,
    colors: null,
    weather: null,
    style: null
}

// =========== Action Types ==============

const CATEGORY_ITEMS = "category/CATEGORY_ITEMS";

// =========== POJO Actions ==============

const currentCategory = (categoryItems) => ({
    type: CATEGORY_ITEMS,
    categoryItems,
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
// =========== Reducers Function ==============

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_ITEMS:
            return {
                category: action.categoryItems
            }
        // case ALL_CATEGORY_ITEMS:
        //     return {
        //         items:
        //     }
        default:
            return state;
    }
}

export default categoryReducer;
