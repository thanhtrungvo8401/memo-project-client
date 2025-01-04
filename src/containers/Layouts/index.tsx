import React, { useState, ReactNode } from 'react';
import Header from '../Header/index';
import Sidebar from '../Sidebar/index';
import { AuthenticationContext } from '../contexts';
import useAuthentication from '../../hooks/useAuthentication';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    isAuthenticated,
    saveUserAuthentication,
    userProfile,
    removeUserAuthentication,
  } = useAuthentication();

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        saveUserAuthentication,
        removeUserAuthentication,
        userProfile,
      }}
    >
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="box-border h-full">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 box-border flex flex-col h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </AuthenticationContext.Provider>
  );
};

export default Layout;
