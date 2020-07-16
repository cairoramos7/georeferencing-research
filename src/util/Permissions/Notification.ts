import * as Permissions from 'expo-permissions';

export const NotificationPermission = async (): Promise<boolean> => {
	const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

	if (status !== 'granted') {
		console.log(
			'Hey! You might want to enable notifications for my app, they are good.'
		);
		return false;
	}

	return true;
};
