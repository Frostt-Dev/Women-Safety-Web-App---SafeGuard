import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { SafeZone, SafePlace } from '../types';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useLanguage } from '../contexts/LanguageContext';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
    center: [number, number];
    zoom?: number;
    safeZones?: SafeZone[];
    safePlaces?: SafePlace[];
    userLocation?: [number, number];
}

export function MapView({
    center,
    zoom = 14,
    safeZones = [],
    safePlaces = [],
    userLocation,
}: MapViewProps) {
    const { t, language } = useLanguage();

    return (
        <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
            <MapContainer
                center={center}
                zoom={zoom}
                className="w-full h-full z-0"
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User Location */}
                {userLocation && (
                    <Marker position={userLocation}>
                        <Popup>
                            <div className="text-center">
                                <p className="font-semibold">{t('your_location')}</p>
                            </div>
                        </Popup>
                    </Marker>
                )}

                {/* Safe and Unsafe Zones */}
                {safeZones.map((zone) => (
                    <Circle
                        key={zone.id}
                        center={[zone.center.lat, zone.center.lng]}
                        radius={zone.radius}
                        pathOptions={{
                            color: zone.type === 'safe' ? '#22c55e' : '#ef4444',
                            fillColor: zone.type === 'safe' ? '#22c55e' : '#ef4444',
                            fillOpacity: 0.2,
                        }}
                    >
                        <Popup>
                            <div>
                                <p className="font-semibold">{zone.name}</p>
                                <p className="text-sm text-gray-600">
                                    {language === 'hi' ? zone.description_hi || zone.description : zone.description}
                                </p>
                            </div>
                        </Popup>
                    </Circle>
                ))}

                {/* Safe Places */}
                {safePlaces.map((place) => (
                    <Marker key={place.id} position={[place.location.lat, place.location.lng]}>
                        <Popup>
                            <div className="min-w-[200px]">
                                <p className="font-semibold">
                                    {language === 'hi' ? place.name_hi || place.name : place.name}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">{place.type.replace('_', ' ')}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {language === 'hi' ? place.address_hi || place.address : place.address}
                                </p>
                                {place.phone && (
                                    <a
                                        href={`tel:${place.phone}`}
                                        className="text-sm text-primary-600 hover:underline mt-1 block"
                                    >
                                        {place.phone}
                                    </a>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
