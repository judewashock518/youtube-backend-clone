const RelatedVideos = ({relatedvideos, setVideoId}) => {
  return (
    <div className="form-grid">
      {relatedvideos.map((video) => {
        return (
          <div className="related-videos">
            <p>{video.snippet.title}</p>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt="videos"
              onClick={() => setVideoId(video.id.videoId)}
            ></img>
            <p>{video.snippet.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RelatedVideos;
