import React, { ChangeEvent, useContext } from 'react';
import Modal, { ExposeApi as ModalApi } from '../../../components/Modal';
import ActionBtns from './ActionBtns';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TextArea from '../../../components/TextArea';
import { VocabularyContext } from '../contexts';

function FormHeader(props: { onClick: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b border-stroke rounded-t dark:border-strokedark">
      <h3 className="text-lg font-semibold text-black dark:text-white">
        Add new vocabulary
      </h3>

      <button
        type="button"
        onClick={() => props.onClick()}
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
}

const ActionsFormGroup = React.forwardRef<ModalApi, {}>(({}, ref) => {
  const {
    lesson,
    vocabulary,
    setVocabulary,
    addNewVocabulary,
    updateVocabulary,
    resetVocabulary
  } = useContext(VocabularyContext);

  const [err, setErr] = React.useState<{
    vocabulary?: string;
    meaning?: string;
  }>({});

  const modalRef = React.useRef<ModalApi>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVocabulary?.({
      ...vocabulary,
      [name]: value,
    });

    setErr({});
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    if (!vocabulary.vocabulary && !vocabulary.meaning) {
      return setErr({
        meaning: 'Required',
        vocabulary: 'Required',
      });
    } else if (!vocabulary.vocabulary) {
      return setErr({
        ...err,
        vocabulary: 'Required',
      });
    } else if (!vocabulary.meaning) {
      return setErr({
        ...err,
        meaning: 'Required',
      });
    }

    if (!vocabulary.id && lesson?.id) {
      await addNewVocabulary({ ...vocabulary });
    } else if (vocabulary.id && vocabulary.lessonId) {
      await updateVocabulary({ ...vocabulary });
    }
  };

  React.useImperativeHandle(
    ref,
    () => {
      return {
        open: () => modalRef.current?.open(),
        close: () => modalRef.current?.close(),
      };
    },
    [],
  );

  return (
    <>
      <Modal ref={modalRef}>
        <>
          <FormHeader onClick={() => modalRef.current?.close()} />

          <form className="p-4 md:p-5" onSubmit={handleOnSubmit}>
            <Input
              name="vocabulary"
              onChange={handleOnChange}
              label="Vocabulary"
              required
              error={err.vocabulary}
              value={vocabulary.vocabulary}
            />

            <TextArea
              name="meaning"
              onChange={handleOnChange}
              label="Meaning"
              required
              error={err.meaning}
              value={vocabulary.meaning}
              rows={1}
            />

            <TextArea
              name="usage"
              label="Usage"
              onChange={handleOnChange}
              value={vocabulary.usage}
              toggleHidden
            />

            <Input
              name="synonyms"
              onChange={handleOnChange}
              label="Synonyms"
              value={vocabulary.synonyms}
              toggleHidden
            />

            <Button.Primary type="submit">
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

      <ActionBtns
        onAddNewVocab={() => {
          resetVocabulary();
          modalRef.current?.open();
        }}
      />
    </>
  );
});

export default ActionsFormGroup;
