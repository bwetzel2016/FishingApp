import { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom';
const CreatePost = () => {

    const [post, setPost] = useState({title: "", author: "", description: "", color:"" })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title, author: post.author, description: post.description})
          .select();
      
       
    }




    return (
        <div>
            <Link to="/"><button className="headerBtn homeBtn"> Home  </button></Link>
            <div className="header">
                <form>
                    <div className="input-container">
                        <label htmlFor="title">Title</label> <br />
                        <input type="text" id="title" name="title" onChange={handleChange} /><br />
                        <br/>
    
                        <label htmlFor="author">Author(Mph)</label><br />
                        <input type="text" id="author" name="author" onChange={handleChange} /><br />
                        <br/>
    
                        <label htmlFor="description">Description</label><br />
                        <input type="text" id="description" name="description" onChange={handleChange} /><br />
                        <br/>
                    </div>
                    <input type="submit" value="Submit" onClick={createPost} />
                </form>
            </div>
        </div>
    )
    
}

export default CreatePost