
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
        <h2>Artist: {props.selected.artist}</h2>
      </div>
    );
  };



export default TrackDetail; 