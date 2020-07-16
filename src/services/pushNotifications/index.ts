import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

interface PushNotificationsInterface {
	deviceId: string;
	deviceType: string;
}

export const registerForPushNotificationsAsync = async (): Promise<PushNotificationsInterface | null> => {
	try {
		// Verify Permissions
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);

		// If not granted ask again
		if (existingStatus !== 'granted') {
			await Permissions.askAsync(Permissions.NOTIFICATIONS);
		}

		// Retrive user token
		const token = await Notifications.getExpoPushTokenAsync();

		// Get Device
		const device = Platform.OS;

		if (Platform.OS === 'android') {
			Notifications.createChannelAndroidAsync('default', {
				name: 'default',
				sound: true,
				priority: 'max',
				vibrate: [0, 250, 250, 250],
			});
		}

		// returns token and user/device info
		return { deviceId: token, deviceType: device };
	} catch (error) {
		console.log(error.message);

		return null;
	}
};
