const TrackDetail = (props) => {
    // return if props.selected is null
    if (!props.selected) {
      return (
        <div>
          <h1>NO DETAILS</h1>
        </div>
      );
    }
  
    // return statement if props.selected has a truthy value
    return (
      <div>
        <h2>Title: {props.selected.title}</h2>
        <h3>Artist: {props.selected.artist}</h3>
        <div>
        <button onClick={() => props.handleFormView(props.selected)}>
          Edit Track
        </button>
        <button onClick={() => props.handleDeleteTrack(props.selected._id)}>
        Delete Track
      </button>
      <button onClick={() => props.handleNowPlayingTrack(props.selected)}>
       Play Track
      </button>
      </div>
      </div>
      
    );
  };
  
export default TrackDetail;