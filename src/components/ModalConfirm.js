
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../services/UserServices";
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleleUserFromModal } = props;


    const handleConfirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            toast.success("Delete user success !")
            handleClose();
            handleDeleleUserFromModal(dataUserDelete);
        }
        else {
            toast.error("Error delete user!")
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        This action can't be undone!
                        Do you want to delete this user?
                        <br />
                        <b>email = {dataUserDelete.email} ?</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;

