import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(placeName, placeLink);
  }

  function onNameChange(evt) {
    setPlaceName(evt.target.value);
  }
  function onLinkChange(evt) {
    setPlaceLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="addCard"
      title="Nuevo lugar"
      submitButtonText="Crear"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          id="titulo"
          name="name"
          placeholder="Titulo"
          className="popup__text"
          required
          minLength="2"
          maxLength="30"
          onChange={onNameChange}
        />
        <span className="popup__input-error" id="titulo-error"></span>
        <input
          type="url"
          id="enlace"
          name="link"
          placeholder="URL de la imagen"
          className="popup__text"
          required
          onChange={onLinkChange}
        />
        <span className="popup__input-error" id="enlace-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
