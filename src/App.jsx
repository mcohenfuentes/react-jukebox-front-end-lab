import { useState, useEffect } from 'react';
import './App.css'
import * as trackService from './services/trackService'
import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetail/TrackDetail';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();
        // Don't forget to pass the error object to the new Error
        if (fetchedTracks.err) {
          throw new Error(fetchedTracks.err);
        }
        setTracks(fetchedTracks);
      } catch (err) {
        // Log the error object
        console.log(err);
      }
    };
    fetchTracks();
  }, []);

  const handleSelect = (track) => {
    setSelected(track)
  }


  return (
    <>
      <TrackList tracks={tracks} handleSelect={handleSelect}/>
      <TrackDetail selected={selected} />
    </>
  );
};


export default App;
