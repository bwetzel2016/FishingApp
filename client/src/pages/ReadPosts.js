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
            <div className="header">
            <h1>👍 Bet 1.0</h1>
            <div className="header-buttons">
        <Link to="/"><button className="headerBtn"> Home  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create Post 🏆 </button></Link>
        </div><br />
        </div><br />
        {
  posts && posts.length > 0 ?
  posts.map((post,index) => 
    <Card 
      key={post.id} // Add this line
      id={post.id} 
      title={post.title} 
      author={post.author} 
      description={post.description}
    />
  ) : <h2>{'No Challenges Yet 😞'}</h2>
}
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

      */