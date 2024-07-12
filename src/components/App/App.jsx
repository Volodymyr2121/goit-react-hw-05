import { Routes, Route, } from "react-router-dom";
import HomePage from '../../pages/HomePage';
import MoviesPage from '../../pages/MoviesPage';
import NotFoundPage from "../../pages/NotFoundPage";
import Navigation from "./Navigation/Navigation";



export default function App() {
    return(
      <div>
        <Navigation/>
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/movies" element={<MoviesPage />} /> 
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>)
}