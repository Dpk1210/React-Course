import React, { Component } from "react";
//import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import { Link } from "react-router-dom";
import loader from "../ajax-loader.gif";
import Button from "@material-ui/core/Button";

//const { user } = this.props;

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: "" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    //console.log(movie);
    const originalMovie = this.state.movies;
    const movies = originalMovie.filter(m => m._id !== movie._id);
    this.setState({ movies });
    // try {
    //   await deleteMovies(movie._id);
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404);
    //   toast.error("This movie has already been deleted.");
    //   this.setState({ movies: originalMovie });
    // }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.lastIndexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
    console.log("like clicked", movie);
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    console.log("handle select");
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    //console.log("handle select");
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    //console.log(this.state.movies);
    const { length } = this.state.movies;
    const { user } = this.props;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
      searchQuery
    } = this.state;
    if (length === 0) return <img src={loader} className="mx-auto d-block" />;
    const { totalCount, data: movies } = this.getPagedData();

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    //_.orderBy(filtered, [sortCo2lumn.path], [sortColumn.order]);

    //const movies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-9">
            {user && (
              <Link to="/new-movie" style={{ marginBottom: 20 }}>
                <Button variant="contained">New Movie</Button>
              </Link>
            )}
            <p>Showing {filtered.length} movies in the database.</p>
            {user && (
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
            )}
            {length === 0 && <img src={loader} alt="" />}
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
          </div>
        </div>

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />

        {/* <div>
          {this.state.counters.map(counter => (
            <Counters key={counter.id} />
          ))}
        </div> */}
      </React.Fragment>
    );
  }
}

export default Movies;
