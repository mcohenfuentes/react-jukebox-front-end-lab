import { useState, useEffect } from 'react';
import './App.css'
import * as trackService from './services/trackService'
import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetail/TrackDetail';
import TrackForm from './components/TrackForm/TrackForm';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    setIsFormOpen(false);
  }

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      // Call petService.create, assign return value to newPet
      const newTrack = await trackService.create(formData);

      if (newTrack.err) {
        throw new Error(newTrack.err);
      }
      setTracks([newTrack, ...tracks]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

 
 

  return (
    <>
      <TrackList 
      tracks={tracks} 
      handleSelect={handleSelect}
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
      <TrackForm handleAddTrack={handleAddTrack} />
    ) : (
      <TrackDetail selected={selected} />
    )}
    </>
  );
}


export default App;
