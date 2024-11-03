import React from 'react';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import ProfileUpdate from '../Components/Profile/ProfileUpdate';
import useAuth from '../../Hooks/useAuth';

function Profile() {
    const { auth } = useAuth();
    return (
        <div className="flex flex-col">
            <ProfileHeader data={auth.user} />
            <ProfileUpdate data={auth.user} />
        </div>
    );
}

export default Profile;
