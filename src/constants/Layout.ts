import { StatusBar, Dimensions } from 'react-native';

const { height, width, scale, fontScale } = Dimensions.get('window');

const statusBarHeight = StatusBar.currentHeight || 0;
const windowHeight = height - statusBarHeight;

export default {
	window: { height: windowHeight, width },
	scale,
	fontScale,
	statusBarPaddingTop: statusBarHeight,
};
