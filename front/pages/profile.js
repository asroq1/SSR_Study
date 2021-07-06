import React from 'react'
React.useLayoutEffect = React.useEffect
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import AppLayout from '../components/AppLayout'
const Profile = () => {
	const followerList = [
		{ nickname: 'devicii' },
		{ nickname: 'jung' },
		{ nickname: 'deviciiOfficial' },
	]
	const followingList = [
		{ nickname: 'devicii' },
		{ nickname: 'jung' },
		{ nickname: 'deviciiOfficial' },
	]

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>My profile</title>
			</Head>
			<AppLayout>
				<NicknameEditForm />
				<FollowList header="팔로잉 목록" data={followingList} />
				<FollowList header="팔로워 목록" data={followerList} />
			</AppLayout>
		</>
	)
}

export default Profile
