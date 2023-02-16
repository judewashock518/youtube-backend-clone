
const VideoPlayer = (props) => {
    return (
        <div className="videoplayer">
            <iframe
              id="ytplayer"
              type="text/html"
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${props.videoid}/`}
              frameborder="0"
            ></iframe>
          </div>
    )
}

export default VideoPlayer;
