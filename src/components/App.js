import "../index.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Header from "../components/Header";
import Register from "../components/Register";
import Login from "../components/Login";
import Main from "../components/Main";
import Footer from "../components/Footer";
import EditProfilePopup from "../components/EditProfilePopup.js";
import EditAvatarPopup from "../components/EditAvatarPopup.js";
import AddPlacePopup from "../components/AddPlacePopup.js";
import ImagePopup from "../components/ImagePopup.js";
import Api from "../utils/api.js";
import { registerUser, checkTokenValidity } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState();

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkTokenValidity(token)
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData.data); // Guardando los datos del usuario
        })
        .catch((error) => {
          console.error("Error de token:", error);
        });
    } else {
      setLoggedIn(false); // Aquí, si no hay token, el usuario no está autenticado
    }
  }, [loggedIn]);

  useEffect(() => {
    const api = new Api({
      address: "https://nomoreparties.co",
      groupId: "web_es_05",
      token: "3270d03d-8b4c-49a2-869b-f096d27af6a5",
    });
    api
      .getUserInfo()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        console.log("Error al obtener los datos del usuario:", error);
      });
  }, []);

  useEffect(() => {
    const api = new Api({
      address: "https://nomoreparties.co",
      groupId: "web_es_05",
      token: "3270d03d-8b4c-49a2-869b-f096d27af6a5",
    });

    api.getCards()
      .then((response) => {
        setCards(response);
      })
      .catch((error) => {
        console.log("Error al obtener los datos de las tarjetas:", error);
      });
  }, []);

  function handleUpdateUser(user) {
    Api.editUserInfo(user.name, user.about).then((response) => {
      setCurrentUser(response);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(avatar) {
    const userAvatar = { avatar: avatar };
    Api.changeAvatarProfile(userAvatar).then((response) => {
      setCurrentUser(response);
      closeAllPopups();
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id).then(() => {
      setCards(
        cards.filter((item) => {
          return item._id !== card._id;
        })
      );
    });
  }

  function handleAddPlaceSubmit(name, link) {
    Api.addNewCard(name, link).then((data) => {
      setCards([data, ...cards]);
      closeAllPopups();
    });
  }

  function handleCardClick(cardInfo) {
    setSelectedCard(cardInfo);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  async function handleRegisterUser(email, password) {
    try {
      const response = await registerUser(email, password);
      return response;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error; 
    }
  }

  function handleLogin(data) {
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          {loggedIn ? <Header onLogout={handleLogout} /> : null}
          <Routes>
            <Route
              path="/signin"
              element={<Login onLoggedIn={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegisterUser} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Routes>
          {isEditProfilePopupOpen && (
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {isEditAvatarPopupOpen && (
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
          )}

          {isAddPlacePopupOpen && (
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
          )}
          {selectedCard && (
            <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
          )}

          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
