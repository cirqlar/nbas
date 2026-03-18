import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { StaticScreenProps } from '@react-navigation/native';

import { usePostQuery } from '@/queries/posts';
import StarIcon from '@/icons/StarIcon.svg';
import StarHollowIcon from '@/icons/StarHollowIcon.svg';
import UserIcon from '@/icons/UserIcon.svg';
import {
	addFavourite,
	removeFavourite,
	useFavouritesStore,
} from '@/stores/favourites';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { commentQueryOptions, useCommentsQuery } from '@/queries/comments';

type PostProps = StaticScreenProps<{
	post_id: number;
}>;

function Post({ post_id }: PostProps['route']['params']) {
	const {
		data: post,
		isLoading,
		isSuccess,
		isError,
		error,
	} = usePostQuery(post_id);

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
			console.log('Post Request errored', error);
		} else {
			console.log('Post isSuccess is false');
		}

		return (
			<View className="flex-1 items-center justify-center">
				<Text>Couldn't load Post. Please try again later</Text>
			</View>
		);
	}

	const isFavourite = favourites.includes(post.id);

	return (
		<View className="gap-6">
			<View className="gap-3">
				<Text className="text-3xl font-bold capitalize">
					{post.title}
				</Text>
				<View className="mb-3 flex-row items-center gap-2">
					<UserIcon width={24} height={24} />
					<Text>User {post.userId}</Text>
				</View>

				<View className="gap-2">
					{post.body.split('\n').map((line, index) => (
						<Text key={index} className="text-base">
							{line}
						</Text>
					))}
				</View>

				<View className="-mx-6 flex-row justify-end border-y-2 border-gray-300 px-6 py-3">
					<Pressable
						className=""
						onPress={() => {
							if (isFavourite) {
								removeFavourite(post.id);
							} else {
								addFavourite(post.id);
							}
						}}
					>
						{({ pressed }) => (
							<View
								className={`flex-row items-center gap-2 ${pressed ? 'opacity-70' : ''}`}
							>
								{isFavourite ? (
									<StarIcon width={16} height={16} />
								) : (
									<StarHollowIcon width={16} height={16} />
								)}
								<Text className="text-base">
									{isFavourite ? 'Unfavourite' : 'Favourite'}
								</Text>
							</View>
						)}
					</Pressable>
				</View>
			</View>

			<View className="gap-3">
				<Text className="text-xl font-bold">Comments</Text>
				<Comments post_id={post_id} />
			</View>
		</View>
	);
}

function Comments({ post_id }: PostProps['route']['params']) {
	const {
		data: comments,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useCommentsQuery(post_id);

	if (isLoading) {
		return <Text className="mt-6 text-center">Loading Comments...</Text>;
	}

	if (isError || !isSuccess) {
		if (isError) {
			console.log('Comments Request errored', error);
		} else {
			console.log('Comments isSuccess is false');
		}

		return (
			<Text className="mt-6 text-center">
				Couldn't load comments. Please try again later.
			</Text>
		);
	}

	return (
		<View className="gap-4">
			{comments.map((comment, index) => (
				<View
					key={comment.id}
					className={`gap-2 ${index !== comments.length - 1 ? 'border-b-2 border-gray-300 pb-4' : ''}`}
				>
					<View className="flex-row items-center gap-2">
						<UserIcon width={24} height={24} />
						<Text className="lowercase">{comment.email}</Text>
					</View>
					<Text className="text-lg font-bold">{comment.name}</Text>
					<Text>{comment.body.split('\n').join('. ')}</Text>
				</View>
			))}
		</View>
	);
}

export default function PostScreen({ route }: PostProps) {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchQuery(commentQueryOptions(route.params.post_id));
	}, [queryClient, route.params.post_id]);

	return (
		<ScrollView
			className="mb-safe"
			contentContainerClassName="grow gap-6 px-6 py-6"
		>
			<Post post_id={route.params.post_id} />
		</ScrollView>
	);
}
