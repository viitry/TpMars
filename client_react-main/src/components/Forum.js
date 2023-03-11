import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Forum() {
  const [isLoggedIn] = useState(localStorage.getItem("token") !== null);

  const [form, setForm] = useState({
    titre: "",
    contenu: ""
  });
  const [error, setError] = useState();
  const navigate = useNavigate();
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("Veuillez vous connecter pour publier un message.");
      return;
    }
    const post = { ...form };
    console.log(post);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    };
    const body = JSON.stringify(post);
    await axios.post("http://localhost:3002/article/new", body, config)
      .then(res => {
        console.log(res)
        navigate("/");
      })
      .catch(err => setError(err.response.data.message));
  }

  return (
    <div>
      <h3>Créer un nouveau post :</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="titre">Titre</label>
          <input
            type="text"
            className="form-control"
            id="titre"
            value={form.titre}
            onChange={(e) => updateForm({ titre: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contenu">Contenu</label>
          <textarea
            className="form-control"
            id="contenu"
            value={form.contenu}
            onChange={(e) => updateForm({ contenu: e.target.value })}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Envoyer"
            className="mt-2 btn btn-primary"
          />
        </div>
      </form>
      {error != null ? <p className="alert alert-danger">{error}</p> : null}
      {!isLoggedIn ? (
        <p className="alert alert-danger">Veuillez vous connecter pour publier un message.</p> ) : null}
    </div>
  )
}
