import axios from "axios";
import { useParams, useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react"
import css from './MoviesDetailsPage.module.css'

export default function MovieDetailsPage() {
    const [movie, setMovie] = useState(null);   
    const { movieId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const previousLocation = useRef(location.state?.from);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTA5N2I2YTdjMTE3NzM4NDEzMTUxYmU5NTkyNTUyZSIsIm5iZiI6MTcyMDk1OTI1NC41MDc5MjEsInN1YiI6IjY2OTE3NjExZWNkYmIxMmYwMjQzZGM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtSIUIr5bMVjLJq9xaSo1bwyvovtugbgk14l6KKu4kA'
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

     const goBack = () => {
        if (previousLocation.current) {
            navigate(previousLocation.current);
        } else {
            navigate('/movies');
        }
    };

     if (!movie) {
        return <div>Loading...</div>;
    }
    
    return <div>
        <button onClick={goBack}>Go Back</button>
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
        <p>{movie.overview}</p>
            <nav className={css.container}>
                <Link to="cast" className={css.link}>Cast</Link>
                <Link to="reviews" className={css.link}>Reviews</Link>
            </nav>
            <Outlet />
    </div>
}