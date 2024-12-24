import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/mapBox.css';
import mapboxgl from 'mapbox-gl';
import mapboxglSupported from '@mapbox/mapbox-gl-supported';
import config from '../config';
import axios from 'axios';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { PolygonLayer } from '@deck.gl/layers';
import { v4 as uuidv4 } from 'uuid';
import { Polygon, addPolygon, fetchPolygons } from '../redux/actions/polygonActions';
import { useDispatch, useSelector } from 'react-redux';

const Map: React.FC = () => {
    const polygons = useSelector((state: any) => state.PolygonReducer.polygons);
    const dispatch = useDispatch();
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [polygonData, setPolygonData] = useState<Polygon[]>([]);
    const [currentPolygon, setCurrentPolygon] = useState<Polygon>({ id: '', title: '', coordinates: [] });
    const [isDrawing, setIsDrawing] = useState(false);

    const apiUrl = config.apiUrl;
    mapboxgl.accessToken = 'pk.eyJ1IjoibW91c3NhZ3JhcGhpY3MiLCJhIjoiY200eTl3NTY3MHhrNjJtczhuM2RpeTVnYiJ9._3QUVKdPVLGezG3pAVtgzA'; // Replace with your actual token
    const overlayRef = useRef<MapboxOverlay | null>(null);

    useEffect(() => {
        dispatch(fetchPolygons() as any);
    }, [dispatch]);

    useEffect(() => {
        if (!mapContainer.current) return;

        if (!mapboxglSupported.supported()) {
            setError('WebGL is not supported on your browser.');
            return;
        }

        const initializeMap = async () => {
            const token = localStorage.getItem('token');
            const styleUrl = `${apiUrl}/mapbox-style/getMap`;
            try {
                const response = await axios.get(styleUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const style = await response.data;
                const newMap = new mapboxgl.Map({
                    container: mapContainer.current as HTMLElement,
                    style,
                    center: [31.54, 30.59],
                    zoom: 9,
                });
                newMap.on('load', () => {
                    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
                    newMap.addControl(new mapboxgl.FullscreenControl(), 'top-right');
                    newMap.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
                });
                setMap(newMap);
                setMapLoaded(true);
            } catch (error) {
                setError((error as any).message);
            }
        };

        if (!mapLoaded) initializeMap();
    }, [apiUrl]);

    useEffect(() => {
        if (map) {
            if (overlayRef.current) {
                map.removeControl(overlayRef.current);
                overlayRef.current = null;
            }

            const overlay = new MapboxOverlay({
                layers: [
                    new PolygonLayer({
                        id: 'polygon-layer',
                        data: polygonData,
                        getPolygon: (d) => d.coordinates,
                        filled: true,
                        lineWidthMinPixels: 2,
                        getFillColor: [255, 100, 0, 128],
                        getLineColor: [0, 0, 0],
                        visible: true,
                    }),
                ],
            });
            map.addControl(overlay);
            overlayRef.current = overlay;
        }
        return () => {
            if (overlayRef.current) {
                map?.removeControl(overlayRef.current);
                overlayRef.current = null;
            }
        };
    }, [map, polygonData]);

    useEffect(() => {
        if (map && isDrawing) {
            map.on('click', (e) => {
                if (isDrawing) {
                    const { lng, lat } = e.lngLat;
                    setCurrentPolygon((ploygon) => ({
                        ...ploygon,
                        coordinates: [...ploygon.coordinates, [lng, lat]]
                    })
                    );
                    if (currentPolygon.coordinates.length > 2)
                        setPolygonData([...polygonData, currentPolygon]);
                }
            });
        }
    }, [map, isDrawing]);

    return (
        <div style={{position:'relative', display: 'flex', height: '95%',width:'100%' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                {error && <div>{error}</div>}
                <div
                    ref={mapContainer}
                    className="map-container"
                    style={{ height: '100%', width: '100%' }}
                ></div>
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <select onChange={(e) => {
                        const selectedPolygon = polygons.find((polygon: Polygon) => polygon.id === e.target.value);
                        if (selectedPolygon) {
                            setPolygonData([...polygonData, selectedPolygon]);
                        }
                    }}>
                        <option value="0">Select Polygon</option>
                        {polygons.map((polygon: Polygon) => (
                            <option key={polygon.id} value={polygon.id}>
                                {polygon.title}
                            </option>
                        ))}
                    </select>
                    <button 
                        onClick={() => {
                            if (isDrawing && currentPolygon.coordinates.length > 2) {
                                setPolygonData([...polygonData, currentPolygon]);
                                dispatch(addPolygon(currentPolygon) as any);
                            }
                            else {
                                setCurrentPolygon({ id: uuidv4(), title: `Polygon_${Date.now()}`, coordinates: [] });
                                setPolygonData([]);
                            }
                            setIsDrawing(!isDrawing);
                        }}
                    >
                        {isDrawing ? 'End Polygon' : 'Start Polygon'}
                    </button>
                    <span style={{fontSize:'small'}}> To create a new polygon click Start Polygon button then click on the map at polygon points then click End Polygon button</span>
                </div>
            </div>
        </div>
    );
};

export default Map;
