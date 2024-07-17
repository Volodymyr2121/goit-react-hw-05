import axios from "axios";
import { useEffect, useState } from 'react';
import MovieList from "../components/MovieList/MovieList"


export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTA5N2I2YTdjMTE3NzM4NDEzMTUxYmU5NTkyNTUyZSIsIm5iZiI6MTcyMDk1OTI1NC41MDc5MjEsInN1YiI6IjY2OTE3NjExZWNkYmIxMmYwMjQzZGM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtSIUIr5bMVjLJq9xaSo1bwyvovtugbgk14l6KKu4kA'
                    }
                })
                setMovies(response.data.results)
            } catch (error) {
                console.error('Error fetching popular movies:', error)
            }
        }
        fetchMovies()
    }, []);

    return <div>
        <h1>Tranding Today</h1>
        <MovieList movies={ movies} /></div>
}