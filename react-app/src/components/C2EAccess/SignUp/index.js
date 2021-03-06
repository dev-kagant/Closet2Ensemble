import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "../../Modal/Modal";
import SignUpForm from "./SignUpForm";

const SignUpModal = () => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(true);

    const closeModal = () => {
        setShowModal(false);
        history.push("/")
    }

    return (
        <>
            {showModal && (
                // <Modal onClose={() => setShowModal(false)}>
                <Modal onClose={closeModal}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    )
}

export default SignUpModal;
