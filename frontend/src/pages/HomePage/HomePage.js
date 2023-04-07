import React from "react";
import { useEffect, useState } from "react";
import CommentForm from "../../components/CommentForm/CommentForm";
import CommentList from "../../components/CommentList/CommentList";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import SearchBar from "../../components/SearchBar/SearchBar";
import RelatedVideos from "../../components/RelatedVideos/RelatedVideos";
import SearchPage from "../../components/SearchPage/SearchPage";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import KEY from "../../components/key";
import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [videoData, setVideoData] = useState([]);
  const [query, setQuery] = useState("Bob Ross");
  const [videoid, setVideoId] = useState("d05tQrhNMkA");
  const [relatedvideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  console.log(query);

  const getEntries = async () => {
    await axios.get(`http://127.0.0.1:8000/api/comments/by_video_id/${videoid}/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then (res => setComments(res.data))
  };

  const addNewEntry = async (entry) => {
    await axios.post(`http://127.0.0.1:8000/api/comments/by_video_id/${videoid}/`, entry, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then (r => getEntries())
  };

  function getVideoData(event) {
    event.preventDefault();
    let response = videoData.filter((video) => {
      if (
        video.snippet.title.toLowerCase().includes(query) ||
        video.snippet.description.toLowerCase().includes(query)
      ) {
        return true;
      } else {
        return false;
      }
    });
    console.log(response);
    console.log(query);
    getVideoData(query);
  }

  const relatedVideos = async () => {
    await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoid}&type=video&key=${KEY}&part=snippet`)
    .then(response => setRelatedVideos(response.data.items))
  }

  useEffect(() => {
    getVideoData()
  }, []);

  function submitSearchTerm(e){
    e.preventDefault()
    getVideoData()
  }
  async function getVideoData() {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${KEY}&type=video&maxResults=5&part=snippet`
    );
    setVideoData(response.data.items);
    console.log(response.data.items);
  }

  return (
    <div className = 'container-fluid'>
      <div className = 'row'>
      <div className='column'>
      <div className='border-box'>
      <div className='border-box'><h2>Search Bar:</h2>
      <SearchBar query= {query} setQuery= {setQuery} submitSearchTerm = {submitSearchTerm}/>
      </div>
      <VideoPlayer videoid = {videoid}/>
      <CommentForm addNewEntry={addNewEntry} videoid={videoid} />
      <button type='submit' className='seecomments-button' onClick={() => getEntries()}>see comments</button>
      <button onClick={() => relatedVideos()} style={{'margin-left': '1rem'}}>related videos</button>
      <CommentList parentEntries={comments}/>
      <div className='border-box'><h2>search results:</h2>
      <SearchPage videoData={videoData} setVideoId={setVideoId}/>
      </div>
      </div>
      </div>
      <div className='column'>
      <div className='border-box'>
      <h2>Related Videos:</h2>
      <RelatedVideos relatedvideos={relatedvideos} setVideoId={setVideoId} />
      </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
