const TrackList = (props) => {
    // Let's ensure we have data to work with before adding functionality!
    console.log(props);

    return (
        <div>
            <h1>Track List</h1>
            <div>
                {!props.tracks.length ? (
                    <h2>No Tracks Yet!</h2>
                ) : (
                    <ul>
                        {props.tracks.map((track) => (
                            <li
                                key={track._id}
                                style={{ cursor: 'pointer', color: "#646CFF" }}
                                onClick={() => props.handleSelect(track)}
                            >
                                {track.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Track'}
      </button>
        </div>
    );
}

export default TrackList;