import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "../../Modal/Modal";
import LoginForm from "./LoginForm";
// import theDoor from '../../../images/theGreenestDoor.jpg';
import '../../Closet/Closet.css'

const LoginModal = () => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(true);

    // const closeModal = () => {
    //     setShowModal(false);
    //     history.push("/")
    // }

    return (
        <div>
            {showModal && (
                <Modal onClose={() => setShowModal(true)}>
                    <LoginForm />
                </Modal>
            )}
        </div>
    )
}

export default LoginModal;
