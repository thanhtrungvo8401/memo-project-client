import { useContext } from 'react';
import Button from '../../../components/Button';
import BookOpen from '../../../components/icons/BookOpen';
import { VocabularyContext } from '../contexts';
import Examine from '../../../components/icons/Examine';

type PropsType = {
  onAddNewVocab: () => void;
};

const ActionBtns = (props: PropsType) => {
  const { setIsLearning, vocabularies, setIsPreviewing } =
    useContext(VocabularyContext);

  return (
    <div className="inline-flex items-center justify-center bottom-4 fixed right-4 gap-2">
      {!!vocabularies.length && (
        <Button.Gradient onClick={() => setIsPreviewing(true)}>
          <Examine className="mr-1" /> Preview
        </Button.Gradient>
      )}

      {!!vocabularies.length && (
        <Button.Primary onClick={() => setIsLearning(true)}>
          <BookOpen className="mr-2 !text-white" /> Learning
        </Button.Primary>
      )}

      <button
        data-tooltip-target="tooltip-new"
        type="button"
        className="inline-flex items-center justify-center w-12 h-12 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        onClick={props.onAddNewVocab}
      >
        <svg
          className="w-5 h-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default ActionBtns;
