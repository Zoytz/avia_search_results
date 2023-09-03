import { ChangeEvent, FC } from 'react';

type PropsType = {
  carriers: { carrier: string, minPrice: number }[]
  handleSelectCarrier: (arg: string) => void
  selectedCarriers: string[]
}

const Carriers: FC<PropsType> = ({ 
  carriers, 
  handleSelectCarrier, 
  selectedCarriers }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSelectCarrier(e.target.value);
  };

  console.log('render Carriers')

  return (
    <ul className='carriers'>
      {
        carriers.map((carrier) => {
          return (
            <li key={carrier.carrier} className='carrier'>
              <input
                onChange={handleChange}
                value={carrier.carrier}
                type='checkbox'
                className='carrier__checkbox'
                checked={selectedCarriers.includes(carrier.carrier)}
                />
              <p
                title={carrier.carrier}
                className='carrier__caption'>
                {carrier.carrier}
              </p>
              <p className='carrier__price'>от {carrier.minPrice} р.</p>
            </li>
          )
        })
      }
    </ul>
  )
};

export default Carriers;