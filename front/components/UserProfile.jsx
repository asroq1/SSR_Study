import { Button, Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useCallback } from 'react'

const UserProfile = ({ setIsLoggedIn }) => {
	const onLogout = useCallback(() => {
		setIsLoggedIn(false)
	}, [])

	return (
		<>
			<div>UserProfile</div>
			<Card
				actions={[
					<div key="twit">
						hey
						<br />0
					</div>,
					<div key="followings">
						followings
						<br />0
					</div>,
					<div key="followers">
						followers
						<br />0
					</div>,
				]}
			>
				<Card.Meta avatar={<Avatar>dev</Avatar>} title="jung" />
				<Button onClick={onLogout}>LogOut</Button>
			</Card>
		</>
	)
}

export default UserProfile
