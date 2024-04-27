import React, { useState, useEffect, } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'
import { Link } from 'react-router-dom';
import './ReadPosts.css';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const { data } = await supabase
            .from('Posts')
            .select();

        setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        
        <div className="ReadPosts">

            
    <div className="ReadPosts-Header">
    <div className="header-buttons">
        <Link to="/"><button className="headerBtn"> Home </button></Link>
        <Link to="/new"><button className="headerBtn"> Create Post 🏆 </button></Link>
    </div>
        <h1>Catch of the Day: The Ultimate Fishing Community</h1>
        {
            posts && posts.length > 0 ?
            posts.map((post) => 
                <Card 
                    key={post.id} 
                    id={post.id} 
                    name={post.name} 
                    location={post.location} 
                    description={post.description}
                    photo={post.photo}
                />
            ) : <div className="noPosts">No Posts</div>
        }
    </div>
</div>
 
    )
}

export default ReadPosts;



/*
<div className="header">


<h1>👍 Bet 1.0</h1>
        <Link to="/"><button className="headerBtn"> Explore Challenges 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Submit Challenfffge 🏆 </button></Link>
      </div>





 key={post.id} // Add this line
                    id={post.id} 
                    name={post.title} 
                    author={post.author} 
                    description={post.description}





      */