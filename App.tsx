import { P1_LOCATION, DISTANCE_TO_CHECKOUT } from "@constants/Geolocation";
import Layout from "@constants/Layout";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BgTracking from "@screens/BgTracking";
import Home from "@screens/Home";
import { DispatchNotification } from "@util/Notification/Notification";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import * as TaskManager from "expo-task-manager";
import { Haversine, GpsPoint } from "haversine-position";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { enableScreens } from "react-native-screens";

const LOCATION_TASK_NAME = "background-location-task";

const Stack = createStackNavigator();

type AppProps = {
	skipLoadingScreen: boolean;
	isLoggedIn: boolean;
};

enableScreens();

const App = (props: AppProps) => {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);

	useEffect(() => {
		// setLoadingComplete(true);
		async function loadResourcesAndDataAsync() {
			try {
				// Prevent native splash screen from autohiding
				await SplashScreen.preventAutoHideAsync();
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				await SplashScreen.hideAsync();
				setLoadingComplete(true);
			}
		}

		loadResourcesAndDataAsync();

		return () => {
			setLoadingComplete(false);
		};
	}, []);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				<SafeAreaView style={styles.SafeAreaContainer}>
					<NavigationContainer>
						<Stack.Navigator
							initialRouteName="Home"
							screenOptions={{
								headerShown: false,
							}}
						>
							<Stack.Screen name="Home" component={Home} />
							<Stack.Screen name="BgTracking" component={BgTracking} />
						</Stack.Navigator>
					</NavigationContainer>
				</SafeAreaView>
			</View>
		);
	}
};

TaskManager.defineTask(
	LOCATION_TASK_NAME,
	({ data: { eventType, region }, error }) => {
		if (error) {
			console.log(error);
			// check `error.message` for more details.
			return;
		}
		if (eventType === Location.GeofencingEventType.Enter) {
			console.log("You've entered region:", region);
		} else if (eventType === Location.GeofencingEventType.Exit) {
			console.log("You've left region:", region);
		}
	}
);

/* TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
	if (error) {
		console.log(error.message);
		// Error occurred - check `error.message` for more details.
		return;
	}
	if (data) {
		// eslint-disable-next-line
		const { locations } = data;

		if (locations.length) {
			const {
				coords: {
					latitude: latOriginBackground,
					longitude: lngOriginBackground,
				},
			} = locations.pop();

			const originBackground: GpsPoint = {
				lat: latOriginBackground,
				lng: lngOriginBackground,
			};

			const distanceInMetersBackground = Haversine.getDistance(
				originBackground,
				P1_LOCATION
			);

			// eslint-disable-next-line no-console
			console.log("distanceInMetersBackground:", distanceInMetersBackground);

			if (Math.round(distanceInMetersBackground) < DISTANCE_TO_CHECKOUT) {
				DispatchNotification({
					title: "Checkout",
					body: "Checkout now?",
				});

				// TaskManager.unregisterAllTasksAsync();
			}
		}
	}
}); */

const styles = StyleSheet.create({
	container: {
		paddingTop: Layout.statusBarPaddingTop,
		borderWidth: 1,
	},
	SafeAreaContainer: {
		height: "100%",
	},
});

export default App;
