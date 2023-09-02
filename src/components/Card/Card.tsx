import clockImage from '../../images/clock.svg';

const Card = ({ flight }: any) => {

  const handleClickButton = () => {
    alert('Этого функционала нет в ТЗ 😉')
  };

  return (
    <li className='card'>
      <div className='card__header'>
        <div className='card__logo'>Логотип {flight.carrier.caption}</div>
        <p className='card__price'>
          {flight.price.total.amount} ₽
          <span className='card__hint'>
            Стоимость для одного взрослого пассажира
          </span>
        </p>
      </div>

      {// Мапимся по этапам перелета
        flight.legs.map((leg: any) => {
          // Узнаем - есть ли пересадки в этапе перелета
          const hasTransfer = leg.segments.length > 1;
          // Получаем объект даты из строки
          const departureDate = new Date(leg.segments[0].departureDate);
          // Получаем словами краткое название месяца и дня недели
          const departureMonthAndDay = departureDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short' });
          // Получаем часы и если цифра одна - добавляем спереди 0
          const departureHours = String(departureDate.getHours()).length < 2 ?
            `0${departureDate.getHours()}` :
            departureDate.getHours();
          // Получаем минуты и если цифра одна - добавляем спереди 0
          const departureMinutes = String(departureDate.getMinutes()).length < 2 ?
            `0${departureDate.getMinutes()}` :
            departureDate.getMinutes();
          // Проверяем - есть ли пересадки. Если есть - создаем объект даты из даты прибытия второго перелета
          const arrivalDate = !hasTransfer ?
            new Date(leg.segments[0].arrivalDate) :
            new Date(leg.segments[1].arrivalDate);
          // Получаем словами краткое название месяца и дня недели  
          const arrivalDateMonthAndDay = arrivalDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'short' });
          // Получаем часы и если цифра одна - добавляем спереди 0
          const arrivalHours = String(arrivalDate.getHours()).length < 2 ?
            `0${arrivalDate.getHours()}` :
            arrivalDate.getHours();
          // Получаем минуты и если цифра одна - добавляем спереди 0
          const arrivalMinutes = String(arrivalDate.getMinutes()).length < 2 ?
            `0${arrivalDate.getMinutes()}` :
            arrivalDate.getMinutes();

          return (
            <>
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
            </>
          )
        })
      }
      <button onClick={handleClickButton} type='button' className='card__button'>Выбрать</button>
    </li>
  )
};

export default Card;