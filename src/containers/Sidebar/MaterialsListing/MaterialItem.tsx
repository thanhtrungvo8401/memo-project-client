import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../constants/routes';
import { ILesson } from '../../../database/type';
import cl from 'classnames';
import ActionsListShortcut from '../../../components/ActionsListShortcut';
import Edit from '../../../components/icons/Edit';
import Delete from '../../../components/icons/Delete';
import { useContext } from 'react';
import { LessonContext } from '../contexts';
type PropsType = {
  item: ILesson;
  closeSideBar: () => void;
};

const MaterialItem = (props: PropsType) => {
  const { pathname } = useLocation();
  const { openEditForm, openConfirmDelete } = useContext(LessonContext);
  const item = props.item;
  const isActive = pathname.includes(item.id);
  let navigate = useNavigate();

  const renderItem = {
    title: item.title,
    time:
      item.updatedDate?.split('T')[1].slice(0, 5) +
      ' ' +
      item.updatedDate?.split('T')[0],
    address: `${AppRoutes.LearningMaterials}/${item.id}`,
    color: isActive ? '#10B981' : 'white',
  };

  return (
    <div
      onClick={() => {
        props.closeSideBar();
        navigate(renderItem.address);
      }}
      className={cl(
        'flex items-center gap-5 py-2 hover:bg-meta-4 cursor-pointer px-4 lg:px-6 relative',
        { 'bg-meta-4': isActive },
      )}
    >
      <div
        className="relative h-10 w-1"
        style={{ backgroundColor: renderItem.color }}
      ></div>

      <div className="flex-1">
        <h5 className="font-medium text-white w-full line-clamp-2">
          {renderItem.title}
        </h5>

        <div className="flex justify-between w-full items-center mt-2">
          {/* <span className="text-sm text-white">
            {renderItem.quantity} words
          </span> */}

          <span className="text-xs"> {renderItem.time}</span>
        </div>
      </div>

      <ActionsListShortcut
        isDarkThemeOnly
        className="absolute top-1/2 right-2 -translate-y-1/2"
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
              openConfirmDelete(item.id);
            },
          },
        ]}
      />
    </div>
  );
};

export default MaterialItem;
