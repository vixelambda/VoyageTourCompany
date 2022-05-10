import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import axios from "axios";

const Login = () => {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitLogin = async e => {
        e.preventDefault();
        const body = { username: userName,password: password };
        try {
            const response = await axios.post("http://vtc-voyage.herokuapp.com/api/auth/login", {
                email: body.username,
                password: body.password
            }).then(response => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    navigate("/profile");
                }
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div>
            <a href="/"><img className="imgShip" src="/logo.png" alt="imgShip"/></a>
            <Container fluid className="d-flex flex-column">
                <Row className="align-items-center justify-content-center" md="auto" xs="auto" xl="auto">
                    <Col md="auto" xs="auto">
                        <div className="login">
                            <Stack className="mx-auto">
                                <h1 className="text-center mt-2">Авторизация</h1>
                                <form className="mt-4" onSubmit={onSubmitLogin}>
                                    <Stack gap={3} className="mx-auto" style={{marginBottom: '10px'}}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userName}
                                            placeholder="Эл. адрес"
                                            required
                                            onChange={e => setUserName(e.target.value)}
                                        />
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            placeholder="Пароль"
                                            required
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <Button className="btn btn-success" type="submit">Войти</Button>
                                    </Stack>
                                </form>
                                <Link to="/registration">Еще нет аккаунта?</Link>
                            </Stack>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;