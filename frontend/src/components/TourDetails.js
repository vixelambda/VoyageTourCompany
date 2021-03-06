import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Form, Col, Container, FormControl, InputGroup, ListGroup, ListGroupItem, Modal, Row} from "react-bootstrap";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
    let navigate = useNavigate();
    const [user, setUser] = useState([]);
    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("https://vtc-voyage.herokuapp.com/api/user/info",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setUser(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    const bookTour = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.post("https://vtc-voyage.herokuapp.com/api/user/booking",
                {
                    "id": props.tour.id,
                    "start": props.tour.start,
                    "finish": props.tour.finish,
                    "price": props.tour.price,
                    "date": props.tour.date,
                    "count": props.tour.count,
                    "description": {
                        "id": props.tour.description.id,
                        "img": props.tour.description.img,
                        "text": props.tour.description.text
                    },
                    "users": props.tour.users
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }}
            ).then((response) => {
                navigate("/profile")
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
                <Modal.Title id="contained-modal-title-vcenter">?????????????????????????? ????????????????????????</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>??????????????????, ?????? ???? ???????????? ??????????</h4>
                <p><b>??????</b></p>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>?????????? ??????????????????????: {props.tour.start}</ListGroupItem>
                    <ListGroupItem>?????????? ????????????????????: {props.tour.finish}</ListGroupItem>
                    <ListGroupItem>???????? ??????????????????????: {props.tour.date}</ListGroupItem>
                </ListGroup>
                <p><b>????????????</b></p>
                <Container>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="basic-url">??????</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url" aria-describedby="basic-addon3" value = {user.firstname} />
                            </InputGroup>
                            <Form.Label htmlFor="basic-url2">??????????????????</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url2" aria-describedby="basic-addon3" value = {user.middlename} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <Form.Label htmlFor="basic-url">??????????????</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url" aria-describedby="basic-addon3" value = {user.lastname} />
                            </InputGroup>
                            <Form.Label htmlFor="basic-url4">?????????? ?? ?????????? ????????????????</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl id="basic-url4" aria-describedby="basic-addon3" value = {user.passportdata} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <h4>?????????????????? ????????: {props.tour.price} ????????????</h4>
                <Button variant="success" onClick={bookTour}>??????????????????????</Button>
            </Modal.Footer>
        </Modal>
    );
}
const TourDetails = () => {
    const { id } = useParams();
    const [tour, setTour] = useState([]);
    const [image, setImage] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const getTour = async () => {
        try {
            await axios.get("https://vtc-voyage.herokuapp.com/api/tours/"+id).then((response) => {
                setImage(response.data.description.img)
                setTour(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getTour();
    }, []);
    return(
        <Container className="mb-3 mt-3">
            <Row className="justify-content-center">
                <Col md="auto" xs="auto" xl="6">
                    <Card>
                        <Card.Body>
                            <Card.Img variant="top" src={image} />
                            <Card.Title>{tour.finish}</Card.Title>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>?????????? ??????????????????????: {tour.start}</ListGroupItem>
                                <ListGroupItem>?????????? ????????????????????: {tour.finish}</ListGroupItem>
                                <ListGroupItem>?????????????????? ????????: {tour.price}</ListGroupItem>
                                <ListGroupItem>???????? ??????????????????????: {tour.date}</ListGroupItem>
                                <ListGroupItem>??????-???? ??????????????: {tour.count}</ListGroupItem>
                            </ListGroup>
                            <Button variant="success" onClick={() => setModalShow(true)}>??????????????????????????</Button>
                            <MyVerticallyCenteredModal tour={tour}
                                                       show={modalShow}
                                                       onHide={() => setModalShow(false)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default TourDetails;