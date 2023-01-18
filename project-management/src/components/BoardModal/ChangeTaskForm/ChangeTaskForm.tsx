import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { changeTask } from 'store/actions/boardsApi';
import '../../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { FormTaskData } from 'models/assets';

const submitBtnStyle = {
  m: '2rem auto 0',
  fontSize: '2rem',
  backgroundColor: '#ffffa5',
  color: '#000000',
  '&:hover': { backgroundColor: '#ffffcc' },
};

export const ChangeTaskForm = () => {
  const { currentTask } = useAppSelector((state) => state.boardsSlice);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTaskData>({
    defaultValues: {
      title: currentTask ? currentTask.title : '',
      description: currentTask ? currentTask.description : '',
    },
  });

  const onSubmitData: SubmitHandler<FieldValues> = (data) => {
    if (currentTask) {
      const { _id, boardId, columnId, order, userId, users } = currentTask;
      const formData = {
        _id,
        boardId,
        columnId,
        order,
        userId,
        users,
        title: data.title as string,
        description: data.description as string,
      };
      dispatch(changeTask(formData));
    }
  };

  return (
    <form
      className='add-board-form__container'
      onSubmit={handleSubmit((data) => onSubmitData(data))}
    >
      <label className='add-board-form__label'>
        <input
          {...register('title', {
            required: `${t('changeTask.error1')}`,
          })}
          className={`add-board-form__input ${errors.title ? 'add-board-form__input-error' : ''}`}
          placeholder={errors.title ? errors.title.message : `${t('addBoard.placeholder1')}`}
          autoComplete='off'
        />
      </label>
      <label className='add-board-form__label'>
        <input
          {...register('description', {
            required: `${t('changeTask.error2')}`,
          })}
          className={`add-board-form__input ${
            errors.description ? 'add-board-form__input-error' : ''
          }`}
          placeholder={
            errors.description ? errors.description.message : `${t('addBoard.placeholder2')}`
          }
          autoComplete='off'
        />
      </label>
      <div className='add-board-form__submit-container'>
        <Button type='submit' variant='contained' sx={submitBtnStyle}>
          {t('changeTask.changeBtn')}
        </Button>
      </div>
    </form>
  );
};
