import React from "react";

function Main() {
    return (
        <div>
            <a href="/"><div><img src="/ico.png" className="App-logo" alt="logo"/></div></a>
            <h1>Добро пожаловать на сайт туркомпании "Voyage"!</h1>
            <h2>Ваши первые возможности:</h2>
            <h5 className="otstup"><a className="mylink" href="/login">Войти</a></h5>
            <h5 style={{marginTop:"50px"}}><a className="mylink" href="/registration">Зарегистрироваться</a></h5>
        </div>
    );
}

export default Main;