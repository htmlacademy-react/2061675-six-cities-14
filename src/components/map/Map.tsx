import React, { useRef } from 'react';

export const Map: React.FC = () => {
  const mapRef = useRef(null);

  return (
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >
    </div>
  );
};
