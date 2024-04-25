import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'

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
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.title} author={post.author} description={post.description}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;