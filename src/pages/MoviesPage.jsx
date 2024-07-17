import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList'
import { useEffect, useState } from 'react'
import axios from 'axios';


export default function MoviesPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        const queryParam = searchParams.get('query');
        if (queryParam) {
            setQuery(queryParam)
            searchMovie(queryParam)
        }
    }, [searchParams])
    
    const searchMovie = async (searchQuery) => {
        if (searchQuery.trim() === '') return
        
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1`,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTA5N2I2YTdjMTE3NzM4NDEzMTUxYmU5NTkyNTUyZSIsIm5iZiI6MTcyMDk1OTI1NC41MDc5MjEsInN1YiI6IjY2OTE3NjExZWNkYmIxMmYwMjQzZGM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtSIUIr5bMVjLJq9xaSo1bwyvovtugbgk14l6KKu4kA'
                    }
                });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
        
    }

        const handleSubmit = (event) => {
            event.preventDefault();
            setSearchParams({ query: query });
            searchMovie(query);
            setQuery('')
}

    

    return <div>
        <h1>Search Movies</h1>
        <form onSubmit={handleSubmit}>
            <input value={query}  onChange={(e) => setQuery(e.target.value)}/>
            <button type="submit">Search</button>
        </form>
        <MovieList movies={movies}/>
    </div>
}