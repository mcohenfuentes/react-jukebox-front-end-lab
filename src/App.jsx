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

  const handleFormView = (track) => {
    if (!track._id) setSelected(null);
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

 
  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId);
  
      if (updatedTrack.err) {
        throw new Error(updatedTrack.err);
      }
  
      const updatedTrackList = tracks.map((track) => (
        track._id !== updatedTrack._id ? track : updatedTrack
      ));
      setTracks(updatedTrackList);
      // If we don't set selected to the updated pet object, the details page will
      // reference outdated data until the page reloads.
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);

      if (deletedTrack.err) {
        throw new Error(deletedTrack.err);
      }

      setTracks(tracks.filter((track) => track._id !== deletedTrack._id));
      setSelected(null);
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
      <TrackForm handleAddTrack={handleAddTrack} selected={selected} handleUpdateTrack={handleUpdateTrack}/>
    ) : (
      <TrackDetail selected={selected} handleFormView={handleFormView} handleDeleteTrack={handleDeleteTrack}/>
    )}
    </>
  );
}


export default App;
