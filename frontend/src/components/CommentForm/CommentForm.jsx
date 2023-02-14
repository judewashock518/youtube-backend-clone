import React, { useState } from 'react';
import './CommentForm.css'


const CommentForm = (props) => {

    const [comment, setComment] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        let newEntry = {
            comment: comment
        };
        console.log(newEntry);
        props.addNewEntryProperty(newEntry)
    }


    return ( 
        <form onSubmit={handleSubmit}>
            <div className='container_fluid'>
                <div className="comment_flex_box">
                <textarea className="text_box" type='text' rows='4'value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
                <button type='submit' placeholder='Add a comment...' className='btn btn-primary' style={{'margin-right': '10rem'}}>Comment</button>
                </div>
            </div>
        </form>

    );
}
 
export default CommentForm;