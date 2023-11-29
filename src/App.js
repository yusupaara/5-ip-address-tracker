import React, { useState } from 'react';
import SimpleMap from './components/renderMap';
import DetectLocation from './components/detectLocation';
import SavedHistory from './components/savedHistory';

function App() {
  const [mapLocation, setMapLocation] = useState(null);

  return (
    <div>
      <SavedHistory />
      <DetectLocation setMapLocation={setMapLocation} />
      <SimpleMap mapLocation={mapLocation} />
    </div>
  );
}
export default App;