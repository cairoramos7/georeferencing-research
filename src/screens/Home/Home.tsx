/* eslint-disable @typescript-eslint/no-unused-vars */
import Map from "@components/Map";
import RenderError from "@components/RenderError";
import RenderLatLng from "@components/RenderLatLng";
import {
	LOCATION_SETTINGS,
	ASPECT_RATIO,
	DISTANCE_TO_CHECKOUT,
	LOCATION_TO_REACH,
	P1_LOCATION,
} from "@constants/Geolocation";
import { distanceToHuman } from "@util/Mutators/Distance";
import { NotificationPermission } from "@util/Permissions/Notification";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Haversine, GpsPoint } from "haversine-position";
import React, { useEffect, useState } from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import { LocationI } from "./types";

const LOCATION_TASK_NAME = "background-location-task";

const Home = () => {
	const [alertPresent, setAlertPresent] = useState<boolean>(false);

	const [location, setLocation] = useState<LocationI>({
		coords: {
			latitude: 0,
			longitude: 0,
		},
		timestamp: 0,
	});

	const [distance, setDistance] = useState<number>(0);

	const [checkout, setCheckout] = useState<boolean>(false);

	const [useBackgroundLocation, setUseBackgroundLocation] = useState<boolean>(
		false
	);

	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const handleErrorMsg = (error: string | null): void => {
		if (error !== errorMsg) {
			setErrorMsg(error);
		}
	};

	const handleBackgroundLocation = async () => {
		if (!useBackgroundLocation) {
			const { status } = await Location.requestPermissionsAsync();
			if (status === "granted") {
				await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
					accuracy: Location.Accuracy.BestForNavigation,
					pausesUpdatesAutomatically: false,
					showsBackgroundLocationIndicator: true,
					foregroundService: {
						notificationTitle: "Geolocation is use",
						notificationBody: "Geolocation is being used in the background",
					},
				});
				setUseBackgroundLocation(true);
			}
		} else {
			TaskManager.unregisterAllTasksAsync();
			setUseBackgroundLocation(false);
		}
	};

	const handlePositionAsync = async () => {
		const { status } = await Location.requestPermissionsAsync();
		if (status === "granted") {
			await Location.watchPositionAsync(LOCATION_SETTINGS, (location) => {
				handleErrorMsg(null);

				const {
					coords: { latitude, longitude },
				} = location;

				const latitudeDelta = latitude - longitude;
				const longitudeDelta = latitudeDelta * ASPECT_RATIO;

				setLocation({
					...location,
					coords: {
						...location.coords,
						latitudeDelta,
						longitudeDelta,
					},
				});
			});

			return;
		}

		handleErrorMsg("Permission to access location was denied");
	};

	const handleConfirmCheckOut = (value: number) => {
		if (!alertPresent) {
			if (value && Math.round(value) < DISTANCE_TO_CHECKOUT && !checkout) {
				setAlertPresent(true);
				Alert.alert(
					"You Came",
					"Checkout Now?",
					[
						{
							text: "Cancel",
							onPress: () => {
								setCheckout(false);
								setAlertPresent(false);
							},
							style: "cancel",
						},
						{
							text: "OK",
							onPress: () => {
								setCheckout(true);
								setAlertPresent(false);
							},
						},
					],
					{ cancelable: false }
				);
			} else {
				setAlertPresent(false);
			}
		}
	};

	const handleDistanceBetweenCoordinates = (coodinates: LocationI) => {
		const {
			coords: { latitude: latOrigin, longitude: lngOrigin },
		} = coodinates;

		const origin: GpsPoint = {
			lat: latOrigin,
			lng: lngOrigin,
		};

		const distanceInMeters = Haversine.getDistance(origin, P1_LOCATION);

		setDistance(distanceInMeters);
	};

	useEffect(() => {
		handleDistanceBetweenCoordinates(location);
	}, [location]);

	useEffect(() => {
		handleConfirmCheckOut(distance);
	}, [distance]);

	useEffect(() => {
		handlePositionAsync();
		NotificationPermission();
	}, []);

	return (
		<View style={styles.container}>
			{errorMsg ? (
				<RenderError error={errorMsg} />
			) : (
				<>
					<View style={styles.mapContainer}>
						{Object.keys(location).length &&
						Object.keys(LOCATION_TO_REACH).length ? (
							<Map
								initialRegion={location}
								userLocation={location}
								locationToReach={LOCATION_TO_REACH}
								pointersToFix={["toReach", "userLocation"]}
								coordinatesToFix={[location.coords, LOCATION_TO_REACH.coords]}
							/>
						) : null}
					</View>
					<View
						style={[
							styles.detailsContainer,
							{
								flex: !checkout ? 1 : 0.3,
							},
						]}
					>
						<View style={styles.distanceContainerDetails}>
							{checkout ? (
								<Text style={styles.title}>Checked out!</Text>
							) : (
								<>
									<Text style={styles.title}>Distance</Text>
									<Text style={styles.defaultText}>
										{distanceToHuman(distance)}
									</Text>
								</>
							)}
						</View>
						<View style={styles.containerEnableBackgroundLocation}>
							<TouchableOpacity
								onPress={handleBackgroundLocation}
								style={styles.buttonEnableBackgroundLocation}
							>
								<Text style={[styles.defaultText, { color: "white" }]}>
									{useBackgroundLocation
										? "Disable Background Location"
										: "Enable Background Location"}
								</Text>
							</TouchableOpacity>
						</View>
						{!checkout && !useBackgroundLocation ? (
							<View style={styles.coordinatesContainerDetails}>
								<RenderLatLng title="My Location" coords={location.coords} />
								<RenderLatLng
									title="Location Reach"
									coords={LOCATION_TO_REACH.coords}
								/>
							</View>
						) : null}
					</View>
				</>
			)}
		</View>
	);
};

export default Home;
