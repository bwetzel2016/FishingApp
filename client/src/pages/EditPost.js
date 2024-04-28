import React, { useState } from 'react';
import { supabase } from '../client'
import './EditPost.css'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, name: "", location: "", description: ""});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ name: post.name, location: post.location,  description: post.description})
            .eq('id', id);

        navigate('/');
    }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id); 

        navigate('/');
    }


    return (
        <div>
            <div className="CreatePost-Header">
                <form>
                    <div className="input-container">
                        <label htmlFor="name">Name</label> <br />
                        <input type="text" id="name" name="name" onChange={handleChange} /><br /><br />

                        <label htmlFor="location">Location</label><br />
                        <input type="text" id="location" name="location" onChange={handleChange} /><br /><br />

                        <label htmlFor="description">Species of fish </label><br />
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
                    <input type="submit" value="Submit" onClick={updatePost} />
                    <button className="deleteButton" onClick={deletePost}>Delete</button>
                </form>
            </div>
        </div>
    );
};

export default EditPost;