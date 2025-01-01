import React, { ChangeEvent, useContext } from 'react';
import Modal, { ExposeApi as ModalApi } from '../../../../components/Modal';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import TextArea from '../../../../components/TextArea';
import { LessonContext } from '../../contexts';

const Header = (props: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b border-stroke rounded-t dark:border-strokedark">
      <h3 className="text-lg font-semibold text-black dark:text-white">
        Add more lesson
      </h3>

      <button
        type="button"
        onClick={() => props.onClose()}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="crud-modal"
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
    </div>
  );
};

const RequestForm = React.forwardRef<
  { open: () => void; close: () => void },
  {}
>((props, ref) => {
  const { lesson, setLesson, addNewLesson, updateLesson } =
    useContext(LessonContext);
  const modalRef = React.useRef<ModalApi>(null);
  const [error, setError] = React.useState<{ title?: string }>({
    title: undefined,
  });

  const onSubmitForm = (e: any) => {
    e?.preventDefault();

    if (!lesson.title) {
      return setError({
        title: 'Required',
      });
    }

    if (!lesson.id) {
      addNewLesson({ ...lesson });
    } else {
      updateLesson({ ...lesson });
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLesson({
      ...lesson,
      [name]: value,
    });

    setError({});
  };

  React.useImperativeHandle(ref, () => {
    return {
      open: () => {
        modalRef.current?.open();
      },
      close: () => {
        modalRef.current?.close();
      },
    };
  }, []);

  return (
    <>
      <Modal ref={modalRef}>
        <>
          <Header onClose={() => modalRef.current?.close()} />

          <form
            className="p-4 md:p-5"
            onSubmit={(e) => onSubmitForm(e)}
            action="/"
          >
            <TextArea
              required
              name="title"
              onChange={handleOnChange}
              label="Lesson name"
              error={error.title}
              value={lesson.title}
              rows={3}
            />

            <Input
              value={lesson.link}
              name="link"
              onChange={handleOnChange}
              label="Link"
            />

            <TextArea
              name="note"
              label="Note"
              onChange={handleOnChange}
              value={lesson.note}
            />

            <Button.Primary onClick={() => {}} type="submit">
              <>
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Save
              </>
            </Button.Primary>
          </form>
        </>
      </Modal>
    </>
  );
});

export default RequestForm;
