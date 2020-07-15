import React, { useRef, useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { MapViewProps } from "react-native-maps";

import Markers from "./components/Markers";
import styles from "./styles";
import { MapI } from "./types";

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const Map = ({
	showsUserLocation,
	userLocation,
	locationToReach,
	pointersToFix,
	coordinatesToFix,
	initialRegion,
}: MapI) => {
	const [mapReady, setMapReady] = useState<boolean>(false);
	const mapRef = useRef<MapViewProps | any>(null);

	// eslint-disable-next-line
	const handleFocusPointers = (pointers: string[]): void => {
		if (mapRef && mapRef.current) {
			const mapReference = mapRef.current || null;
			if (mapReference) {
				mapReference.fitToSuppliedMarkers(pointers, true);
			}
		}
	};

	const handleFocusCoordinates = (
		coordinates: { latitude: number; longitude: number }[]
	): void => {
		if (mapRef && mapRef.current) {
			const mapReference = mapRef.current || null;
			if (mapReference) {
				mapReference.fitToCoordinates(coordinates, {
					edgePadding: DEFAULT_PADDING,
					animated: true,
				});
			}
		}
	};

	const handleMapReady = (ready: boolean): void => {
		setMapReady(ready);
	};

	useEffect(() => {
		if (coordinatesToFix) {
			handleFocusCoordinates(coordinatesToFix);
		}
	}, [coordinatesToFix]);

	useEffect(() => {
		return () => {
			handleMapReady(false);
		};
	}, []);

	const initialRegionCoords = {
		...initialRegion.coords,
	};

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				showsUserLocation={showsUserLocation}
				initialRegion={{
					...initialRegionCoords,
					latitudeDelta: 0,
					longitudeDelta: 0,
				}}
				onMapReady={() => {
					setTimeout(() => {
						handleMapReady(true);
					}, 500);
				}}
				provider="google"
			>
				{mapReady ? (
					<>
						{userLocation ? (
							<Markers
								key="userLocation"
								identifier="userLocation"
								coordinate={{ ...userLocation.coords }}
								title="My Location"
							/>
						) : null}
						{locationToReach ? (
							<Markers
								key="toReach"
								identifier="toReach"
								coordinate={{ ...locationToReach.coords }}
								// tracksViewChanges
								title="To Reach"
							/>
						) : null}
					</>
				) : null}
			</MapView>
		</View>
	);
};

export default Map;
