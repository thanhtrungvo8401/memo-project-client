import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticatedUser = 'Authenticated-User';

const getStorageUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem(AuthenticatedUser) ?? '');
    return user;
  } catch (error) {
    return null;
  }
};

export default function useAuthentication() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!getStorageUser()?.id,
  );

  const [userProfile, setUserProfile] = React.useState<{
    id?: string;
    username?: string;
  }>({
    username: getStorageUser()?.username,
    id: getStorageUser()?.id,
  });

  return {
    isAuthenticated,
    userProfile,
    saveUserAuthentication: (data: { username: string; id: string }) => {
      try {
        if (!data.username || !data.id) return;

        const authenticationData = JSON.stringify(data);
        localStorage.setItem(AuthenticatedUser, authenticationData);
        const user = getStorageUser();

        if (user?.username && user?.id) {
          setIsAuthenticated(true);
          setUserProfile(user);
        }
      } catch (error) {
        console.log('🚀 ~ useAuthentication ~ error:', error);
      }
    },
    removeUserAuthentication: () => {
      try {
        localStorage.removeItem(AuthenticatedUser);
        setUserProfile({});
        setIsAuthenticated(false);
        navigate('/');
      } catch (error) {
        console.log('🚀 ~ useAuthentication ~ error:', error);
      }
    },
  };
}
