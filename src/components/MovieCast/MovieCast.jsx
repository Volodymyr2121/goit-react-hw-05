import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieCast() {
    const [cast, setCast] = useState([])
    const {movieId} = useParams()

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,{
                    headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTA5N2I2YTdjMTE3NzM4NDEzMTUxYmU5NTkyNTUyZSIsIm5iZiI6MTcyMDk1OTI1NC41MDc5MjEsInN1YiI6IjY2OTE3NjExZWNkYmIxMmYwMjQzZGM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtSIUIr5bMVjLJq9xaSo1bwyvovtugbgk14l6KKu4kA'
}
                })
                setCast(response.data.cast)
            } catch (error){
                console.error('Error fetching cast:', error);
            }
        }
        fetchCast()
    }, [movieId])

    return <div>
        <h2>Cast</h2>
            <ul>
                {cast.map(actor => (
                    <li key={actor.cast_id}>
                        <p>{actor.name}</p>
                        <p>Character: {actor.character}</p>
                    </li>
                ))}
            </ul>
    </div>
    
    

}