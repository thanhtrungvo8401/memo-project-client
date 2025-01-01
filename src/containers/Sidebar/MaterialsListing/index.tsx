import React, { useContext } from 'react';
import MaterialItem from './MaterialItem';
import { lessonRepo } from '../../../database/Lesson';
import { LessonContext } from '../contexts';

const MaterialListing = React.forwardRef<
  { reload: () => void },
  { closeSidebar: () => void }
>((props, ref) => {
  const { setAvailableLessons, availableLessons } = useContext(LessonContext);
  const getAllLessons = async () => {
    const lessons = await lessonRepo.getAll();
    setAvailableLessons(lessons);
  };

  React.useEffect(() => {
    getAllLessons();
  }, []);

  React.useImperativeHandle(ref, () => ({ reload: () => getAllLessons() }), []);

  return (
    <div className="h-full">
      {availableLessons.map((item) => {
        return (
          <MaterialItem
            item={item}
            key={item.id}
            closeSideBar={props.closeSidebar}
          />
        );
      })}
    </div>
  );
});

export default MaterialListing;
