import React, { useState } from 'react';
import SimpleMap from './components/renderMap';
import DetectLocation from './components/detectLocation';
import SideButton from './components/sideButtons';
import SavedHistory from './components/savedHistory';

function App() {
  const [mapLocation, setMapLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const [historyLocation, setHistoryLocation] = useState(null)

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <SideButton setCurrentLocation={setCurrentLocation} openModal={openModal} />
      <SavedHistory isOpen={isOpen} closeModal={closeModal} setHistoryLocation={setHistoryLocation} />
      <DetectLocation setMapLocation={setMapLocation} currentLocation={currentLocation} historyLocation={historyLocation} />
      <SimpleMap mapLocation={mapLocation} />
    </div>
  );
}
export default App;