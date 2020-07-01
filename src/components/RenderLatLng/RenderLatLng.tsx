import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import { RenderLatLngI } from "./types";

const RenderLatLng = (props: RenderLatLngI) => {
	const {
		title,
		coords: { latitude, longitude },
	} = props;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.containerCoordinates}>
				<Text style={styles.subTitle}>Lat</Text>
				<Text style={styles.defaultText}>{latitude}</Text>
			</View>
			<View style={styles.containerCoordinates}>
				<Text style={styles.subTitle}>Lng</Text>
				<Text style={styles.defaultText}>{longitude}</Text>
			</View>
		</View>
	);
};

export default RenderLatLng;
