import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './ItemDisplay.css'

const ItemDisplay = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    // const currentItem = useSelector(state => state.category.currentItem.item);

    useEffect(() => {
        // if (!currentItem) {
        //     return
        // }
    })

    return (
        <div>

        </div>
    )
}

export default ItemDisplay;
