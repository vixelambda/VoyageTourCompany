import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Col, Container, Row, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import Tours from "./Tours";
import Header from "./Header";

function MyVerticallyCenteredModalUser(props) {
    let navigate = useNavigate();
    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [passportData, setPassportData] = useState("");
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://vtc-voyage.herokuapp.com/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
                setUserName(response.data.username);
                setEmail(response.data.email);
                setAge(response.data.age);
                setFirstName(response.data.firstname);
                setLastName(response.data.lastname);
                setMiddleName(response.data.middlename);
                setPassportData(response.data.passportdata);
                setPassword(response.data.password);
                setPhone(response.data.phone);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    const updateUser =  async  () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            const body = {
                id: user.id,
                username: userName,
                password: password,
                passportdata: passportData,
                firstname: firstName,
                middlename: middleName,
                lastname: lastName,
                age: age,
                phone: phone,
                email: email
            };
            await axios.post("http://vtc-voyage.herokuapp.com/api/user/info", body, {headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
                window.location.reload();
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Обновление личных данных</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className="mid">Введите ваши новые данные</h4>
                <Container>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="basic-url">Имя</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url" aria-describedby="basic-addon3" value = {firstName} onChange={e => setFirstName(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Отчество</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3"  value = {middleName} onChange={e => setMiddleName(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Возраст</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {age} onChange={e => setAge(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Почта</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {email} onChange={e => setEmail(e.target.value)}/>
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label htmlFor="basic-url">Фамилия</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url" aria-describedby="basic-addon3" value = {lastName} onChange={e => setLastName(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url4">Паспортные данные</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url4" aria-describedby="basic-addon3" value = {passportData} onChange={e => setPassportData(e.target.value)}/>
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">Телефон</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {phone}  onChange={e => setPhone(e.target.value)}/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => updateUser()}>Подтвердить</Button>
            </Modal.Footer>
        </Modal>
    );
}

const Profile = () => {
    const [user, setUser] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://vtc-voyage.herokuapp.com/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return(
        <Container className="mb-3 mt-3">
            <Row><Header /></Row>
            <Row className="mb-3 mt-3 login">
                <h1>Информация о пользователе</h1>
                <Col>
                    <Form.Label htmlFor="basic-url">Имя</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" value = {user.firstname} disabled/>
                    </InputGroup>
                    <Form.Label htmlFor="basic-url2">Отчество</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url2" aria-describedby="basic-addon3" t value = {user.middlename} disabled/>
                    </InputGroup>
                    <Form.Label htmlFor="basic-url2">Возраст</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {user.age} disabled/>
                    </InputGroup>
                    <Form.Label htmlFor="basic-url2">Почта</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {user.email} disabled/>
                    </InputGroup>
                </Col>
                <Col>
                    <Form.Label htmlFor="basic-url">Фамилия</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url" aria-describedby="basic-addon3" value = {user.lastname} disabled/>
                    </InputGroup>
                    <Form.Label htmlFor="basic-url4">Паспортные данные</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url4" aria-describedby="basic-addon3" value = {user.passportdata} disabled/>
                    </InputGroup>
                    <Form.Label htmlFor="basic-url2">Телефон</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {user.phone} disabled/>
                    </InputGroup>
                    <Form.Label htmlFor="basic-url2">Действие</Form.Label>
                    <InputGroup className="mb-3">
                        <Button style={{width:"616px"}} variant="success" onClick={() => setModalShow(true)}>Редактировать</Button>
                    </InputGroup>
                </Col>
                <MyVerticallyCenteredModalUser user={user}
                                               show={modalShow}
                                               onHide={() => setModalShow(false)}/>
            </Row>
            <Row className="mb-3 mt-3 login">
                <h1>Забронированные туры</h1>
                <Tours tours={user.tours} />
            </Row>
        </Container>
    )
}

export default Profile;