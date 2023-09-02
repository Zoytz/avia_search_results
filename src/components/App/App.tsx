import Card from '../Card/Card';
import Sidebar from '../Sidebar/Sidebar';
import data from '../../data/flights.json';

// На всякий случай =)
const parsedData = JSON.parse(JSON.stringify(data));

// Достаем корневой объект из данных
const { result } = parsedData;

const f = result.flights.map((item: any) => item.flight.legs[0].segments[0].departureCity)
// console.log(f)

const App = () => {

  return (
    <div className='page'>
      <main className='main'>
        <Sidebar />
        <section className='content'>
          <ul className='items'>
            {
              // Мапимся по перелетам
              result.flights.map((item: any, index: any) => {
                return (
                  <Card id={index} key={item.flightToken} flight={item.flight}/>
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