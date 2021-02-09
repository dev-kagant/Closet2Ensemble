import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "../../Modal/Modal";
import ItemDisplay from "./ItemDisplay";
import './ItemDisplay.css';

const ItemDisplayModal = () => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(true);

    const closeModal = () => {
        setShowModal(false);
        history.push(`/closet/${closetOwner.id}/category`)
    }

    return (
        <div className="item-display-modal">
            {showModal && (
                <Modal onClose={closeModal}>
                    <ItemDisplay />
                </Modal>
            )}
        </div>
    )
}

export default ItemDisplayModal;
