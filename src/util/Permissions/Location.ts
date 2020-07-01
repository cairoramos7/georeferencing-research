import * as Location from "expo-location";

interface LocationRequestPermissionsAsyncI {
	status: boolean;
	error: string | null;
}

export const LocationRequestPermissionsAsync = async (): Promise<
	LocationRequestPermissionsAsyncI
> => {
	const { status } = await Location.requestPermissionsAsync();
	if (status !== "granted") {
		return {
			status: false,
			error: "Permission to access location was denied",
		};
	}

	return {
		status: true,
		error: null,
	};
};
