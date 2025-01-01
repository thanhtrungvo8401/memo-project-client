import React, { useContext } from 'react';
import Modal from '../../../../components/Modal';
import { LessonContext } from '../../contexts';
import { ILesson } from '../../../../database/type';
import { lessonRepo } from '../../../../database/Lesson';
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteLessonConfirmModal = React.forwardRef<
  { open: (id: string) => void; close: () => void },
  {}
>(({}, ref) => {
  const { deleteLesson, availableLessons } = useContext(LessonContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [willRemoveLessonId, setWillRemoveLessonId] = React.useState('');
  const [lesson, setLesson] = React.useState<ILesson | null>(null);
  const modalRef = React.useRef<any>();

  const isRemoveActivePage =
    !!willRemoveLessonId && pathname?.includes(willRemoveLessonId);

  React.useEffect(() => {
    const getLessonDetail = async (id: string) => {
      try {
        const res = await lessonRepo.getOneById(id);
        setLesson(res);
      } catch (error) {
        console.log('🚀 ~ getLessonDetail ~ error:', error);
      }
    };

    if (willRemoveLessonId) {
      getLessonDetail(willRemoveLessonId);
    } else {
      setLesson(null);
    }
  }, [willRemoveLessonId]);

  React.useImperativeHandle(ref, () => {
    return {
      open: (id) => {
        modalRef.current?.open();
        setWillRemoveLessonId(id);
      },
      close: () => {
        modalRef.current?.close();
        setWillRemoveLessonId('');
      },
    };
  }, []);
  return (
    <Modal ref={modalRef}>
      <div className="relative bg-white rounded-lg shadow dark:bg-boxdark">
        <button
          type="button"
          onClick={() => modalRef.current.close()}
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 w-12 h-12 text-danger"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <span>If you remove </span>
            <strong>{lesson?.title}</strong>
            <span>, vocabularies reference to it will be removed too!</span>
          </h3>
          <button
            onClick={async () => {
              try {
                await deleteLesson(willRemoveLessonId);
                if (isRemoveActivePage) {
                  const redirectLesson = availableLessons.filter(
                    (el) => el.id !== willRemoveLessonId,
                  )[0];

                  if (redirectLesson) {
                    navigate(`/learning-materials/${redirectLesson.id}`);
                  } else {
                    navigate('/');
                  }
                }
                setWillRemoveLessonId('');
                modalRef.current.close();
              } catch (error) {
                console.log('🚀 ~ onClick={ ~ error:', error);
              }
            }}
            data-modal-hide="popup-modal"
            type="button"
            className="text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center bg-danger"
          >
            Confirm
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600  dark:hover:bg-gray-700"
            onClick={() => modalRef.current.close()}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
});

export default DeleteLessonConfirmModal;
