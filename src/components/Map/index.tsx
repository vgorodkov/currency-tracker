import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';

import { getAtmsGeoByCurrency } from '@/api/getAtmsGeoByCurrency';

import styles from './styles.module.scss';
import { MapProps } from './types';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

export class Map extends Component<MapProps> {
  private mapContainer: React.RefObject<HTMLDivElement>;

  private map: mapboxgl.Map | null;

  private mapMarkers: mapboxgl.Marker[];

  constructor(props: MapProps) {
    super(props);
    this.mapContainer = React.createRef();
    this.map = null;
    this.mapMarkers = [];
  }

  componentDidMount() {
    const { startPos, zoom } = this.props;
    if (!this.map) {
      this.map = new mapboxgl.Map({
        container: this.mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [startPos.lng, startPos.lat],
        zoom,
      });
      this.addMarkers();
    }
  }

  componentDidUpdate(prevProps: MapProps) {
    const { currency } = this.props;

    if (currency && prevProps.currency !== currency) {
      this.addMarkers();
    }
  }

  async addMarkers() {
    const { currency } = this.props;

    if (this.mapMarkers.length >= 1) {
      this.mapMarkers.forEach((marker) => marker.remove());
      this.mapMarkers = [];
    }
    const geoCoords = await getAtmsGeoByCurrency(currency, 50);
    geoCoords.forEach((item) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([item.longitude, item.latitude])
        .addTo(this.map!);
      this.mapMarkers.push(marker);
    });
  }

  render() {
    return <div ref={this.mapContainer} className={styles.mapContainer} />;
  }
}
