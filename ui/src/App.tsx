import React from 'react';
import { Routes, Route, Link, useMatch, useNavigate, useLocation } from 'react-router-dom';
import Genres from './pages/Genres';
import Books from './pages/Books';
import Genre from './pages/Genre';
import Book from './pages/Book';
import './App.css';

function App() {
    const { pathname } = useLocation();

    console.log(pathname === '/genres');

    return (
        <div className="App">
            <header className="App-header">
                <Link to="/" className={pathname === '/' ? 'Active' : ''}>
                    Home
                </Link>
                <Link to="/genres" className={pathname === '/genres' ? 'Active' : ''}>
                    Genres
                </Link>
                <Link to="/books" className={pathname === '/books' ? 'Active' : ''}>
                    Books
                </Link>
            </header>
            <section>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/genres" element={<Genres />} />
                    <Route path="/genre:genreId" element={<Genre />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/book:bookId" element={<Book />} />
                </Routes>
            </section>
        </div>
    );
}

function Home() {
    return <div>Home Page</div>;
}

export default App;
