export const distanceInMeters = (value: number): number => {
	if (value === 0) {
		return 0;
	}

	return value * 1000;
};

export const distanceToHuman = (distance: number): string => {
	if (distance > 1000) {
		const kilometers = distance / 1000;

		return `${kilometers} km ${Math.round(distance)} meters`;
	}

	return `${Math.round(distance)} meters`;
};
