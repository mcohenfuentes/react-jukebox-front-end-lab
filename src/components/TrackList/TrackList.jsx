const TrackList = (props) => {
    // Let's ensure we have data to work with before adding functionality!
    console.log(props);
  
    return (
        <div>
          <h1>Track List</h1>
          <div>
            <ul>
              {props.tracks.map((track) => (
                <li key={track._id}>{track.title}</li>
              ))}
            </ul>
          </div>
        </div>
      );}
  
  export default TrackList;