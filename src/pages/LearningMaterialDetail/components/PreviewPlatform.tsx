import React, { useContext } from 'react';
import { VocabularyContext } from '../contexts';
import OverflowingPanel from '../../../components/OverflowingPanel';
import { generateRandomOrders } from '../../../utils/common';
import { IVocabulary } from '../../../database/type';
import cl from 'classnames';
import Toggle from '../../../components/Toggle';
import { toast } from 'react-toastify';

function getRandomFontsize() {
  const size = ['text-base', 'text-lg', 'text-xl', 'text-2xl'];

  return size[Math.round(Math.random() * size.length)];
}

function getRandomOffset() {
  const offsets = [
    'mt-3',
    'mb-3',
    'mt-4',
    'mb-4',
    'ml-3',
    'mr-3',
    'm-4',
    'm-2',
    'm-3',
    'm-4',
  ];

  return offsets[Math.round(Math.random() * offsets.length)];
}

function getRandomColor() {
  const colors = [
    'text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800',
    'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800',
    'text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800',
    'text-yellow-800 border border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800',
    'text-gray-800 border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
  ];

  return colors[Math.round(Math.random() * colors.length)];
}

function getRandomTransform() {
  const rotates = [
    'rotate-12',
    'rotate-6',
    'rotate-0',
    'rotate-0',
    '-rotate-12',
    '-rotate-6',
  ];

  return rotates[Math.round(Math.random() * rotates.length)];
}

export default function PreviewingPlatform() {
  const {
    isPreviewing,
    setIsPreviewing,
    vocabularies = [],
  } = useContext(VocabularyContext);

  const randomStyles = React.useRef<Array<string>>([]);

  const [isShowVoca, setIsShowVoca] = React.useState(true);

  const [previewingVocabs, setPreviewingVocabs] = React.useState<
    Array<IVocabulary>
  >([]);

  const randomDisplay = () => {
    setPreviewingVocabs(generateRandomOrders(vocabularies));
    randomStyles.current = vocabularies.map(() => {
      return `${getRandomFontsize()} ${getRandomOffset()} ${getRandomColor()} ${getRandomTransform()}`;
    });
  };

  React.useEffect(() => {
    randomDisplay();
  }, [vocabularies, isShowVoca]);

  React.useEffect(() => {
    setIsShowVoca(true);
  }, [isPreviewing]);

  const onShowAnswer = (text: string) => {
    toast(text, {
      type: 'info',
      hideProgressBar: true,
      icon: false,
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  return (
    <OverflowingPanel
      active={isPreviewing}
      onClose={() => setIsPreviewing(false)}
    >
      <div className="flex flex-col h-full gap-4">
        <div
          className="flex items-center flex-1 justify-center overflow-y-auto overflow-x-hidden"
          style={{ maxHeight: 'calc(100% - 2.5rem)' }}
        >
          <div className="flex flex-wrap justify-center gap-1 items-center w-full max-w-150 max-h-full">
            {previewingVocabs.map((el, index) => {
              return (
                <span
                  onClick={() =>
                    onShowAnswer(!isShowVoca ? el.vocabulary : el.meaning)
                  }
                  className={cl(
                    'border p-4 rounded-full flex items-center justify-center max-w-100 text-center cursor-pointer transition-all duration-500 first:mt-16 last:mb-16',
                    randomStyles.current[index],
                  )}
                  key={el.id}
                >
                  {isShowVoca ? el.vocabulary : el.meaning}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex  items-center justify-center flex-wrap gap-4">
          <Toggle
            check={!isShowVoca}
            onToggle={() => setIsShowVoca((v) => !v)}
            label={'Show VN & check EN'}
            subLabel="Show EN & check VN"
          />
        </div>
      </div>
    </OverflowingPanel>
  );
}
