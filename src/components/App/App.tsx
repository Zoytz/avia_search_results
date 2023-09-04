import Card from '../Card/Card';
import Sidebar from '../Sidebar/Sidebar';
import data from '../../data/flights.json';
import Carriers from '../Carriers/Carriers';
import Form from '../Form/Form';
import { useEffect, useState } from 'react';
import { FlightsItemType, FlightsType } from '../../types';

const parsedData = JSON.parse(JSON.stringify(data));

const { result } = parsedData;

const carriersArr = result.flights.map((item: FlightsItemType) => item.flight.carrier.caption);

const carriersSet = new Set(carriersArr);

const carriersArrWithMinimalPrice: { carrier: string, minPrice: number }[] = [];

carriersSet.forEach((carrierCaption: any) => {

  const pricesArr: number[] = [];

  result.flights.forEach((item: FlightsItemType) => {

    if (item.flight.carrier.caption === carrierCaption) {
      pricesArr.push(Number(item.flight.price.total.amount));
    }
  });

  pricesArr.sort((a, b) => {
    return a - b;
  });

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

  const filterByTransfers = (item: FlightsItemType) => {
    
    if (transferFilters.length === 0 || transferFilters.length === 2) return item;
    const segmentsArr = item.flight.legs.map((leg) => leg.segments);
    if (transferFilters[0] === 'transfer' && segmentsArr.flat().length > 3) return item;
    if (transferFilters[0] === 'without' && segmentsArr.flat().length <= 2) return item;
  };

  const filterByCarriers = (item: FlightsItemType) => {
    if (selectedCarriers.includes(item.flight.carrier.caption)) {
      return item;
    };
  };

  useEffect(() => {
    
    const filteredByCarriersArr = result.flights.filter(filterByCarriers);
    
    const filteredByPriceArr = filteredByCarriersArr.filter((item: FlightsItemType) => Number(item.flight.price.total.amount) <= maxPrice && Number(item.flight.price.total.amount) >= minPrice);
    
    const filteredByTransfersArr = filteredByPriceArr.filter(filterByTransfers);
  
    const sortedFlightsArr = filterBySortOptions(filteredByTransfersArr);

    const reducedFlightsArr = sortedFlightsArr.slice(0, cardsCount);
    setFilteredFlights(reducedFlightsArr);
  }, [cardsCount, selectedCarriers, minPrice, maxPrice, transferFilters, sortOptions]);

  const handleSetMinPrice = (newPrice: number) => {
    setMinPrice(newPrice);
  };

  const handleSetMaxPrice = (newPrice: number) => {
    setMaxPrice(newPrice);
  };

  const handleSetTransfersFilters = (newTransfersFilter: string) => {
    if (transferFilters.includes(newTransfersFilter)) {
      const updatedTransferFilters = transferFilters.filter(transferFilter => transferFilter !== newTransfersFilter);
      setTransferFilters(updatedTransferFilters);
    } else {
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

  const handleSelectCarrier = (carrierCaption: any) => {
    if (selectedCarriers.includes(carrierCaption)) {
      const updatedSelectedCarriers = selectedCarriers.filter(carrier => carrier !== carrierCaption);
      setSelectedCarriers(updatedSelectedCarriers);
    } else {
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