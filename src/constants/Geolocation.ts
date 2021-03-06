import { LocationToReachI } from '@components/Map/types';
import { Accuracy, LocationOptions } from 'expo-location';
import { GpsPoint } from 'haversine-position';

import Layout from './Layout';

const coorindatesSamples = {
	appleCampus: {
		latitude: 37.3317257,
		longitude: -122.0304735,
	},
	deAnza3: {
		latitude: 37.3316403,
		longitude: -122.0324442,
	},
	brunoMartins: {
		latitude: 40.416845137045875,
		longitude: -111.90790810299363,
	},
	cairoRamos: {
		latitude: -16.532787,
		longitude: -50.387638,
	},
};

export const ASPECT_RATIO =
	(Layout.window.width - 10 * 2) / (Layout.window.height / 2);

export const LOCATION_SETTINGS: LocationOptions = {
	accuracy: Accuracy.Highest,
	timeInterval: 300,
	distanceInterval: 0,
};

export const TRACK_COORDS = {
	...coorindatesSamples.cairoRamos,
};

export const LATITUDE_DELTA = TRACK_COORDS.latitude - TRACK_COORDS.longitude;

export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const LOCATION_TO_REACH: LocationToReachI = {
	coords: {
		latitude: TRACK_COORDS.latitude,
		longitude: TRACK_COORDS.longitude,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	},
};

const {
	coords: { latitude: latToReach, longitude: lngToReach },
} = LOCATION_TO_REACH;

export const P1_LOCATION: GpsPoint = {
	lat: latToReach,
	lng: lngToReach,
};

export const DISTANCE_TO_CHECKOUT = 20;
