import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { ILesson, IVocabulary } from '../../database/type';
import ActionsFormGroup from './components/ActionsFormGroup';
import VocabularyItem from './components/VocaItem';
import { lessonRepo } from '../../database/Lesson';
import React from 'react';
import { vocabularyRepo } from '../../database/Vocabulary';
import Empty from '../../components/Empty';
import { useVocabulary, VocabularyContext } from './contexts';
import { initialLesson } from '../../containers/Sidebar/contexts';
import ArrowTopRight from '../../components/icons/ArrowTopRIght';
import LearningPlatform from './components/LearningPlatform';
import PreviewPlatform from './components/PreviewPlatform';

const LearningMaterialDetail: React.FC = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const refForm = React.useRef<any>();
  const [lesson, setLesson] = React.useState<ILesson>(initialLesson);
  const [isLearning, setIsLearning] = React.useState(false);
  const [isPreviewing, setIsPreviewing] = React.useState(false);
  const vocabValues = useVocabulary(lesson);

  const getLessonDetail = async (id: string) => {
    try {
      const res = await lessonRepo.getOneById(id);
      setLesson(res);

      if (!res) navigate(`/`);
    } catch (error) {
      console.log('🚀 ~ getLessonDetail ~ error:', error);
    }
  };

  const getVocabulariesList = async (id: string) => {
    try {
      const res: Array<IVocabulary> =
        (await vocabularyRepo.getListByLessonId(id)) ?? [];

      res.sort((v1, v2) =>
        v1.vocabulary.toLowerCase() >= v2.vocabulary.toLowerCase() ? 1 : -1,
      );

      vocabValues.setVocabularies(res);
    } catch (error) {
      console.log('🚀 ~ getVocabulariesList ~ error:', error);
    }
  };

  const divideColumns = (array: Array<any>) => {
    const col1Num = Math.ceil(array.length / 2);

    return {
      col1: array.slice(0, col1Num),
      col2: array.slice(col1Num),
    };
  };

  const reloadVocabulariesList = () => {
    if (id) getVocabulariesList(id);
  };

  React.useEffect(() => {
    if (id) {
      getLessonDetail(id);
      getVocabulariesList(id);
    }
  }, [id]);

  const pageTitle = !lesson?.title ? (
    'NOT FOUND'
  ) : (
    <>
      {lesson.title}{' '}
      {lesson.link && (
        <a
          className="cursor-pointer inline-block translate-y-1 ml-1"
          target="_blank"
          href={lesson.link}
        >
          <ArrowTopRight />
        </a>
      )}
    </>
  );

  return (
    <VocabularyContext.Provider
      value={{
        isLearning,
        isPreviewing,
        setIsPreviewing,
        setIsLearning,
        lesson: lesson,
        vocabulary: vocabValues.vocabulary,
        resetVocabulary: vocabValues.resetVocabulary,
        setVocabulary: vocabValues.setVocabulary,
        addNewVocabulary: (v) =>
          vocabValues.addNewVocabulary(v, () => {
            reloadVocabulariesList();
            refForm.current?.close();
          }),
        updateVocabulary: (v) => {
          return vocabValues.updateVocabulary(v, () => {
            reloadVocabulariesList();
            refForm.current?.close();
          });
        },
        openEditForm: (v) => {
          vocabValues.setVocabulary(v);
          refForm.current?.open();
        },
        deleteVocabulary: (id) => {
          return vocabValues.deleteVocabulary(id, () => {
            reloadVocabulariesList();
          });
        },
        vocabularies: vocabValues.vocabularies,
        setVocabularies: vocabValues.setVocabularies,
      }}
    >
      <PageTitle title={pageTitle} />

      {!vocabValues.vocabularies.length && (
        <Empty>No vocabularies available</Empty>
      )}

      {!!vocabValues.vocabularies.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start pb-16">
          <div className="grid grid-cols-1 gap-2 pb-0">
            {divideColumns(vocabValues.vocabularies).col1.map((el, index) => {
              return <VocabularyItem key={index} item={el} />;
            })}
          </div>

          <div className="grid grid-cols-1 gap-2 pb-0">
            {divideColumns(vocabValues.vocabularies).col2.map((el, index) => {
              return <VocabularyItem key={index} item={el} />;
            })}
          </div>
        </div>
      )}

      <LearningPlatform />
      <PreviewPlatform />

      <ActionsFormGroup ref={refForm} />
    </VocabularyContext.Provider>
  );
};

export default LearningMaterialDetail;
