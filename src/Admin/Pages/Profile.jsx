import React from 'react';
import ProfileUpdate from '../Components/Profile/ProfileUpdate';
import useAuth from '../../Hooks/useAuth';

function Profile() {
    const { auth } = useAuth();
    return <ProfileUpdate data={auth.user} />;
}

export default Profile;
