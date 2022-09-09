import './AddGenre.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import axios from 'axios';

const AddGenre = () => {
    const [newGenre, setNewGenre] = useState({
        genre: '',
    });

    const genreList = ['Jazz', 'Rock&Metal', 'Classical', 'Electronic', 'Pop'];

    // Modal State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddGenre = (e) => {
        e.preventDefault();
        axios
            .post('/genres/create', newGenre)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        window.location.reload();
    };

    const handleSelectGenre = (e) => {
        setNewGenre({
            ...newGenre,
            genre: e,
        });
        console.log(newGenre);
    };


    return (
        <div className="add-genre-card">
            <h3>Add New</h3>
            <Button variant="dark" onClick={() => handleShow()}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Genre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownButton
                        variant="info"
                        title={
                            newGenre.genre
                                ? newGenre.genre
                                : 'Select genre'
                        }
                        id="dropdown-menu-align-right"
                        onSelect={handleSelectGenre}
                    >
                    {genreList.map(e => <Dropdown.Item eventKey={e} key={e}>{e}</Dropdown.Item>)}
                    </DropdownButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={handleAddGenre}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddGenre;
