import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
