import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
const DeleteBoard = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const del = () => {
        axios.delete('board/delete/' + props.id)
            .then(res => { window.location.reload() })
            .catch(err => { console.log(err) })
    }
    return (
        <>
            <button className="btn btn-danger" onClick={showModal} >Delete</button>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Delete Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={hideModal}>Cancel</button>
                    <button className="btn btn-danger" onClick={del}>Yes!</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteBoard;