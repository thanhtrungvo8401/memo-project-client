import React from 'react';
import { ILesson } from '../../../database/type';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { lessonRepo } from '../../../database/Lesson';
import { useNavigate } from 'react-router-dom';

export const initialLesson = {
  id: '',
  title: '',
  link: '',
  note: '',
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
};

type LessonContextType = {
  lesson: ILesson;
  setLesson: (v: ILesson) => void;
  resetLesson: () => void;
  addNewLesson: (v: ILesson) => Promise<boolean>;
  updateLesson: (v: ILesson) => Promise<boolean>;
  deleteLesson: (id: string) => Promise<boolean>;
  openEditForm: (v: ILesson) => void;
  openConfirmDelete: (id: string) => void;
  availableLessons: Array<ILesson>;
  setAvailableLessons: (arr: Array<ILesson>) => void;
};

export function useLessons() {
  const [lesson, setLesson] = React.useState<ILesson>(initialLesson);
  const [availableLessons, setAvailableLessons] = React.useState<
    Array<ILesson>
  >([]);
  const navigate = useNavigate();

  const addNewLesson = async (v: ILesson, callback?: () => void) => {
    try {
      v.id = uuidv4();
      v.createdDate = new Date().toISOString();
      v.updatedDate = new Date().toISOString();

      const res = await lessonRepo.addOne(v);

      setLesson(initialLesson);
      navigate(`/learning-materials/${res}`);

      toast('New material resource has been added successfully', {
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

  const updateLesson = async (v: ILesson, callback?: () => void) => {
    try {
      v.updatedDate = new Date().toISOString();
      const res = await lessonRepo.updateOne(v);

      setLesson(initialLesson);

      toast('Lesson has been updated successfully', {
        type: 'success',
      });

      callback?.();

      navigate(`/learning-materials/${v.id}`);

      return !!res;
    } catch (error) {
      toast('Something went wrong!', {
        type: 'error',
      });
      return false;
    }
  };

  const deleteLesson = async (id: string, callback?: () => void) => {
    try {
      lessonRepo.removeById(id);
      toast('Lesson has been removed successfully', {
        type: 'success',
      });

      callback?.();

      return true;
    } catch (error) {
      toast('Something went wrong!', {
        type: 'error',
      });

      return false;
    }
  };

  return {
    lesson,
    setLesson,
    resetLesson: () => {
      setLesson(initialLesson);
    },
    addNewLesson,
    updateLesson,
    deleteLesson,
    availableLessons,
    setAvailableLessons,
  };
}

export const LessonContext = React.createContext<LessonContextType>({
  lesson: initialLesson,
  setLesson: () => {},
  resetLesson: () => {},
  addNewLesson: () => Promise.resolve(true),
  updateLesson: () => Promise.resolve(true),
  deleteLesson: () => Promise.resolve(true),
  openEditForm: () => {},
  openConfirmDelete() {},
  availableLessons: [],
  setAvailableLessons() {},
});
