import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "../../Modal/Modal";
import CategoryDisplay from "./CategoryDisplay";
import './CategoryDisplay.css';

const CategoryDisplayModal = () => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(true);

    const closeModal = () => {
        setShowModal(false);
        // history.push(`/closet/${closetOwner.id}`)
    }

    return (
        <div className="category-display-modal">
            {showModal && (
                <Modal onClose={closeModal}>
                    <CategoryDisplay />
                </Modal>
            )}
        </div>
    )
}

export default CategoryDisplayModal;
