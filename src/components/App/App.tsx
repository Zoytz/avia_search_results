import Card from '../Card/Card';
import Sidebar from '../Sidebar/Sidebar';
import data from '../../data/flights.json';
import Carriers from '../Carriers/Carriers';
import Form from '../Form/Form';
import { useEffect, useState } from 'react';

// На всякий случай =)
const parsedData = JSON.parse(JSON.stringify(data));

console.log(parsedData)

// Достаем корневой объект из данных
const { result } = parsedData;

const f = result.flights.map((item: any) => item.flight.legs[0].segments[0].departureCity)
// console.log(f)

// Создаем массив из компаний-перевозчиков
const carriersArr = result.flights.map((item: any) => item.flight.carrier.caption);

// Создаем сет с уникальными названиями компаний-перевозчиков
const carriersSet = new Set(carriersArr);

// Создаем массив, куда будем складывать авиакомпании и их минимальную цену за билет
const carriersArrWithMinimalPrice: { carrier: string, minPrice: number }[] = [];

// Проходим по сету авиакомпаний
carriersSet.forEach((carrierCaption: any) => {

  // Создаем пустой массив, куда будем складывать цены всех билетов авиакомпании
  const pricesArr: number[] = [];

  // Проходимся по массиву всех полетов
  result.flights.forEach((item: any) => {

    // Если совпадает название авиакомпании из сета с названием из полета - добавляем цену в массив цен
    if (item.flight.carrier.caption === carrierCaption) {
      pricesArr.push(Number(item.flight.price.total.amount));
    }
  });

  // Сортируем массив цен авиакомпании по возрастанию
  pricesArr.sort((a, b) => {
    return a - b;
  });

  // Добавляем в результирующий массив объект с названием авиакомпании и минимальной ценой за билет
  carriersArrWithMinimalPrice.push({ carrier: carrierCaption, minPrice: pricesArr[0] })
});

const App = () => {

  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedCarriers, setSelectedCarriers] = useState(Array.from(carriersSet) as string[]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [cardsCount, setCardsCount] = useState(2);

  const filterByCarriers = (item: any) => {
    if (selectedCarriers.includes(item.flight.carrier.caption)) {
      return item;
    };
  };

  useEffect(() => {
    const filteredByCarriersArr = result.flights.filter(filterByCarriers);
    const reducedFlightsArr = filteredByCarriersArr.slice(0, cardsCount);
    setFilteredFlights(reducedFlightsArr);
  }, [cardsCount, selectedCarriers]);

  const handleSetMinPrice = (newPrice: number) => {
    setMinPrice(newPrice);
  };

  const handleSetMaxPrice = (newPrice: number) => {
    setMaxPrice(newPrice);
  };

  const handleShowMoreCards = () => {
    setCardsCount(prev => prev + 2);
  };

  // Функция фильтра по названию авиакомпании
  const handleSelectCarrier = (carrierCaption: any) => {
    // Проверяем - есть ли в массиве выбранных авиакомпаний переданное название
    if (selectedCarriers.includes(carrierCaption)) {
      // Если есть - удаляем эту авиакомпанию из массива
      const updatedSelectedCarriers = selectedCarriers.filter(carrier => carrier !== carrierCaption);
      setSelectedCarriers(updatedSelectedCarriers);
    } else {
      // Если нет - добавляем авиакомпанию в массив
      const updatedSelectedCarriers = [...selectedCarriers, carrierCaption];
      setSelectedCarriers(updatedSelectedCarriers);
    }
  };

  console.log('render App')

  return (
    <div className='page'>
      <main className='main'>
        <Sidebar>
          <Form
            handleSetMinPrice={handleSetMinPrice}
            handleSetMaxPrice={handleSetMaxPrice}
          >
            <Carriers
              handleSelectCarrier={handleSelectCarrier}
              carriers={carriersArrWithMinimalPrice}
              selectedCarriers={selectedCarriers}
            />
          </Form>
        </Sidebar>
        <section className='content'>
          <ul className='cards'>
            {
              // Мапимся по перелетам
              filteredFlights.map((item: any) => {
                return (
                  <Card key={item.flightToken} flight={item.flight} />
                )
              })
            }
          </ul>
          <button
            onClick={handleShowMoreCards}
            className='content__button'
          >
            Показать еще
          </button>
        </section>
      </main>
    </div>
  )
};

export default App;