import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import {ValidateEmail, ValidatePassword}  from "../utils/Validator.js";
import logo from "../images/logo.svg";

function Register() {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setEmail(currentUser.email);
    setPassword(currentUser.password);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    // onUpdateRegiste({ //LLAMAR DESDE APP.JS CON CONFICIÓN QUE HACE EL LLAMDO A LA API PARA ACTUALIZAR INFO
    //   email,
    //   password,
    // });
  }

  function handleEmailChange(evt) {
    const newEmail = evt.target.value;
    setEmail(newEmail);
    const error = ValidateEmail(newEmail);
    setEmailError(error);
  }

  function handlePasswordChange(evt) {
    const newPassword = evt.target.value;
    setPassword(newPassword);
    const error = ValidatePassword(newPassword);
    setPasswordError(error);
  }

return (
    <><section className="header">
          <img className="header__logo" src={logo} alt="logo Around The U.S" />
          <div className="header__container-texts">
          <Link to="/signint" className="header__text" style={{ textDecoration: "none" }}>Iniciar Sesión</Link>
          </div>
      </section>
      <section className={`container__main`}>
              <h3 className="container__main__title">Regístrate</h3>
              <div>
                  <input
                      type="text"
                      id="email"
                      placeholder="Correo electrónico"
                      className="container__main__text"
                      required
                      minLength="2"
                      maxLength="40"
                      value={email || ""}
                      onChange={handleEmailChange} />
                  <span className="popup__input-error" id="email-error">{emailError}</span>
                  <input
                      type="text"
                      id="password"
                      placeholder="Contraseña"
                      className="container__main__text"
                      required
                      minLength="2"
                      maxLength="200"
                      value={password || ""}
                      onChange={handlePasswordChange} />
                  <span className="popup__input-error" id="password-error">{passwordError}</span>
              </div>
              <button
                  type="submit"
                  className="container__main__button"
                  onClick={handleSubmit}
              >Regístrate
              </button>
              <div className="container__main__footer">
              <h4 className="container__main__text-footer">¿Ya eres miembro?</h4><Link to="/signint" className="container__main__text-footer_link" style={{ textDecoration: "none"}}>
          Inicia sesión aquí
        </Link>
        </div>
          </section></>
  );
}

export default Register;