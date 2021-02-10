// =========== Initial State ==============
const initialState = {
    category: null
}

// =========== Action Types ==============

const CATEGORY_ITEMS = "category/CATEGORY_ITEMS";

// =========== POJO Actions ==============

const currentCategory = (categoryItems) => {
    return {
        type: CATEGORY_ITEMS,
        payload: categoryItems,
    };
};

// =========== Thunk Actions ==============
export const setCategory = (category) => async (dispatch) => {
    const response = await fetch(`/api/items/${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const categoryItems = response.json()
        dispatch(currentCategory(categoryItems))
    }
}
// =========== Reducers Function ==============

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_ITEMS:
            return {
                category: action.payload
            }
        default:
            return state;
    }
}
