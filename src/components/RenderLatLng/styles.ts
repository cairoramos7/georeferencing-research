import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	coordinatesContainerDetails: {
		flexDirection: 'row',
	},
	container: {
		borderWidth: 1,
		borderColor: '#CCC',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 5,
		borderRadius: 15,
		backgroundColor: '#FFF',
		elevation: 5,
		padding: 15,
		flex: 1,
	},
	containerCoordinates: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	// texts
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	subTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	defaultText: {
		fontSize: 20,
	},
});
