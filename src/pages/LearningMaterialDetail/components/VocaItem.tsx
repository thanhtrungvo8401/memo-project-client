import React, { useContext } from 'react';
import cl from 'classnames';
import { IVocabulary } from '../../../database/type';
import SpeakerIcon from '../../../components/icons/Speaker';
import ActionsListShortcut from '../../../components/ActionsListShortcut';
import Edit from '../../../components/icons/Edit';
import Delete from '../../../components/icons/Delete';
import { VocabularyContext } from '../contexts';
import { speakTheText } from '../../../utils/text-to-speech';
import { useLongPress } from 'use-long-press';

function Word(props: { value: string; onLongPress: (v: string) => void }) {
  const bind = useLongPress(() => props.onLongPress(props.value));

  if (!props.value) return <></>;

  return (
    <span
      className="cursor-pointer"
      {...bind()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {props.value}
    </span>
  );
}

export function RenderVocabulary(props: { value: string; className?: string }) {
  const { value = '' } = props;
  const words = value.split(' ');

  const openCambridgeDictionary = (v: string) => {
    const url = `https://dictionary.cambridge.org/dictionary/english/${v}`;
    return window.open(url, '_blank');
  };

  return (
    <p className={cl('flex flex-wrap gap-1', props.className)}>
      {words.map((w, index) => (
        <Word onLongPress={openCambridgeDictionary} value={w} key={index} />
      ))}
    </p>
  );
}

const VocabularyItem = (props: { item: IVocabulary }) => {
  const { deleteVocabulary, openEditForm } = useContext(VocabularyContext);
  const item = props.item;
  const [isCollapse, setIsCollapse] = React.useState(true);

  return (
    <div>
      <h2
        id="accordion-collapse-heading-1"
        onClick={() => {
          setIsCollapse((isCol) => !isCol);
        }}
      >
        <button
          type="button"
          className={cl(
            'transition flex items-center justify-between w-full py-3 px-5 font-medium rtl:text-right border rounded-t-xl border-stroke bg-white  gap-3 dark:border-strokedark dark:bg-boxdark text-black dark:text-white',
            { 'border-b-0': !isCollapse },
            { 'rounded-b-xl': isCollapse },
          )}
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <RenderVocabulary value={item.vocabulary} />

          <span
            className="flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              speakTheText(item.vocabulary);
            }}
          >
            <SpeakerIcon />
          </span>
        </button>
      </h2>

      <div
        id="accordion-collapse-body-1"
        aria-labelledby="accordion-collapse-heading-1"
        className={cl('transition opacity-100', {
          hidden: isCollapse,
          'opacity-0': isCollapse,
        })}
      >
        <div
          className={cl(
            'py-3 px-5 border border-stroke  rounded-b-xl dark:border-strokedark bg-white  dark:bg-boxdark transition pr-7 relative',
          )}
        >
          <p className={cl('text-black dark:text-white')}>{item.meaning}</p>

          {!!item.usage && (
            <p className="mt-2 text-sm">
              <span className="underline">Usages: </span>
              <span className="italic font-extralight">{item.usage}</span>
            </p>
          )}

          {!!item.synonyms && (
            <p className="mt-2 text-sm">
              <span className="underline">Synonyms: </span>
              <span className="italic font-extralight">{item.synonyms}</span>
            </p>
          )}

          <span className="absolute right-0 top-1/2 w-8 h-8 min-w-8 flex items-center justify-center cursor-pointer -translate-y-1/2">
            <ActionsListShortcut
              items={[
                {
                  key: 'edit',
                  renderer: (
                    <span className="cursor-pointer">
                      <Edit />
                    </span>
                  ),
                  onClick: () => {
                    openEditForm(item);
                  },
                },
                {
                  key: 'delete',
                  renderer: (
                    <span className="cursor-pointer">
                      <Delete />
                    </span>
                  ),
                  onClick: () => {
                    deleteVocabulary(item.id);
                  },
                },
              ]}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default VocabularyItem;
