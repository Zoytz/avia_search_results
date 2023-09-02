import { FC, ReactElement } from 'react';

type PropsType = {
  children: ReactElement
};

const Form: FC<PropsType> = ({ children }) => {
  return (
    <form className='form'>
      <h3 className='form__title'>
        Сортировать
      </h3>
      <div className='form__section'>
        <label className='form__label'>
          <input name='radio' type='radio' className='form__radio' />
          - по возрастанию цены
        </label>
        <label className='form__label'>
          <input name='radio' type='radio' className='form__radio' />
          - по убыванию цены
        </label>
        <label className='form__label'>
          <input name='radio' type='radio' className='form__radio' />
          - по времени в пути
        </label>
      </div>
      <h3 className='form__title'>
        Фильтровать
      </h3>
      <div className='form__section'>
        <label className='form__label'>
          <input type='checkbox' className='form__checkbox' />
          - 1 пересадка
        </label>
        <label className='form__label'>
          <input type='checkbox' className='form__checkbox' />
          - без пересадок
        </label>
      </div>
      <h3 className='form__title'>
        Цена
      </h3>
      <div className='form__section'>
        <label className='form__label'>
          От
          <input type='number' className='form__input' />
        </label>
        <label className='form__label'>
          До
          <input type='number' className='form__input' />
        </label>
      </div>
      <h3 className='form__title'>
        Авиакомпании
      </h3>
      {children}
    </form>
  )
};

export default Form;