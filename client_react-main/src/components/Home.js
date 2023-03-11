import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [articlesList, setArticlesList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const url = "http://localhost:3002/article/all"

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data.result);
                setArticlesList(res.data.result);
                setLoaded(true);
            })
            .catch(err => {
                setError(err);
                setLoaded(true);
            })
        },[]
    );

    if(!loaded){
        return (
            <div>
                <h1>En cours de chargement...</h1>
            </div>
        );
    }
    if(error){
        return(
            <div>
                <h1>Error {error.status} : {error.message}</h1>
            </div>
        );
    }
    return(
        <div>
        {articlesList.map((article, index) => {
            return(
                <a className="pe-5 ps-5 text-decoration-none text-reset" key={index} href={`/all/${article._id}`}>
                    <h3 className="text-capitalize">{article.titre}</h3>
                    <p>{article.contenu.slice(0, 300)}...</p>
                {/* <p>publié le {new Date(article.createdAt).toLocaleDateString()} - écrit par {article.loginAuthor.charAt(0).toUpperCase()+article.loginAuthor.slice(1)}</p> */}
                </a>
            )
        })}
        </div>
    )
}