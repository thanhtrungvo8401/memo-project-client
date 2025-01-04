import React from 'react';

type AuthenContextProps = {
  isAuthenticated: boolean;
  saveUserAuthentication: (data: { username: string; id: string }) => void;
  removeUserAuthentication: () => void;
  userProfile: { username?: string; id?: string };
};

export const AuthenticationContext = React.createContext<AuthenContextProps>({
  isAuthenticated: false,
  saveUserAuthentication() {},
  removeUserAuthentication() {},
  userProfile: {},
});
