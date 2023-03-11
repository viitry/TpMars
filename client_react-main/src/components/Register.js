import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        login: "",

        email: "",
        password: ""
    });
    const[error, setError] = useState();
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}
        });
    }

    async function onSubmit(e){
        e.preventDefault();
        const user = {...form};
        console.log(user);
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify(user);
        await axios.post("http://localhost:3002/user/register", body, config)
            .then(res => {
                console.log(res)
                localStorage.setItem("token", res.data.token);
                navigate("/");
            })
            .catch(err => setError(err.response.data.message));
    }

    return(   <div>
        <h3>Votre login :</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">login</label>
            <input
              type="text"
              className="form-control"
              id="login"
              value={form.login}
              onChange={(e) => updateForm({ login: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Mot de passe :</label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Créer son compte"
              className="mt-2 btn btn-primary"
            />
          </div>
        </form>
        {error!=null ? <p className="alert alert-danger">{error}</p> : <div></div>}
        
      </div>
   )
}