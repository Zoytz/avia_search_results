import Card from '../Card/Card';
import Sidebar from '../Sidebar/Sidebar';
import data from '../../data/flights.json';
import Carriers from '../Carriers/Carriers';
import Form from '../Form/Form';
import { useEffect, useState } from 'react';
import { FlightsItemType, FlightsType } from '../../types';

// На всякий случай =)
const parsedData = JSON.parse(JSON.stringify(data));

// Достаем корневой объект из данных
const { result } = parsedData;

// Создаем массив из компаний-перевозчиков
const carriersArr = result.flights.map((item: FlightsItemType) => item.flight.carrier.caption);

// Создаем сет с уникальными названиями компаний-перевозчиков
const carriersSet = new Set(carriersArr);

// Создаем массив, куда будем складывать авиакомпании и их минимальную цену за билет
const carriersArrWithMinimalPrice: { carrier: string, minPrice: number }[] = [];

// Проходим по сету авиакомпаний
carriersSet.forEach((carrierCaption: any) => {

  // Создаем пустой массив, куда будем складывать цены всех билетов авиакомпании
  const pricesArr: number[] = [];

  // Проходимся по массиву всех полетов
  result.flights.forEach((item: FlightsItemType) => {

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

  const [filteredFlights, setFilteredFlights] = useState<FlightsType | []>([]);
  const [selectedCarriers, setSelectedCarriers] = useState(Array.from(carriersSet) as string[]);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [cardsCount, setCardsCount] = useState(2);
  const [transferFilters, setTransferFilters] = useState<string[]>([]);
  const [sortOptions, setSortOptions] = useState<'toLowPrice' | 'toHigthPrice' | 'time'>('toHigthPrice');

  // Функция сортировки перелетов
  const filterBySortOptions = (flights: FlightsType) => {
    
    if (sortOptions === 'toLowPrice') {
      return flights.sort((a, b) => {
        return Number(b.flight.price.total.amount) - Number(a.flight.price.total.amount);
      });
    };

    if (sortOptions === 'toHigthPrice') {
      return flights.sort((a, b) => {
        return Number(a.flight.price.total.amount) - Number(b.flight.price.total.amount);
      });
    };

    if (sortOptions === 'time') {
      return flights.sort((a, b) => {
        return (a.flight.legs[0].duration + a.flight.legs[1].duration) - (b.flight.legs[0].duration + b.flight.legs[1].duration);
      });
    };

    return [];

  };

  // Функция фильтрации по пересадкам
  const filterByTransfers = (item: FlightsItemType) => {
    // Проверяем - если длина массива фильтров равна 0 или 2 - показываем все перелеты
    if (transferFilters.length === 0 || transferFilters.length === 2) return item;
    // Создаем массив сегментов
    const segmentsArr = item.flight.legs.map((leg) => leg.segments);
    // Если в массиме фильтров есть фильтр пересадки - проверяем, чтобы сегментов было больше 3 и в таком случае возвращаем перелет
    if (transferFilters[0] === 'transfer' && segmentsArr.flat().length > 3) return item;
    // Если в массиме фильтров есть фильтр отсутствия пересадки - проверяем, чтобы сегментов было 2 или меньше и в таком случае возвращаем перелет
    if (transferFilters[0] === 'without' && segmentsArr.flat().length <= 2) return item;
  };

  // Функция фильтрации по авиакомпаниям
  const filterByCarriers = (item: FlightsItemType) => {
    // Проверяем - есть ли авиакомпания в массиве выбранных авиакомпаний и если есть - возвращаем перелет
    if (selectedCarriers.includes(item.flight.carrier.caption)) {
      return item;
    };
  };

  useEffect(() => {
    // Фильтруем перелеты по выбранным авиакомпаниям
    const filteredByCarriersArr = result.flights.filter(filterByCarriers);
    // Фильтруем перелеты по цене
    const filteredByPriceArr = filteredByCarriersArr.filter((item: FlightsItemType) => Number(item.flight.price.total.amount) <= maxPrice && Number(item.flight.price.total.amount) >= minPrice);
    // Фильтруем перелеты по пересадкам
    const filteredByTransfersArr = filteredByPriceArr.filter(filterByTransfers);
    // Сортируем массив перелетов в соответствии с параметрами фильтра
    const sortedFlightsArr = filterBySortOptions(filteredByTransfersArr);
    // Обрезаем получившийся массив перелетов
    const reducedFlightsArr = sortedFlightsArr.slice(0, cardsCount);
    setFilteredFlights(reducedFlightsArr);
  }, [cardsCount, selectedCarriers, minPrice, maxPrice, transferFilters, sortOptions]);

  const handleSetMinPrice = (newPrice: number) => {
    setMinPrice(newPrice);
  };

  const handleSetMaxPrice = (newPrice: number) => {
    setMaxPrice(newPrice);
  };

  // Функция установки фильтров по пересадкам
  const handleSetTransfersFilters = (newTransfersFilter: string) => {
    // Проверяем - есть ли в массиве фильтров переданное значение
    if (transferFilters.includes(newTransfersFilter)) {
      // Если есть - удаляем его из массива
      const updatedTransferFilters = transferFilters.filter(transferFilter => transferFilter !== newTransfersFilter);
      setTransferFilters(updatedTransferFilters);
    } else {
      // Если нет - добавляем новое значение в массив
      const updatedTransferFilters = [...transferFilters, newTransfersFilter];
      setTransferFilters(updatedTransferFilters);
    };
  };

  const handleSelectSortOption = (newSortOption: 'toLowPrice' | 'toHigthPrice' | 'time') => {
    setSortOptions(newSortOption);
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

  return (
    <div className='page'>
      <main className='main'>
        <Sidebar>
          <Form
            handleSetMinPrice={handleSetMinPrice}
            handleSetMaxPrice={handleSetMaxPrice}
            minPrice={minPrice}
            maxPrice={maxPrice}
            handleSetTransfersFilters={handleSetTransfersFilters}
            transferFilters={transferFilters}
            sortOptions={sortOptions}
            handleSelectSortOption={handleSelectSortOption}
          >
            <Carriers
              handleSelectCarrier={handleSelectCarrier}
              carriers={carriersArrWithMinimalPrice}
              selectedCarriers={selectedCarriers}
            />
          </Form>
        </Sidebar>
        <section className='content'>
          {
            !filteredFlights ?
              <p className='content__hint'>
                Перелеты не найдены
              </p>
              :
              <>
                <ul className='cards'>
                  {
                    // Мапимся по перелетам
                    filteredFlights.map((item: FlightsItemType) => {
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
              </>
          }
        </section>
      </main>
    </div>
  )
};

export default App;