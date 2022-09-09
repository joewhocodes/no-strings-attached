import React, { useEffect, useState } from 'react';
import './Genres.css';
import AddGenre from './AddGenre';
import { Button } from 'react-bootstrap';
import axios from 'axios';


const Genres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios
            .get('/genres')
            .then((res) => {
                setGenres(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteGenre = (id) => {
        axios
            .delete(`/genres/deleteGenre/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            window.location.reload();
    };


    return (
        <div>
            {genres ? (
                <>
                    {genres.map((genre) => {
                        return (
                            <div
                                key={genre._id}
                                className='genre-card'
                            >
                                { <img
                                    src={require(`./images/genre-icons/${genre.genre}.png`)}
                                    alt={`${genre.genre}`}
                                    height="40px"
                                />}
                                <h4>{genre.genre}</h4>
                                <Button
                                    onClick={() => deleteGenre(genre._id)}
                                    variant="outline-danger"
                                >
                                    X
                                </Button>
                            </div>
                        );
                    })}
                    <AddGenre/>
                </>
            ) : (
                ''
            )}
        </div>
    );
}

export default Genres;