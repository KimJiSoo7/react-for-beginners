import { object } from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    // console.log(json.data);
    setMovie(json.data.movie);
    console.log(movie);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <ul>
            <li>{`run time: ${movie.runtime}min`}</li>
            <li>{`rating: ${movie.rating}`}</li>
            <li>
              <a href={`${movie.url}`}>for more details</a>
            </li>
            <hr />
            <p>{movie.description_full}</p>
          </ul>
        </div>
      )}
    </div>
  );
}
export default Detail;
