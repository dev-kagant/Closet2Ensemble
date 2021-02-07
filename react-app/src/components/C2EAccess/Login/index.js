import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "../../Modal/Modal";
import LoginForm from "./LoginForm";
import theDoor from '../../../images/theGreenestDoor.jpg';
import '../../Closet/Closet.css'

const LoginModal = () => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(true);

    // const closeModal = () => {
    //     setShowModal(false);
    //     history.push("/")
    // }

    return (
        <div className="closet-main">
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left3" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left2" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-left1" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right3" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right2" />
            </div>
            <div>
                <img alt="Closet Door" src={theDoor} className="closet-door-right1" />
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(true)}>
                    <LoginForm />
                </Modal>
            )}
        </div>
    )
}

export default LoginModal;
