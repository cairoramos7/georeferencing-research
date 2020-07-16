import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const LOCATION_TASK_NAME = 'background-location-task';

export default function App() {
	const handleLocation = async (): Promise<void> => {
		const { status } = await Location.requestPermissionsAsync();
		if (status === 'granted') {
			await Location.startGeofencingAsync(LOCATION_TASK_NAME, [
				{
					identifier: '5',
					latitude: 34.17,
					longitude: -118.4,
					radius: 50,
					notifyOnEnter: true,
					notifyOnExit: true,
				},
			]).then((response) => {
				console.log(response);
			});
			// await Location.watchPositionAsync(LOCATION_SETTINGS, (location) => {
			// 	const {
			// 		coords: { latitude, longitude },
			// 	} = location;

			// 	const latitudeDelta = latitude - longitude;
			// 	const longitudeDelta = latitudeDelta * ASPECT_RATIO;

			// 	console.log({
			// 		...location,
			// 		coords: {
			// 			...location.coords,
			// 			latitudeDelta,
			// 			longitudeDelta,
			// 		},
			// 	});
			// });

			return;
		}

		alert('Permission to access location was denied');
	};

	const handleDisableLocation = () => {
		TaskManager.unregisterAllTasksAsync();
	};

	return (
		<View style={styles.container}>
			<Button
				onPress={handleLocation}
				title="Enable Background Location"
			/>
			<Button
				onPress={handleDisableLocation}
				title="Disable Background Location"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
