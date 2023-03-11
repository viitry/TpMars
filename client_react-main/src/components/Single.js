import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Article() {
    const [article, setArticle] = useState();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const params = useParams();
    const url = "http://localhost:3002/article/" + params.id;

    useEffect(() => {
        axios.get(url)
        .then(response => {
            console.log(response);
            setArticle(response.data.result);
            setLoaded(true);
        })
        .catch(error =>{
            console.error(error);
            setError(error.status);
            setLoaded(true);
        })

    }, [url]);

    if(!loaded) {
        return(
            <h1>En cours de chargement...</h1>
        )
    } else if(error) {
        return(
            <h1>Erreur {error}</h1>
        )
    } else {
        return(
            <div className="text-center">
                <h1>{article.titre}</h1>
                <p>{article.contenu}</p>
                <p>écrit par {article.loginAuthor}, publié le {new Date(article.createdAt).toLocaleDateString()}</p>
                <a href="/">Retour à l'accueil</a>
            </div>
        )
    }
}