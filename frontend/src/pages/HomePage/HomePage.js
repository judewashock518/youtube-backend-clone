import React from "react";
import { useEffect, useState } from "react";
import CommentForm from "../../components/CommentForm/CommentForm";
import CommentList from "../../components/CommentList/CommentList";
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
  const [query, setQuery] = useState("");
  const [videoid, setVideoId] = useState("d05tQrhNMkA");
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

  function filterVideoData(event) {
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

  useEffect(() => {
    // getVideoData()
  }, []);

  async function getVideoData(query = "Bob Ross") {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${KEY}&type=video&maxResults=5&part=snippet`
    );
    setVideoData(response.data.items);
    console.log(response.data.items);
  }

  return (
    <div>
      <div className="videoplayer">
        <iframe
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${videoid}/`}
          frameborder="0"
        ></iframe>
      </div>
      <CommentForm addNewEntry={addNewEntry} videoid={videoid} />
      <button type='submit' className='seecomments-button' onClick={() => getEntries()}>See Comments</button>
    </div>
    // <div className="form-grid">
    //   <form onSubmit={filterVideoData} className='form-grid'>
    //         <div className='form-group'>
    //          <input type='text'
    //          placeholder='search videos...'
    //          className='form-control' value={query} onChange={(event) => setQuery(event.target.value)} />
    //         </div>
    //         <button type='submit' class='btn btn-primary' style={{'margin-top': '1rem'}}>Search</button>
    //   </form>
    //   {videoData.map((video) => {
    //   return (

    //     <div>
    //       <p>{video.snippet.title}</p>
    //     <img src={video.snippet.thumbnails.medium.url} alt="videos"></img>
    //     <p>{video.snippet.description}</p>
    //     </div>

    //   );
    //   })}
    // </div>
  );
};

export default HomePage;

{
  /* <CommentForm addNewEntryProperty={addNewEntry}/>
      <CommentList parentEntries={entries} /> */
}

// const HomePage = () => {
//   // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
//   // The "token" value is the JWT token that you will send in the header of any request requiring authentication
//   //TODO: Add an AddCars Page to add a car for a logged in user's garage
//   const [user, token] = useAuth();
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setCars(response.data);
//       } catch (error) {
//         console.log(error.response.data);
//       }
//     };
//     fetchCars();
//   }, [token]);
//   return (
//     <div className="container">
//       <h1>Home Page for {user.username}!</h1>
//       {cars &&
//         cars.map((car) => (
//           <p key={car.id}>
//             {car.year} {car.model} {car.make}
//           </p>
//         ))}
//     </div>
//   );
// };

// export default HomePage;
