import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { AppNavigationProp } from '@/routes';

type PostProps = StaticScreenProps<{
	post_id: number;
}>;

export default function Post({ route }: PostProps) {
	const navigation = useNavigation<AppNavigationProp>();

	return (
		<View style={styles.container}>
			<Text>Post {route.params.post_id}</Text>
			<TouchableOpacity
				onPress={() => {
					navigation.popTo('Posts');
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
