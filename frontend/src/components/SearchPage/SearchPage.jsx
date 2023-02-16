const SearchPage = ({videoData, setVideoId}) => {
    return (
        <div className="form-grid">
        {videoData.map((video) => {
        return (
  
          <div className='search-results'>
            <p>{video.snippet.title}</p>
          <img src={video.snippet.thumbnails.medium.url} alt="videos" onClick={()=>setVideoId(video.id.videoId)}></img>
          <p>{video.snippet.description}</p>
          </div>
  
        );
        })}
      </div>
    );
  };


export default SearchPage;
  