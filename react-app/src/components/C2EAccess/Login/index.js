import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "../../Modal/Modal";
import LoginForm from "./LoginForm";

const LoginModal = () => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(true);

    // const closeModal = () => {
    //     setShowModal(false);
    //     history.push("/")
    // }

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(true)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}

export default LoginModal;