import React, { ReactNode } from "react";
import { Marker, MarkerProps } from "react-native-maps";

const Markers = (props: MarkerProps & ReactNode) => {
	const randomKey = (): string => {
		return Math.random().toString(36).substring(7);
	};

	return <Marker key={randomKey()} {...props} />;
};

export default Markers;
