import React from "react";
import { View, Text } from "react-native";

// eslint-disable-next-line no-unused-vars

import styles from "./styles";
import { RendeErrorI } from "./types";

const RenderError = (props: RendeErrorI) => {
	const { error } = props;
	return (
		<View style={styles.container}>
			<Text style={styles.textError}>{error}</Text>
		</View>
	);
};

export default RenderError;
