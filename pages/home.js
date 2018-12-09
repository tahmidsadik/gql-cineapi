import fetch from 'isomorphic-unfetch';
import './styl/main.styl'
import { format } from 'date-fns'

const Movie = (props) => (
  <div className="single-mov elevation">
    <img src={(!props.poster || props.poster === 'N/A')? 'https://picsum.photos/300/420' : props.poster} />
    <div className="card">
      <h4>{props.title}</h4>
      <p className="text-md mt-10">{format(new Date(props.release_date), 'Do MMMM, YYYY') }</p>
      <p className="text-sm mt-20">{(!props.plot || props.plot === 'N/A')? props.o_plot.substring(0, 270) : props.plot.substring(0, 270)}</p>
    </div>
  </div>
)

const Home = (props) => (
    <div className="root">
      <h1>Now Premiering</h1>
      <ul className="mov-container">
        {props.movies.map((mov, idx) =>
          <li key={idx}>
            <Movie {...mov} />
          </li>
        )}
      </ul>
    </div>
)


Home.getInitialProps = async function() {
  const url = 'http://207.148.105.155:4000/api/movies/cineplex';
  const res = await fetch(url)
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    movies: data
  }
}

export default Home;
