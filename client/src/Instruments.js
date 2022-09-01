import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import Guitar from './images/instrument-icons/Guitar.png'
import Bass from './images/instrument-icons/Bass.png'
import Vocals from './images/instrument-icons/Vocals.png'
import Drums from './images/instrument-icons/Drums.png'
import Keyboard from './images/instrument-icons/Keyboard.png'


const Instruments = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get('/posts')
            .then((res) => {
                console.log(res);
                setPosts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteInstrument = (id) => {
        axios
            .delete(`/delete/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            window.location.reload();
    };


    return (
        <div>
            {posts ? (
                <>
                    {posts.map((post) => {
                        const imageName = post.instrument
                        return (
                            <div
                                key={post._id}
                                style={{
                                    border: 'solid lightgray 1px',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                    padding: '1rem',
                                }}
                            >
                                <h4>{post.instrument}</h4>
                                <p>{post.description}</p>
                                <img src={imageName} alt={post.instrument}/>
                                <img src={require(`./images/instrument-icons/${post.instrument}.png`)} />

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                </div>
                                <Button
                                        onClick={() => deleteInstrument(post._id)}
                                        variant="outline-danger"
                                        style={{ width: '100%' }}
                                    >
                                        DELETE
                                </Button>
                            </div>
                        );
                    })}
                </>
            ) : (
                ''
            )}
        </div>
    );
}

export default Instruments;