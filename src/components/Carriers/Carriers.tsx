import { FC } from "react";

type PropsType = {
  carriers: {carrier: string, minPrice: number}[]
}

const Carriers: FC<PropsType> = ({carriers}) => {
  return (
    <ul className='carriers'>
      {
        carriers.map((carrier) => {
          return (
            <li className='carrier'>
              <input value={carrier.carrier} type='checkbox' className='carrier__checkbox' />
              <p title={carrier.carrier} className='carrier__caption'>{carrier.carrier}</p>
              <p className='carrier__price'>от {carrier.minPrice}</p>
            </li>
          )
        })
      }
    </ul>
  )
};

export default Carriers;