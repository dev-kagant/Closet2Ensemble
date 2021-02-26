import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { itemDelete, itemModalClose } from '../../../store/category'
import './ItemDisplay.css'

const ItemDisplay = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const currentItem = useSelector(state => state.category.currentItem);
    let showItemModal = useSelector((state) => state.category.showItemModal)

    useEffect(() => {
        if (!currentItem) {
            return
        }
    })

    const handleShowImage = () => {
        return dispatch(itemModalClose())
    }

    const handleItemDeletion = async () => {
        return dispatch(itemDelete(currentItem.id))
    }

    return (
        <div className="item-display-main">
            <div>
                <div className="item-title">
                    {currentItem.description}
                </div>
                <button className="item-display_close-button" onClick={handleShowImage}><i class="fas fa-times"></i></button>
            </div>
            <div className="item-display_image">
                <img src={currentItem.image} alt="add image" height="85%" width="85%" />
            </div>
            <div className="item-display_facts">
                <div>
                    <p>Color: {currentItem.colors[0].color}</p>
                    <p>Style: {currentItem.styles[0].styleType}</p>
                    <p>Weather: {currentItem.weathers[0].weatherType}</p>
                    <p>Size: {currentItem.sizeId}</p>
                    <p>Purchased From: {currentItem.purchasedAt}</p>
                    <p>Purchased: {currentItem.datePurchased}</p>
                    <p>Last Worn: {currentItem.lastWorn}</p>
                </div>
                <div className="item-display_buttons">
                    <button onClick={handleItemDeletion}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDisplay;
