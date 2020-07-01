import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "flex-end",
		alignItems: "center",
		overflow: "hidden",
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#CCC",
		elevation: 3,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	latlng: {
		width: 200,
		alignItems: "stretch",
	},
});
