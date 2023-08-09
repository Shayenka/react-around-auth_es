import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import logo from "../images/logo.svg";

function Register() {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
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
                  <span className="popup__input-error" id="name-error"></span>
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
                  <span className="popup__input-error" id="about-error"></span>
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