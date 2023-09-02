import Card from '../Card/Card';
import Sidebar from '../Sidebar/Sidebar';
import data from '../../data/flights.json';
import Carriers from '../Carriers/Carriers';
import Form from '../Form/Form';

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
console.log(carriersSet)

const carriersArrWithMinimalPrice: { carrier: string, minPrice: number }[] = [];

carriersSet.forEach((carrierCaption: any) => {
  const pricesArr: number[] = [];
  result.flights.forEach((item: any) => {
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

  return (
    <div className='page'>
      <main className='main'>
        <Sidebar>
          <Form>
            <Carriers carriers={carriersArrWithMinimalPrice} />
          </Form>
        </Sidebar>
        <section className='content'>
          <ul className='items'>
            {
              // Мапимся по перелетам
              result.flights.map((item: any) => {
                return (
                  <Card key={item.flightToken} flight={item.flight} />
                )
              })
            }
          </ul>
          <button className='content__button'>Показать еще</button>
        </section>
      </main>
    </div>
  )
};

export default App;