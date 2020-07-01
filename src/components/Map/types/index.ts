import { CoordinatesInterface } from "@util/Types/Coodinates";

export interface LocationData {
	coords: CoordinatesInterface;
	timestamp: number;
}

export interface LocationI extends LocationData {}

export interface LocationToReachI {
	coords: CoordinatesInterface;
}

export interface CoordinatesI {
	latitude: number;
	longitude: number;
}

export interface MapI {
	showsUserLocation?: boolean;
	userLocation: LocationData;
	locationToReach: LocationToReachI;
	pointersToFix?: ("userLocation" | "toReach")[];
	coordinatesToFix: CoordinatesI[] | null;
	initialRegion: LocationToReachI;
}
