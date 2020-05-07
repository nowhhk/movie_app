import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  //초기상태. setState를 호출하면 리액트는 state를 refresh하고 또한 render함수를 호출한다.

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    // async await 쓰는 이유 - 자바스크립트에게 getMovies function가 실행되는데에 시간이 필요한데, 그걸 기다리도록 하는것!
    //이게 없으면 자바스크립트는 function을 기다리지 않는다.
    this.setState({ movies, isLoading: false }); //{movies:movies}
  };

  componentDidMount() {
    this.getMovies();
  }
  //componentDidMount는 render가 된 후 바로 동작하는 함수

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
