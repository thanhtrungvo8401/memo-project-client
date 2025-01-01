import React, { useContext } from 'react';
import { VocabularyContext } from '../contexts';
import OverflowingPanel from '../../../components/OverflowingPanel';
import { IVocabulary } from '../../../database/type';
import cl from 'classnames';
import { speakTheText } from '../../../utils/text-to-speech';
import SpeakerIcon from '../../../components/icons/Speaker';
import { RenderVocabulary } from './VocaItem';

const initBlurValue = {
  meaning: true,
  usage: true,
  synonyms: true,
};
function VocabularyDetail(props: { word: IVocabulary }) {
  const [vocabulary, setVocabulary] = React.useState(props.word);
  const [blur, setBlur] = React.useState(initBlurValue);
  const ref = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    ref.current?.classList.add('!opacity-0');

    setTimeout(() => {
      ref.current?.classList.remove('!opacity-0');
      setVocabulary(props.word);
      setBlur(initBlurValue);
    }, 150);
  }, [props.word.id]);

  return (
    <div
      className="transition-all duration-150 opacity-1 h-full flex flex-col justify-center text-center text-black dark:text-white gap-6"
      ref={ref as any}
    >
      <h5 className="text-5xl mb-4 text-black dark:text-white">
        <RenderVocabulary
          value={vocabulary.vocabulary}
          className="justify-center"
        />
        <span
          className="flex justify-center mt-2"
          onClick={(e) => {
            e.stopPropagation();
            speakTheText(vocabulary.vocabulary);
          }}
        >
          <SpeakerIcon />
        </span>
      </h5>

      <p
        onClick={() => setBlur((v) => ({ ...v, meaning: !v.meaning }))}
        className={cl('cursor-pointer text-xl', { 'blur-sm': !!blur.meaning })}
      >
        {vocabulary?.meaning}
      </p>

      {vocabulary?.usage && (
        <p
          onClick={() => setBlur((v) => ({ ...v, usage: !v.usage }))}
          className={cl('cursor-pointer italic font-extralight', {
            'blur-sm': !!blur.usage,
          })}
        >
          <span className="not-italic underline ">Usage:</span>{' '}
          {vocabulary.usage}
        </p>
      )}

      {vocabulary?.synonyms && (
        <p
          onClick={() => setBlur((v) => ({ ...v, synonyms: !v.synonyms }))}
          className={cl('cursor-pointer font-extralight', {
            'blur-sm': !!blur.synonyms,
          })}
        >
          <span className="not-italic underline">Synonyms:</span>{' '}
          {vocabulary.synonyms}
        </p>
      )}
    </div>
  );
}

export default function LearningPlatform() {
  const { isLearning, setIsLearning, vocabularies } =
    useContext(VocabularyContext);

  const [learningWord, setLearningWord] = React.useState(vocabularies[0]);

  React.useEffect(() => {
    setLearningWord(vocabularies[0]);
  }, [vocabularies]);

  return (
    <OverflowingPanel active={isLearning} onClose={() => setIsLearning(false)}>
      <div className="flex flex-col h-full	">
        <div className="flex-1">
          <VocabularyDetail word={learningWord} />
        </div>

        <div className="flex flex-wrap justify-center gap-1 max-h-[10.25rem] overflow-auto">
          {vocabularies.map((el, index) => {
            return (
              <span
                onClick={() => setLearningWord(el)}
                className={cl(
                  'inline-block p-2 cursor-pointer text-sm font-medium rounded border border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all bg-transparent',
                  {
                    'border-blue-400 text-blue-800 dark:text-blue-400 dark:border-blue-800':
                      learningWord?.id === el.id,
                  },
                )}
                key={index}
              >
                {el.vocabulary}
              </span>
            );
          })}
        </div>
      </div>
    </OverflowingPanel>
  );
}
