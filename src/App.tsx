import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HtmlTitle from './components/HtmlTitle';
import DefaultLayout from './containers/Layouts';
import Dashboard from './pages/Dashboard';
import LearningMaterialDetail from './pages/LearningMaterialDetail';
import { AppRoutes } from './constants/routes';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route
            index
            element={
              <>
                <HtmlTitle title="Memo.com - Fantastic tool for mastering English" />
                <Dashboard />
              </>
            }
          />

          <Route
            path={`${AppRoutes.LearningMaterials}/:id`}
            element={
              <>
                <HtmlTitle title="Memo.com - Learning materials archive" />
                <LearningMaterialDetail />
              </>
            }
          />
        </Routes>
      </DefaultLayout>

      <ToastContainer style={{ zIndex: 9999 }} />
    </>
  );
}

export default App;
