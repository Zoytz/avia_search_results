import { ChangeEvent, FC, ReactElement } from 'react';

type PropsType = {
  children: ReactElement
  handleSetMinPrice: (arg: number) => void
  handleSetMaxPrice: (arg: number) => void
  minPrice: number
  maxPrice: number
  handleSetTransfersFilters: (arg: string) => void
  transferFilters: string[]
  sortOptions: 'toLowPrice' | 'toHigthPrice' | 'time'
  handleSelectSortOption: (arg: 'toLowPrice' | 'toHigthPrice' | 'time') => void
};

const Form: FC<PropsType> = ({
  children,
  handleSetMinPrice,
  handleSetMaxPrice,
  minPrice,
  maxPrice,
  handleSetTransfersFilters,
  transferFilters,
  sortOptions,
  handleSelectSortOption,
}) => {

  const handleValidateInput = (e: any) => {
    if (['-', '+', ',', '.'].includes(e.key)) e.preventDefault();
  };

  const handleSetSortOption = (e: ChangeEvent<HTMLInputElement>) => {
    handleSelectSortOption(e.target.value as 'toLowPrice' | 'toHigthPrice' | 'time');
  };

  const handleSelectTransferFilters = (e: ChangeEvent<HTMLInputElement>) => {
    handleSetTransfersFilters(e.target.value);
  };
  
  return (
    <form className='form'>
      <h3 className='form__title'>
        Сортировать
      </h3>
      <div className='form__section'>
        <label className='form__label'>
          <input
            onChange={handleSetSortOption}
            checked={sortOptions === 'toHigthPrice'}
            value='toHigthPrice'
            name='radio'
            type='radio'
            className='form__radio'
          />
          - по возрастанию цены
        </label>
        <label className='form__label'>
          <input
            onChange={handleSetSortOption}
            checked={sortOptions === 'toLowPrice'}
            value='toLowPrice'
            name='radio'
            type='radio'
            className='form__radio'
          />
          - по убыванию цены
        </label>
        <label className='form__label'>
          <input
            onChange={handleSetSortOption}
            checked={sortOptions === 'time'}
            value='time'
            name='radio'
            type='radio'
            className='form__radio'
          />
          - по времени в пути
        </label>
      </div>
      <h3 className='form__title'>
        Фильтровать
      </h3>
      <div className='form__section'>
        <label className='form__label'>
          <input
            checked={transferFilters.includes('transfer')}
            onChange={handleSelectTransferFilters}
            value={'transfer'}
            type='checkbox'
            className='form__checkbox'
          />
          - 1 пересадка
        </label>
        <label className='form__label'>
          <input
            checked={transferFilters.includes('without')}
            onChange={handleSelectTransferFilters}
            value={'without'}
            type='checkbox'
            className='form__checkbox'
          />
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
            onKeyDown={handleValidateInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetMinPrice(Number(e.target.value))}
            type='number'
            className='form__input'
            name='minPrice'
            value={minPrice || ''}
          />
        </label>
        <label className='form__label'>
          До
          <input
            onKeyDown={handleValidateInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetMaxPrice(Number(e.target.value))}
            type='number'
            className='form__input'
            name='maxPrice'
            value={maxPrice || ''}
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