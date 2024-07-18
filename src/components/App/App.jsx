import { Routes, Route, } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(()=> import ('../../pages/HomePage'))
const MoviesPage = lazy(() => import('../../pages/MoviesPage'))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'))
const Navigation = lazy(() => import('../Navigation/Navigation'))
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'))
const MovieCast = lazy(() => import('../MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'))


export default function App() {
      return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </div>
    );
}