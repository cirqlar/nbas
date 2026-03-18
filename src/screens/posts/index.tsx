import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import UserIcon from '@/icons/UserIcon.svg';
import StarIcon from '@/icons/StarIcon.svg';
import { TPost, usePostsQuery } from '@/queries/posts';
import { useFavouritesStore } from '@/stores/favourites';
import { useState } from 'react';

function Post({ post }: { post: TPost }) {
	const navigation = useNavigation();

	const favourites = useFavouritesStore(state => state.favourites);

	const first_line = post.body
		.slice(0, 120)
		.split('\n')
		.filter(line => line.trim().length !== 0)
		.join('. ');

	const isFavourite = favourites.includes(post.id);

	return (
		<View key={post.id} className="gap-2">
			<Pressable
				className=""
				onPress={() => {
					navigation.navigate('Post', { postId: post.id });
				}}
			>
				{({ pressed }) => (
					<View className="flex-row items-center gap-2">
						<Text
							className={`flex-1 text-lg font-bold capitalize underline ${pressed ? 'opacity-60' : ''}`}
						>
							{post.title}
						</Text>
						{isFavourite && <StarIcon width={20} height={20} />}
					</View>
				)}
			</Pressable>

			<View className="flex-row items-center gap-2">
				<UserIcon width={24} height={24} />
				<Text>User {post.userId}</Text>
			</View>

			<Text className="">{first_line}...</Text>
		</View>
	);
}

function Internal() {
	const [filter, setFilter] = useState(false);

	const {
		data: posts,
		isSuccess,
		error,
		isError,
		isLoading,
	} = usePostsQuery();

	const favourites = useFavouritesStore(state => state.favourites);

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (isError || !isSuccess) {
		if (isError) {
			console.log('Posts Request errored', error);
		} else {
			console.log('Posts isSuccess is false');
		}

		return (
			<View className="flex-1 items-center justify-center">
				<Text>Couldn't load Posts. Please try again later</Text>
			</View>
		);
	}

	const filtered_posts = filter
		? posts.filter(post => favourites.includes(post.id))
		: posts;

	return (
		<>
			<View className="flex-row items-center">
				<Pressable className="flex-1" onPress={() => setFilter(false)}>
					{({ pressed }) => (
						<View
							className={`items-center justify-center rounded-l-lg border border-r-0 border-gray-300 px-3 py-3 ${filter ? '' : 'border-blue-500 bg-blue-500'} ${pressed ? 'opacity-70' : ''}`}
						>
							<Text className={filter ? '' : 'text-white'}>
								All
							</Text>
						</View>
					)}
				</Pressable>
				<Pressable className="flex-1" onPress={() => setFilter(true)}>
					{({ pressed }) => (
						<View
							className={`items-center justify-center rounded-r-lg border border-gray-300 px-3 py-3 ${filter ? 'border-blue-500 bg-blue-500' : ''} ${pressed ? 'opacity-70' : ''}`}
						>
							<Text className={filter ? 'text-white' : ''}>
								Favourites
							</Text>
						</View>
					)}
				</Pressable>
			</View>
			<FlatList
				data={filtered_posts}
				renderItem={({ item }) => <Post post={item} />}
				keyExtractor={item => item.id.toString()}
				contentContainerClassName="gap-3"
			/>
		</>
	);
}

export default function Posts() {
	return (
		<View className="m-safe flex-1 gap-3 px-6">
			<Text className="text-4xl">Posts</Text>

			<Internal />
		</View>
	);
}
