import { Text, TouchableOpacity, View } from 'react-native';
import { StaticScreenProps, useNavigation } from '@react-navigation/native';

import type { AppNavigationProp } from '@/routes';
import { usePostQuery } from '@/queries/posts';

type PostProps = StaticScreenProps<{
	post_id: number;
}>;

function Internal({ post_id }: PostProps['route']['params']) {
	const {
		data: post,
		isLoading,
		isSuccess,
		isError,
		error,
	} = usePostQuery(post_id);

	if (isLoading) {
		return <Text>Loading</Text>;
	}

	if (isError || !isSuccess) {
		return <Text>An error happened {error?.message}</Text>;
	}

	return (
		<View>
			<Text>Post: {post.title}</Text>
			<Text>by user with id {post.userId}</Text>
			<Text>{post.body}</Text>
		</View>
	);
}

export default function Post({ route }: PostProps) {
	const navigation = useNavigation<AppNavigationProp>();

	return (
		<View className="flex-1 m-safe">
			<TouchableOpacity
				onPress={() => {
					navigation.popTo('Posts');
				}}
			>
				<Text>Posts</Text>
			</TouchableOpacity>

			<Internal post_id={route.params.post_id} />
		</View>
	);
}
