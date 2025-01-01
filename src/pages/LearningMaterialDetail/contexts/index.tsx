import React from 'react';
import { ILesson, IVocabulary } from '../../../database/type';
import { vocabularyRepo } from '../../../database/Vocabulary';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { initialLesson } from '../../../containers/Sidebar/contexts';
import { removeEmptySpace } from '../../../utils/common';

export const initialVocabulary: IVocabulary = {
  id: '',
  lessonId: '',
  meaning: '',
  vocabulary: '',
  usage: '',
  synonyms: '',
};

type VocabularyContextType = {
  isLearning: boolean;
  isPreviewing: boolean;
  setIsLearning: (v: boolean) => void;
  setIsPreviewing: (v: boolean) => void;
  lesson: ILesson;
  vocabulary: IVocabulary;
  vocabularies: Array<IVocabulary>;
  setVocabularies: (v: Array<IVocabulary>) => void;
  setVocabulary: (v: IVocabulary) => void;
  resetVocabulary: () => void;
  addNewVocabulary: (v: IVocabulary) => Promise<boolean>;
  updateVocabulary: (v: IVocabulary) => Promise<boolean>;
  deleteVocabulary: (id: string) => Promise<boolean>;
  openEditForm: (v: IVocabulary) => void;
};

export function useVocabulary(lesson: ILesson) {
  const [vocabulary, setVocabulary] = React.useState<IVocabulary>({
    ...initialVocabulary,
  });

  const [vocabularies, setVocabularies] = React.useState<Array<IVocabulary>>(
    [],
  );

  const addNewVocabulary = async (v: IVocabulary, callback?: () => void) => {
    try {
      v.id = uuidv4();
      v.lessonId = lesson?.id;
      v.vocabulary = removeEmptySpace(v.vocabulary);

      const res = await vocabularyRepo.addOne(v);

      setVocabulary({ ...initialVocabulary });
      toast('New vocabulary has been added successfully', {
        type: 'success',
      });

      callback?.();
      return !!res;
    } catch (error) {
      toast('Something went wrong!', {
        type: 'error',
      });
      return false;
    }
  };

  const updateVocabulary = async (v: IVocabulary, callback?: () => void) => {
    try {
      v.vocabulary = removeEmptySpace(v.vocabulary);

      const res = await vocabularyRepo.updateOne(v);

      setVocabulary({ ...initialVocabulary });

      toast('Vocabulary has been updated successfully', {
        type: 'success',
      });

      callback?.();
      return !!res;
    } catch (error) {
      toast('Something went wrong!', {
        type: 'error',
      });
      return false;
    }
  };

  const deleteVocabulary = async (id: string, callback?: () => void) => {
    try {
      vocabularyRepo.removeById(id);
      toast('Vocabulary has been removed successfully', {
        type: 'success',
      });

      callback?.();

      return true;
    } catch (error) {
      console.log('🚀 ~ deleteVocabulary ~ error:', error);
      toast('Something went wrong!', {
        type: 'error',
      });

      return false;
    }
  };

  return {
    vocabulary,
    setVocabulary,
    vocabularies,
    setVocabularies,
    resetVocabulary: () => setVocabulary({ ...initialVocabulary }),
    addNewVocabulary,
    deleteVocabulary,
    updateVocabulary,
  };
}

export const VocabularyContext = React.createContext<VocabularyContextType>({
  vocabulary: initialVocabulary,
  setVocabulary: () => {},
  resetVocabulary: () => {},
  addNewVocabulary: () => Promise.resolve(true),
  lesson: initialLesson,
  deleteVocabulary: () => Promise.resolve(true),
  openEditForm: () => {},
  updateVocabulary: () => Promise.resolve(true),
  isLearning: false,
  isPreviewing: false,
  setIsLearning() {},
  vocabularies: [],
  setVocabularies() {},
  setIsPreviewing() {},
});
