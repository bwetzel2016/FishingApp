import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [post, setPost] = useState({ name: "", location: "", description: "", photo: "" });

    const handleChange = (event) => {
        const { name, type } = event.target;
        let value;

        if (type === 'file') {
            value = URL.createObjectURL(event.target.files[0]);
        } else {
            value = event.target.value;
        }

        setPost(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const createPost = async (event) => {
        event.preventDefault();

        try {
            await supabase.from('Posts').insert(post);
            console.log("Post created successfully!");
            // Redirect the user to the readpost.js page
            navigate('/'); 
        } catch (error) {
            console.error("Error creating post:", error.message);
        }
    };



    return (
        <div>
            <Link to="/"><button className="headerBtn homeBtn"> Home </button></Link>
            <div className="CreatePost-Header">
                <form>
                    <div className="input-container">
                        <label htmlFor="name">Name</label> <br />
                        <input type="text" id="name" name="name" onChange={handleChange} /><br /><br />

                        <label htmlFor="location">Location</label><br />
                        <input type="text" id="location" name="location" onChange={handleChange} /><br /><br />

                        <label htmlFor="description">Species of fish</label><br />
                        <select id="description" name="description" onChange={handleChange} className="description-input" >
                            <option value="">Select a species</option>
                            <option value="Salmon">Salmon</option>
                            <option value="Trout">Trout</option>
                            <option value="Bass">Bass</option>
                            {/* Add more options as needed */}
                        </select><br /><br />

                        <label htmlFor="photo">Photo</label><br />
                        <input type="file" id="photo" name="photo" onChange={handleChange} className="photo-input" /><br /><br />
                    </div>
                    <input type="submit" value="Submit" onClick={createPost} />
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
