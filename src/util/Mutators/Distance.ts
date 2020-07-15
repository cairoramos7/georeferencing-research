export const distanceInMeters = (value: number): number => {
	if (value === 0) {
		return 0;
	}

	return value * 1000;
};

export const distanceToHuman = (distance: number): string => {
	if (distance > 1000) {
		const kilometers = distance / 1000;
		const meters = distance.toFixed(3).toString().split('.');

		return `${kilometers.toFixed(0)} km ${meters[1] || 0} meters`;
	}

	return `${Math.round(distance)} meters`;
};
