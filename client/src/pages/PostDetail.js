import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import './PostDetail.css';
import { Link } from 'react-router-dom';

const PostDetail = (props) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('postId', id);

            if (data) {
                setComments(data.map(comment => comment.text));
            } else {
                console.error(error);
            }
        };

        fetchComments();
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        // Insert the new comment into the 'Comments' table
        const { error } = await supabase
            .from('Comments')
            .insert([
                { text: comment, postId: id },
            ]);

        if (error) {
            console.error(error);
        } else {
            // Update the local state
            setComments([...comments, comment]);
            setComment('');
        }
    };

    return post ? (
        <div className="post-detail-container">
            <Link to="/"><button className="headerBtn homeBtn"> Home </button></Link>
            <div className="content-container">
                <h1>{post.name}</h1>
                <h2 className="bait">{post.description}</h2>
                <img src={post.photo} alt={post.name} /> {/* Display the photo */}
            </div>
            {/* Other post details */}
            <button onClick={handleLike}>Like 👍 {post.betCount || 0}</button>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="Write a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <div className="comments-section">
                {comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                ))}
            </div>
        </div>
    ) : (
        <div>Loading...</div>
    );
};

export default PostDetail;