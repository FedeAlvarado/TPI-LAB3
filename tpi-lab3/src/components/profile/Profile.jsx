import React from 'react'
import UserItem from "../userItem/UserItem";
import { useContext } from 'react';
import { AuthenticationContext } from '../../services/authentication/authentication.context';

const Profile = () => {

    const { userObject} = useContext(AuthenticationContext);

    return (
        <>
            <UserItem
                id={userObject.id}
                name={userObject.name}
                lastName={userObject.lastName}
                email={userObject.email}
                password={userObject.password}
                type={userObject.type}
                profile={true}
            />
        </>
    )
}

export default Profile