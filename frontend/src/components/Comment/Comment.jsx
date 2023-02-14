import React, { useState } from "react";
import './Comment.css';

const Comment = (props) => {

  const [isLiked, setIsLiked] = useState(props.entry.isLiked);
  const [isDisliked, setIsDisliked] = useState(props.entry.isDisliked);

  return (
        <div className="comment_border_box">
            <h2>
            <p className="name_space"><strong>{props.entry.name}</strong></p>
            </h2>
            <p className="comment_space">{props.entry.comment}</p>
            <div className='flex_box'>
                <button
                    onClick={() => {
                    setIsLiked(!isLiked);
                    setIsDisliked(false);
                }}
                type="button"
                className={`btn ${isLiked ? "btn-success" : "btn-secondary"}`}
                data-toggle="button"
                aria-pressed="false"
                autocomplete="off"
                style={{ "style": "margin-left", "margin-left" : "1rem", "margin-top" : "1rem;"}}
                >
                    like
                </button>
                <button
                    onClick={() => {
                    setIsDisliked(!isDisliked);
                    setIsLiked(false);
                }}
                type="button"
                className={`btn ${isDisliked ? "btn-danger" : "btn-secondary"}`}
                style={{ "float": "right", "margin-left" : "1rem", "margin-top" : "1rem;"}}
                >
                    dislike
                </button>
            </div>
        </div>

  );
};

export default Comment;