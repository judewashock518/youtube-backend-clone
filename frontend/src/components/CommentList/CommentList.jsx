import Comment from '../Comment/Comment';


const CommentList = (props) => {
    return ( 
      <ul>
        {props.parentEntries.map((entry) => <Comment entry={entry}/>)}
      </ul>

    );
}
    
export default CommentList;