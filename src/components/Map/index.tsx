import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import { getAtmsGeoByCurrency } from '@/api/getAtmsGeoByCurrency';

import styles from './styles.module.scss';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

interface MapProps {
  startPos: {
    lng: number;
    lat: number;
  };
  zoom: number;
  currency: string;
}

export const Map = ({ startPos, zoom, currency }: MapProps) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapMarkers = useRef([]);

  useEffect(() => {
    const addMarkers = async () => {
      if (mapMarkers.current.length >= 1) {
        mapMarkers.current.forEach((marker) => marker.remove());
        mapMarkers.current = [];
      }
      const geoCoords = await getAtmsGeoByCurrency(currency, 50);
      geoCoords.forEach((item) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([item.longitude, item.latitude])
          .addTo(map.current);
        mapMarkers.current.push(marker);
      });
    };
    if (currency) {
      addMarkers();
    }
  }, [currency]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [startPos.lng, startPos.lat],
      zoom,
    });
  });
  return (
    <div>
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  );
};
