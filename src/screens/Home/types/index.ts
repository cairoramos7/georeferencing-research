import { CoordinatesInterface } from '@util/Types/Coodinates';

export interface LocationData {
	coords: CoordinatesInterface;
	timestamp: number;
}

export interface LocationI extends LocationData {}

export interface LocationToReachI {
	coords: CoordinatesInterface;
}
