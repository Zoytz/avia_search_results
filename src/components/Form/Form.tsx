import { ChangeEvent, FC, ReactElement } from 'react';

type PropsType = {
  children: ReactElement
  handleSetMinPrice: (arg: number) => void
  handleSetMaxPrice: (arg: number) => void
};

const Form: FC<PropsType> = ({ 
  children, 
  handleSetMinPrice, 
  handleSetMaxPrice }) => {

    console.log('render Form')  
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
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetMinPrice(Number(e.target.value))}
            type='number'
            className='form__input'
            name='minPrice'
          />
        </label>
        <label className='form__label'>
          До
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetMinPrice(Number(e.target.value))}
            type='number'
            className='form__input'
            name='maxPrice'
          />
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