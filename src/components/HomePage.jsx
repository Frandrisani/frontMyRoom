import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCity } from "../redux/actions/";
import CardHome from "./CardHome";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { apartments, isLoading, error } = useSelector((state) => state.city);

  const handleSearch = () => {
    dispatch(fetchCity(searchQuery));
  };

  return (
    <div>
      <h1>HomePage</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search city..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {apartments && (
        <div className="card-list">
          {apartments.map((apartment) => (
            <CardHome key={apartment.id} apartment={apartment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
