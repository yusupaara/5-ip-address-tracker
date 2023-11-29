import React, { useState } from 'react';
import SimpleMap from './components/renderMap';
import DetectLocation from './components/detectLocation';

function App() {
  const [mapLocation, setMapLocation] = useState(null);

  return (
    <div>
      <DetectLocation setMapLocation={setMapLocation} />
      <SimpleMap mapLocation={mapLocation} />
    </div>
  );
}
export default App;