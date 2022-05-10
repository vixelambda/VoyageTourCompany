import React, {useEffect, useState} from "react";
import {Col, Container, Row, Form} from "react-bootstrap";
import axios from "axios";
import Tours from "./Tours";
import Header from "./Header";

const SearchTour = () => {
    const [allTours, setAllTours] = useState([]);
    const [tours, setTours] = useState([]);
    const [startPoint, setstartPoint] = useState("");
    const [endPoint, setendPoint] = useState("");
    const [date, setDate] = useState("");
    const getTours = async () => {
        try {
            const response = await axios.get("http://vtc-voyage.herokuapp.com/api/tours");
            const jsonData = await response.data;
            setTours(jsonData);
            setAllTours(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };
    function filterEndPoint(newEndPoint) {
        if(newEndPoint === ""){
            if(startPoint === ""){
                if(date !== ""){
                    setTours(allTours.filter(tour => tour.date === date))
                }
                else {
                    setTours(allTours);
                }
            }
            else {
                if(date !== ""){
                    setTours(allTours.filter(tour => tour.date === date && tour.start.includes(startPoint)))
                }
                else {
                    setTours(allTours.filter(tour => tour.start.includes(startPoint)));
                }
            }
        }
        else {
            if(startPoint === ""){
                if(date !== ""){
                    setTours(allTours.filter(tour => tour.date === date && tour.finish.includes(newEndPoint)))
                }
                else {
                    setTours(allTours.filter(tour => tour.finish.includes(newEndPoint)));
                }
            }
            else {
                if(date !== ""){
                    setTours(allTours.filter(tour => tour.start.includes(startPoint) && tour.finish.includes(newEndPoint) && tour.date === date));
                }
                else {
                    setTours(allTours.filter(tour => tour.start.includes(startPoint) && tour.finish.includes(newEndPoint)));
                }
            }
        }
    }
    function filterStartPoint(newStartPoint) {
        if(endPoint === ""){
            if(newStartPoint === ""){
                if(date !== ""){
                    setTours(allTours.filter(tour => tour.date === date))
                }
                else {
                    setTours(allTours);
                }
            }
            else {
                if(date !== ""){
                    setTours(allTours.filter(tour => tour.date === date && tour.start.includes(newStartPoint)))
                }
                else {
                    setTours(allTours.filter(tour => tour.start.includes(newStartPoint)));
                }
            }
        }
        else {
            if(newStartPoint === ""){
                if(date !== ""){
                    setTours(allTours.filter(tour => tour.date === date && tour.finish.includes(endPoint)))
                }
                else {
                    setTours(allTours.filter(tour => tour.finish.includes(endPoint)));
                }
            }
            else {
                if(date !== ""){
                    setTours(allTours.filter(tour => tour.start.includes(newStartPoint) && tour.finish.includes(endPoint) && tour.date === date));
                }
                else {
                    setTours(allTours.filter(tour => tour.start.includes(newStartPoint) && tour.finish.includes(endPoint)));
                }
            }
        }
    }
    function filterDate(newDate) {
        if(endPoint === ""){
            if(startPoint === ""){
                if(newDate !== ""){
                    setTours(allTours.filter(tour => tour.date === newDate))
                }
                else {
                    setTours(allTours);
                }
            }
            else {
                if(newDate !== ""){
                    setTours(allTours.filter(tour => tour.date === newDate && tour.start.includes(startPoint)))
                }
                else {
                    setTours(allTours.filter(tour => tour.start.includes(startPoint)));
                }
            }
        }
        else {
            if(startPoint === ""){
                if(newDate !== ""){
                    setTours(allTours.filter(tour => tour.date === newDate && tour.finish.includes(endPoint)))
                }
                else {
                    setTours(allTours.filter(tour => tour.finish.includes(endPoint)));
                }
            }
            else {
                if(newDate !== ""){
                    setTours(allTours.filter(tour => tour.start.includes(startPoint) && tour.finish.includes(endPoint) && tour.date === newDate));
                }
                else {
                    setTours(allTours.filter(tour => tour.start.includes(startPoint) && tour.finish.includes(endPoint)));
                }
            }
        }
    }
    useEffect(() => {
        getTours();
    }, []);

    return (
        <Container className="mb-3 mt-3">
            <Row><Header /></Row>
            <Row className="mb-3 mt-3">
                <Col>
                    <Form.Floating>
                        <Form.Control
                            id="floatingInputCustom"
                            value={startPoint}
                            type="text"
                            placeholder="Пункт отправления"
                            onChange={e => {
                                setstartPoint(e.target.value);
                                filterStartPoint(e.target.value)
                            }}
                        />
                        <label htmlFor="floatingInputCustom">Пункт отправления</label>
                    </Form.Floating>
                </Col>
                <Col>
                    <Form.Floating>
                        <Form.Control
                            id="floatingInputCustom2"
                            type="text"
                            value={endPoint}
                            placeholder="Пункт назначения"
                            onChange={e => {
                                setendPoint(e.target.value);
                                filterEndPoint(e.target.value)
                            }}
                        />
                        <label htmlFor="floatingInputCustom2">Пункт назначения</label>
                    </Form.Floating>
                </Col>
                <Col>
                    <Form.Floating>
                        <Form.Control type="date" value={date}
                                      onChange={e => {
                                          setDate(e.target.value);
                                          filterDate(e.target.value)
                                      }}
                        />
                        <label>Дата отправления</label>
                    </Form.Floating>
                </Col>
            </Row>
            <Row>
                <div className="tours">
                    <Tours tours={tours} />
                </div>
            </Row>
        </Container>
    );
};

export default SearchTour;