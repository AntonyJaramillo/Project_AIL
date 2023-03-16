import "../css/Word.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { updateWord, deleteWord } from "../../firebase-crud";

export const Word = ({ word, mean, wordID }) => {
  const initialState = {
    word: word,
    mean: mean,
  };

  const [newWord, setNewWord] = useState(initialState);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = ({ target: { name, value } }) => {
    return setNewWord({ ...newWord, [name]: value });
  };

  const onDeleteLink = async (idx) => {
    await deleteWord(idx);
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateWord(wordID, newWord);
    setShow(false);
    setNewWord(initialState);
  };
  return (
    <div className="word-box">
      <div className="word-container">
        <span className="word-new">{word}</span>
        <span>|</span>
        <span className="word-mean">{mean}</span>
        <div className="word-actions">
          <img src={require('../../img/voice.png')} alt="Voice word option" />
          <button onClick={handleShow}>
            <img src={require('../../img/edit.png')} alt="Edit word option" />
          </button>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <label htmlFor="word">Word:</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New word"
                  value={newWord.word}
                  name="word"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <label htmlFor="mean">Word mean:</label>
              <div className="input-group">
                <input
                  type="text"
                  value={newWord.mean}
                  name="mean"
                  placeholder="Word mean"
                  className="form-control mb-3"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteLink(wordID);
                }}
              >
                Delete
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
};
