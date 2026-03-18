import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TPost, usePostsQuery } from '@/queries/posts';

function Post({ post }: { post: TPost }) {
	const navigation = useNavigation();

	return (
		<View key={post.id}>
			<Text>{post.title}</Text>
			<Text>{post.body}</Text>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Post', { post_id: post.id });
				}}
			>
				<Text>View Post</Text>
			</TouchableOpacity>
		</View>
	);
}

function Internal() {
	const {
		data: posts,
		isSuccess,
		error,
		isError,
		isLoading,
	} = usePostsQuery();

	if (isLoading) {
		return <Text>Loading</Text>;
	}

	if (isError || !isSuccess) {
		return <Text>An error happened {error?.message}</Text>;
	}

	return (
		<>
			<Text>Posts</Text>

			<FlatList
				data={posts}
				renderItem={({ item }) => <Post post={item} />}
				keyExtractor={item => item.id.toString()}
			/>
		</>
	);
}

export default function Posts() {
	return (
		<View className="flex-1 m-safe">
			<Internal />
		</View>
	);
}
