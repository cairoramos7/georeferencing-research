import { Notifications } from "expo";

interface ScheduleLocalNotificationAsyncI {
	title: string;
	body: string;
	ios: {
		sound: boolean;
	};
	android: {
		sound: boolean;
		priority: "min" | "low" | "high" | "max";
		sticky: boolean;
		vibrate: boolean | number[];
	};
}

export const DispatchNotification = ({
	title,
	body,
}: {
	title: string;
	body: string;
}): void => {
	const localNotification: ScheduleLocalNotificationAsyncI = {
		title,
		body, // (string) — body text of the notification.
		ios: {
			// (optional) (object) — notification configuration specific to iOS.
			sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
		},
		// (optional) (object) — notification configuration specific to Android.
		android: {
			sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
			//icon (optional) (string) — URL of icon to display in notification drawer.
			//color (optional) (string) — color of the notification icon in notification drawer.
			priority: "max", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
			sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
			// vibrate: true, // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
			// link (optional) (string) — external link to open when notification is selected.
			vibrate: [0, 250, 250, 250],
		},
	};

	ScheduleLocalNotificationAsync(localNotification);
};

const ScheduleLocalNotificationAsync = (
	localNotification: ScheduleLocalNotificationAsyncI
) => {
	Notifications.scheduleLocalNotificationAsync(localNotification);
};
