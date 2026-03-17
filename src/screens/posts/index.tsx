import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Posts() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text>Posts</Text>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Post', { post_id: 1 });
				}}
			>
				<Text>Post</Text>
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
