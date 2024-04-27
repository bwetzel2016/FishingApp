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

    const handleLike = async (postId) => {
        const { data, error } = await supabase
            .from('Posts')
            .update({ betCount: supabase.sql('betCount + 1') })
            .eq('id', postId);

        if (error) {
            console.error('Error updating post:', error);
        } else {
            const updatedPost = data[0];
            setPosts((prevPosts) => {
                return prevPosts.map((post) => {
                    if (post.id === updatedPost.id) {
                        return updatedPost;
                    } else {
                        return post;
                    }
                });
            });
        }
    };

    return (
        <div className="ReadPosts">
            <div className="ReadPosts-Header">
                <div className="header-buttons">
                    <Link to="/"><button className="headerBtn"> Home </button></Link>
                    <Link to="/new"><button className="headerBtn"> Report a catch🏆 </button></Link>
                </div>
                <h1 className="anglerhub-heading">🎣 AnglerHub: The Ultimate Fishing Community 🎣</h1>
                {
                    
                    posts && posts.length > 0 ?
                    posts.map((post) => (
                        <div key={post.id}>
                            <Card 
                                id={post.id} 
                                name={post.name} 
                                location={post.location} 
                                description={post.description}
                                betCount={post.betCount} 
                                photo={post.photo}
                            />
                        </div>
                    )) : <div className="noPosts">No Posts</div>
                }
            </div>
        </div>
    );
};

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