import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
	createStaticNavigation,
	StaticParamList,
} from '@react-navigation/native';

import WelcomeScreen from '@/screens/welcome';
import Posts from '@/screens/posts';
import Post from '@/screens/posts/post';

const RootStack = createNativeStackNavigator({
	initialRouteName: 'Welcome',
	screenOptions: {
		headerShown: false,
	},
	screens: {
		Welcome: WelcomeScreen,
		Posts: Posts,
		Post: {
			screen: Post,
			options: { headerShown: true, headerTitle: '' },
		},
	},
});

type RootStackParamList = StaticParamList<typeof RootStack>;
export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export const Navigation = createStaticNavigation(RootStack);
