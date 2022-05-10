import './App.css';
import './css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import SearchTour from "./components/SearchTour";
import TourDetails from "./components/TourDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tours" element={<SearchTour />} />
            <Route path="/tours/:id" element={<TourDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
