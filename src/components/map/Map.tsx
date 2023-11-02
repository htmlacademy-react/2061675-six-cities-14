import React, { useEffect, useRef } from 'react';
import { Location, OfferType } from '../../types/';
import { Icon, layerGroup, Marker } from 'leaflet';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from '../../const/urlMarkers.ts';
import useMap from '../../hooks/useMap.ts';

type MapProps = {
  city: Location;
  points: OfferType[];
  selectedPoint?: OfferType['id'] | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
export const Map: React.FC<MapProps> = ({city, points, selectedPoint}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker.setIcon(selectedPoint !== null && point.id === selectedPoint ? currentCustomIcon : defaultCustomIcon).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <div
      style={{height: '100%', width: '100%'}}
      ref={mapRef}
      id='map'
    >
    </div>
  );
};
