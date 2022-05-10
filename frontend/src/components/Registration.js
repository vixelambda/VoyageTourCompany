import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";

const Registration = () => {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [passportData, setPassportData] = useState("");
    const onSubmitLogin = async e => {
        e.preventDefault();
        try {
            const body = {
                username: userName,
                password: password,
                passportdata: passportData,
                firstname: firstName,
                middlename: middleName,
                lastname: lastName,
                age: age,
                phone: phone,
                email: email,
                passwordConfirm: passwordConfirm
            };
            await axios.post("https://vtc-voyage.herokuapp.com/api/auth/registration", body);
            navigate("/login");
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
                                <h1 className="text-center mt-2">Создайте аккаунт</h1>
                                <form className="mt-4" onSubmit={onSubmitLogin}>
                                    <Stack direction="horizontal" gap={3} className="mx-auto">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={userName}
                                            placeholder="Логин"
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
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={passwordConfirm}
                                            placeholder="Повторите пароль"
                                            required
                                            onChange={e => setPasswordConfirm(e.target.value)}
                                        />
                                    </Stack>
                                    <Stack direction="horizontal" gap={3} className="mx-auto mt-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={firstName}
                                            placeholder="Имя"
                                            required
                                            onChange={e => setFirstName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={lastName}
                                            placeholder="Фамилия"
                                            required
                                            onChange={e => setLastName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={middleName}
                                            placeholder="Отчетство"
                                            required
                                            onChange={e => setMiddleName(e.target.value)}
                                        />
                                    </Stack>
                                    <Stack direction="horizontal" gap={3} className="mx-auto mt-1">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={age}
                                            placeholder="Возраст"
                                            required
                                            onChange={e => setAge(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={passportData}
                                            placeholder="Паспортные данные"
                                            required
                                            onChange={e => setPassportData(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={phone}
                                            placeholder="Телефон"
                                            required
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </Stack>
                                    <Stack direction="horizontal" gap={2} className="mx-auto mt-1">
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            placeholder="Почта"
                                            required
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <Button className="btn btn-success" type="submit">Создать аккаунт</Button>
                                    </Stack>
                                </form>
                                <Link to="/login">Уже есть аккаунт?</Link>
                            </Stack>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Registration;