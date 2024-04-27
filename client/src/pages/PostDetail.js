import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import './PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setPost(data);
            } else {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    const handleLike = async () => {
        const newBetCount = (post.betCount || 0) + 1;
        const { error } = await supabase
            .from('Posts')
            .update({ betCount: newBetCount })
            .eq('id', id);
    
        if (error) {
            console.error(error);
        } else {
            setPost({ ...post, betCount: newBetCount });
        }
    };

    return post ? (
        <div className="post-detail-container">
            <h1>{post.name}</h1>
            <p>{post.author}</p>
            {/* Other post details */}
            <button onClick={handleLike}>Like 👍 {post.betCount || 0}</button>
        </div>
    ) : (
        <div>Loading...</div>
    );
};

export default PostDetail;