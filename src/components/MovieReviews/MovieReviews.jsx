import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";


export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();
    
    useEffect(() => {
        const fetchReviews = async () => {
            try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`, {
                headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTA5N2I2YTdjMTE3NzM4NDEzMTUxYmU5NTkyNTUyZSIsIm5iZiI6MTcyMDk1OTI1NC41MDc5MjEsInN1YiI6IjY2OTE3NjExZWNkYmIxMmYwMjQzZGM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtSIUIr5bMVjLJq9xaSo1bwyvovtugbgk14l6KKu4kA'
                    }
            })
            setReviews(response.data.results)
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }
        fetchReviews()
    },[movieId])
    return (<div>
         <h2>Reviews</h2>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <p>Author: {review.author}</p>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews available.</p>
            )}
    </div>)
}