import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'
import { Link } from 'react-router-dom';
import './ReadPosts.css';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [sortType, setSortType] = useState('time');
    const [locationSearchTerm, setLocationSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            let { data } = await supabase
                .from('Posts')
                .select();

            if (sortType === 'votes') {
                data = data.sort((a, b) => b.betCount - a.betCount);
            }

            setPosts(data);
        };

        fetchPosts();
    }, [sortType]);

    return (
        <div className="ReadPosts">
            <div className="ReadPosts-Header">
                <div className="header-buttons">
                    <Link to="/"><button className="headerBtn"> Home </button></Link>
                    <Link to="/new"><button className="headerBtn"> Report a catch🏆 </button></Link>
                    <input
                        type="text"
                        placeholder="Search by location"
                        value={locationSearchTerm}
                        onChange={(e) => setLocationSearchTerm(e.target.value)}
                    />
                </div>
                <h1 className="anglerhub-heading">🎣 AnglerHub: The Ultimate Fishing Community 🎣</h1>
                {posts && posts.length > 0 && (
                    <button className="sort-button" onClick={() => setSortType(sortType === 'votes' ? 'time' : 'votes')}>
                        {sortType === 'votes' ? 'Sort by votes' : 'Sort by votes'}
                    </button>
                )}
                {
                    posts && posts.length > 0 ?
                    posts.filter(post => post.location.toLowerCase().includes(locationSearchTerm.toLowerCase())).map((post) => (
                        <div key={post.id} className="card-container">
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