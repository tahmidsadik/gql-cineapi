import { useState } from "react";
import fetch from "isomorphic-unfetch";
import "./styl/main.styl";
import {
  format,
  isSunday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isWithinRange,
  addDays,
  isToday
} from "date-fns";

import moment from "moment";
import "moment/locale/bn";

import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const marks = {
  0: "শুক্রবার",
  1: "শনিবার",
  2: "রবিবার",
  3: "সোমবার",
  4: "মঙ্গলবার",
  5: "বুধবার",
  6: "বৃহস্পতিবার"
};

const dateFilters = {
  0: isFriday,
  1: isSaturday,
  2: isSunday,
  3: isMonday,
  4: isTuesday,
  5: isWednesday,
  6: isThursday
};

const Movie = props => (
  <div className="single-mov elevation">
    <img
      src={
        !props.poster || props.poster === "N/A"
          ? "https://picsum.photos/300/420"
          : props.poster
      }
    />
    <div className="card">
      <h4>{props.title}</h4>
      <p className="text-md mt-10">
        {format(new Date(props.release_date), "Do MMMM, YYYY")}
      </p>
      <p className="text-sm mt-20">
        {!props.plot || props.plot === "N/A"
          ? props.o_plot.substring(0, 270)
          : props.plot.substring(0, 270)}
      </p>
      <div className="showtime-section">
        <div>শো-টাইম:</div>
        <ul>
          {props.filteredShowtimes.map((st, idx) => (
            <li className="time-container" key={idx}>
              <p>{moment(st).format("LT")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Home = props => {
  const [filterDate, setFilterDate] = useState(0);
  // TODO: Do not recompute everything
  const movies = props.movies.map(mov => ({
    ...mov,
    filteredShowtimes: mov.showtimes
      .filter(st => {
        const tDate = new Date(st.showtime);
        return isWithinRange(tDate, new Date(), addDays(new Date(), 7));
      })
      .filter(st => dateFilters[filterDate](new Date(st.showtime)))
      .map(st => new Date(st.showtime))
  }));
  const filteredMovies = movies.filter(mov => mov.filteredShowtimes.length);
  return (
    <div className="root">
      <h1>Now Premiering</h1>
      <div className="main-content">
        <div className="slider-container slider-container-left">
          <Slider
            vertical
            min={0}
            max={6}
            marks={marks}
            included={false}
            defaultValue={filterDate}
            onChange={newFilterVal => {
              console.log(newFilterVal);
              setFilterDate(newFilterVal);
            }}
          />
        </div>
        <ul className="mov-container">
          {filteredMovies.length ? (
            filteredMovies.map((mov, idx) => (
              <li key={idx}>
                <Movie {...mov} />
              </li>
            ))
          ) : (
            <h1>Uh oh! looks like no movies is Premiering on this day!</h1>
          )}
        </ul>
        <div className="slider-container slider-container-right">
          <Slider
            vertical
            min={0}
            max={6}
            marks={marks}
            included={false}
            defaultValue={0}
          />
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async function() {
  const url = "http://207.148.105.155:4000/api/movies/cineplex";
  const res = await fetch(url);
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    movies: data
  };
};

export default Home;
