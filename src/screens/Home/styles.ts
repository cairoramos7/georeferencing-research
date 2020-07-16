import Layout from '@constants/Layout';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		height: Layout.window.height,
	},
	mapContainer: {
		flex: 1,
		marginHorizontal: 10,
		marginTop: 10,
		borderRadius: 5,
	},
	detailsContainer: {
		flex: 1,
		paddingHorizontal: 5,
		paddingVertical: 10,
	},
	distanceContainerDetails: {
		backgroundColor: '#FFF',
		borderColor: '#CCC',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		marginHorizontal: 5,
		borderRadius: 15,
		elevation: 3,
		paddingVertical: 10,
	},

	coordinatesContainerDetails: {
		display: 'flex',
		flexDirection: 'row',
	},

	// background location
	containerEnableBackgroundLocation: {
		flex: 0,
		elevation: 3,
		backgroundColor: '#7a7a7a',
		marginBottom: 10,
		marginHorizontal: 5,
		borderRadius: 15,
	},
	buttonEnableBackgroundLocation: {
		borderWidth: 1,
		borderColor: '#CCC',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		paddingVertical: 10,
	},

	// texts
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	subTitle: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	defaultText: {
		fontSize: 20,
	},
});
