import React, { useEffect, useState } from 'react';
import './Instruments.css';
import AddInstrument from './AddInstrument';
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
            .delete(`/delete/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            window.location.reload();
    };


    return (
        <div>
            {genres ? (
                <>
                    {Genres.map((genre) => {
                        return (
                            <div
                                key={genre._id}
                                className='genre-card'
                            >
                                <img
                                    src={require(`./images/genre-icons/${genre.genre}.png`)}
                                    alt={`${genre.genre}`}
                                    height="40px"
                                />
                                <h4>{genre.genre}</h4>
                                <Button
                                    onClick={() => deleteGenre(genre._id)}
                                    variant="outline-danger"
                                    // style={{ width: '20%' }}
                                >
                                    X
                                </Button>
                            </div>
                        );
                    })}
                    <AddInstrument/>
                </>
            ) : (
                ''
            )}
        </div>
    );
}

export default Genres;