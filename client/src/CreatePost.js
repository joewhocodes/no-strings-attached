import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CreatePost = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setPost(prev => {
            return {
                ...prev,
                [name]: value,
            };
        })
    };

    useEffect(() => {
        console.log(post)
    }, [post])

    return (
        <div style={{ width: '90%', margin: 'auto auto', textAlign: 'center' }}>
            <h1>Create a post</h1>
            <Form>
                <Form.Group>
                    <Form.Control
                        name="title"
                        value={post.title}
                        placeholder="title"
                        style={{ marginBottom: '1rem' }}
                        onChange={handleChange}
                    />
                    <Form.Control
                        name="description"
                        value={post.description}
                        placeholder="description"
                        style={{ marginBottom: '1rem' }}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>
            <Button
                variant="outline-dark"
                style={{ width: '100%' }}
                onClick={() => navigate(-1)}
            >
                BACK
            </Button>
        </div>
    );
};

export default CreatePost;
