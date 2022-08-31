import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const Posts = () => {
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

    return (
        <div style={{ width: '90%', textAlign: 'center', margin: 'auto auto' }}>
            <h1>Posts</h1>
            {posts ? (
                <>
                    {posts.map((post) => {
                        return (
                            <div
                                style={{
                                    border: 'solid lightgray 1px',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                }}
                            >
                                <h4>{post.title}</h4>
                                <p>{post.description}</p>
                            </div>
                        );
                    })}
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default Posts;
