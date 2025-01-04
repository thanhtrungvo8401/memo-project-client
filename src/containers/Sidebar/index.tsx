import { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo/logo-icon.svg';
import { AppRoutes } from '../../constants/routes';
import MaterialListing from './MaterialsListing';
import cl from 'classnames';
import CreateNewMaterialForm from './MaterialsListing/components/RequestForm';
import Button from '../../components/Button';
import { LessonContext, useLessons } from './contexts';
import DeleteLessonConfirmModal from './MaterialsListing/components/DeleteLessonConfirmModal';
import { AuthenticationContext } from '../contexts';
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const lessonsRef = useRef<any>(null);
  const confirmDeleteRef = useRef<any>(null);
  const requestForm = useRef<{ open: () => void; close: () => void }>(null);
  const lessonValues = useLessons();
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <LessonContext.Provider
      value={{
        lesson: lessonValues.lesson,
        setLesson: lessonValues.setLesson,
        addNewLesson: (v) => {
          return lessonValues.addNewLesson(v, () => {
            lessonsRef.current?.reload();
            requestForm.current?.close();
          });
        },
        updateLesson: (v) => {
          return lessonValues.updateLesson(v, () => {
            requestForm.current?.close();
            lessonsRef.current?.reload();
          });
        },
        deleteLesson: (id) => {
          return lessonValues.deleteLesson(id, () => {
            lessonsRef.current?.reload();
          });
        },
        openEditForm: (v) => {
          lessonValues.setLesson(v);
          requestForm.current?.open();
        },
        resetLesson: lessonValues.resetLesson,
        openConfirmDelete(id) {
          confirmDeleteRef.current?.open(id);
        },
        availableLessons: lessonValues.availableLessons,
        setAvailableLessons: lessonValues.setAvailableLessons,
      }}
    >
      <aside
        ref={sidebar}
        className={cl(
          'absolute left-0 top-0 z-99 flex h-screen w-90 flex-col overflow-y-hidden  duration-300 ease-linear  lg:static lg:translate-x-0 drop-shadow-1 bg-boxdark dark:drop-shadow-none gap-4',
          {
            'translate-x-0': sidebarOpen,
            '-translate-x-full': !sidebarOpen,
            hidden: !isAuthenticated,
          },
        )}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <NavLink to={AppRoutes.Home} className={'flex gap-2'}>
            <img src={Logo} alt="Logo" />
            <h2 className="text-white text-title-md2 font-semibold">Memo</h2>
          </NavLink>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        {/* <!-- SIDEBAR BODY --> */}
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
          <MaterialListing
            ref={lessonsRef}
            closeSidebar={() => setSidebarOpen(false)}
          />
        </div>

        <CreateNewMaterialForm ref={requestForm} />

        <DeleteLessonConfirmModal ref={confirmDeleteRef} />

        <Button.Primary
          onClick={() => requestForm.current?.open()}
          className={'mx-4 mb-4'}
        >
          Add more lesson
        </Button.Primary>
      </aside>
    </LessonContext.Provider>
  );
};

export default Sidebar;
