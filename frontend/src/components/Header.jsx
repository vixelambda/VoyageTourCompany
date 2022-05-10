import {NavLink} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

function Header(){
    return(
        <header className='header' style={{backgroundColor: "lightgoldenrodyellow"}}>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Nav.Link as={NavLink} className="navLink" to="/"><h2>VOYAGE</h2></Nav.Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {(localStorage.getItem("user") !== null) &&
                                <Nav.Link as={NavLink} className="navLink" to="/profile" style={{color: 'brown'}}><h5>Личный кабинет</h5></Nav.Link>
                            }
                            {(localStorage.getItem("user") !== null) &&
                                <Nav.Link as={NavLink} className="navLink" to="/tours" style={{color: 'purple'}}><h5>Просмотр туров</h5></Nav.Link>
                            }
                            {(localStorage.getItem("role") === "ROLE_ADMIN") &&
                                <Nav.Link as={NavLink} className="navLink" to="/admin" style={{color: 'green'}}><h5>Администрирование</h5></Nav.Link>
                            }
                        </Nav>
                        {localStorage.getItem("user") === null &&
                            <Nav>
                                <Nav.Link as={NavLink} className="navLink" to="/login" style={{color: 'green'}}><h5>Войти</h5></Nav.Link>
                                <Nav.Link as={NavLink} className="navLink" to="/registration" style={{color: 'green'}}><h5>Регистрация</h5></Nav.Link>
                            </Nav>
                        }
                        {localStorage.getItem("user") !== null &&
                            <Nav.Link onClick={() => {localStorage.clear()}} as={NavLink} className="navLink" to="/login" style={{color: 'red'}}><h5>Выйти</h5></Nav.Link>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;