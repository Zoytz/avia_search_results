import clockImage from '../../images/clock.svg';

import AirFrance from '../../images/AirFrance.png';
import KLM from '../../images/KLM.png';
import Aeroflot from '../../images/Aeroflot.png';
import Turkish from '../../images/TurkishAirlines.png';
import Finnair from '../../images/Finnair.png';
import Baltic from '../../images/AirBaltic.png';
import AlitaliaSocieta from '../../images/Alitalia.png';
import Pegasus from '../../images/Pegasus.png';
import Brussels from '../../images/Brussels.png';
import LOT from '../../images/LOT.png';

const Card = ({ flight }: any) => {

  const handleClickButton = () => {
    alert('Этого функционала нет в ТЗ 😉')
  };

  let cardLogo = '';

  switch (flight.carrier.caption) {
    case 'Air France':
      cardLogo = AirFrance;
      break
    case 'KLM':
      cardLogo = KLM;
      break
    case 'Аэрофлот - российские авиалинии':
      cardLogo = Aeroflot;
      break
    case 'TURK HAVA YOLLARI A.O.':
      cardLogo = Turkish;
      break
    case 'Finnair Oyj':
      cardLogo = Finnair;
      break
    case 'Air Baltic Corporation A/S':
      cardLogo = Baltic;
      break
    case 'Alitalia Societa Aerea Italiana':
      cardLogo = AlitaliaSocieta;
      break
    case 'Pegasus Hava Tasimaciligi A.S.':
      cardLogo = Pegasus;
      break
    case 'Brussels Airlines':
      cardLogo = Brussels;
      break
    case 'LOT Polish Airlines':
      cardLogo = LOT;
      break
  };

  return (
    <li className='card'>
      <div className='card__header'>
        <img src={cardLogo} alt={`Логотип ${flight.carrier.caption}`} className='card__logo' />
        <div className='card__logo'></div>
        <p className='card__price'>
          {flight.price.total.amount} ₽
          <span className='card__hint'>
            Стоимость для одного взрослого пассажира
          </span>
        </p>
      </div>

      {
        flight.legs.map((leg: any) => {
          
          const hasTransfer = leg.segments.length > 1;
          const departureDate = new Date(leg.segments[0].departureDate);
          const departureMonthAndDay = departureDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short' });
          const departureHours = String(departureDate.getHours()).length < 2 ?
            `0${departureDate.getHours()}` :
            departureDate.getHours();
          const departureMinutes = String(departureDate.getMinutes()).length < 2 ?
            `0${departureDate.getMinutes()}` :
            departureDate.getMinutes();
          const arrivalDate = !hasTransfer ?
            new Date(leg.segments[0].arrivalDate) :
            new Date(leg.segments[1].arrivalDate);
          const arrivalDateMonthAndDay = arrivalDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short' });
          const arrivalHours = String(arrivalDate.getHours()).length < 2 ?
            `0${arrivalDate.getHours()}` :
            arrivalDate.getHours();
          const arrivalMinutes = String(arrivalDate.getMinutes()).length < 2 ?
            `0${arrivalDate.getMinutes()}` :
            arrivalDate.getMinutes();

          return (
            <div
              key={`${leg.segments[0].flightNumber}${leg.segments[0].arrivalDate}`} className='card__content'
            >
              {
                hasTransfer ?
                  <h2 className='card__title'>
                    {
                      leg.segments[0].departureCity ?
                        leg.segments[0].departureCity.caption :
                        ''
                    }, {leg.segments[0].departureAirport.caption} <span className='card__span'>{` (${leg.segments[0].departureAirport.uid})`} </span> → {leg.segments[1].arrivalCity ?
                      leg.segments[1].arrivalCity.caption :
                      ''
                    }, {leg.segments[1].arrivalAirport.caption} <span className='card__span'> {` (${leg.segments[1].arrivalAirport.uid})`}
                    </span>
                  </h2>
                  :
                  <h2 className='card__title'>
                    {leg.segments[0].departureCity.caption}, {leg.segments[0].departureAirport.caption} <span className='card__span'>
                      {`(${leg.segments[0].departureAirport.uid})`}
                    </span> → {leg.segments[0].arrivalCity.caption}, {leg.segments[0].arrivalAirport.caption} <span className='card__span'>
                      {`(${leg.segments[0].arrivalAirport.uid})`}
                    </span>
                  </h2>
              }

              <div className='card__dates'>
                <p className='card__date'>
                  <span className='card__date_type_time'>
                    {departureHours}:{departureMinutes}
                  </span> <span className='card__span'>{departureDate.getUTCDate()} {departureMonthAndDay}</span>
                </p>
                <p className='card__time'>
                  <img src={clockImage} alt='time' className='card__time-image' />
                  <span className='card__date_type_time'>
                    {Math.floor(leg.duration / 60)} ч {leg.duration % 60} м
                  </span>
                </p>
                <p className='card__date'>
                  <span className='card__span'>{arrivalDate.getUTCDate()} {arrivalDateMonthAndDay}</span> <span className='card__date_type_time'>{arrivalHours}:{arrivalMinutes}</span>
                </p>
              </div>

              <div className={`card__transfer ${hasTransfer ? '' : 'card__transfer_type_empty'}`}>
                {hasTransfer ?
                  <span className='card__transfer-text'>
                    1 пересадка
                  </span>
                  :
                  null
                }
              </div>

              <p className='card__carrier'>
                Рейс выполняет: {flight.carrier.caption}
              </p>
            </div>
          )
        })
      }
      <button onClick={handleClickButton} type='button' className='card__button'>Выбрать</button>
    </li>
  )
};

export default Card;