import { useState, useEffect } from "react";

const NowPlaying = ({ selected }) => {
  return (
    <div>
      <h2>Now Playing</h2>
      {selected ? (
        <div>
          <p><strong>Title:</strong> {selected.title}</p>
          <p><strong>Artist:</strong> {selected.artist}</p>
        </div>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default NowPlaying;