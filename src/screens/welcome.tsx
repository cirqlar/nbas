import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
	const navigation = useNavigation();

	return (
		<View className="flex-1 items-center justify-center">
			<Text>Welcome</Text>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Posts');
				}}
			>
				<Text>Posts</Text>
			</TouchableOpacity>
		</View>
	);
}
