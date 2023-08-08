import React, { useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const avatar = useRef(currentUser.avatar);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatar.current);
  }

  return (
    <PopupWithForm
      name="changeAvatar"
      title="Actualizar foto de perfil"
      submitButtonText="Guardar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="url"
          id="linkAvatar"
          name="link"
          placeholder="URL de la foto de perfil"
          className="popup__text"
          required
          onChange={(evt) => {
            avatar.current = evt.target.value;
          }}
        />
        <span className="popup__input-error" id="linkAvatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
