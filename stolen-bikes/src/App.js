import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themeConfig';
import Header from './components/Header/Header';
import Bikes from './components/Bikes/Bikes';
import Details from './components/Details/Details';
import Filters from './components/Filters/Filters';
import { getBikes, getBikeById, getTotalStolen } from './actions/bikes';

function App() {
  const dispatch = useDispatch();

  const [details, setDetails] = useState(false);
  const [bikeId, setBikeId] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [date, setDate] = useState({ from: '', to: '' });

  // Handlers
  const handleDetails = () => setDetails(!details);
  const handleBikeId = (id) => setBikeId(id);
  const handlePage = (event, value) => {
    setPage(value);
    window.scroll({ top: 0, behavior: 'smooth' });
  };
  const handleQuery = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = () => {
    dispatch(getBikes(page, query, date.from, date.to));
    dispatch(getTotalStolen(query));
    setDetails(false);
    setPage(1);
  };
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      dispatch(getBikes(page, query, date.from, date.to));
      dispatch(getTotalStolen(query));
      setDetails(false);
      setPage(1);
    }
  };
  const handleDate = (event) => {
    const { value, name } = event.target;
    setDate({ ...date, [name]: value });
  };

  // Gets array of bikes when site renders and page changes
  useEffect(() => {
    dispatch(getBikes(page, query, date.from, date.to));
  }, [page]);
  // Gets bike by id when bikeId has value
  useEffect(() => {
    if (bikeId) {
      dispatch(getBikeById(bikeId));
    }
  }, [bikeId]);
  // Gets total amount of stolen bikes
  useEffect(() => {
    dispatch(getTotalStolen(query));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Filters
        handleQuery={handleQuery}
        query={query}
        handleSubmit={handleSubmit}
        keyPress={keyPress}
        handleDate={handleDate}
        from={date.from}
        to={date.to}
      />
      {!details ? (
        <Bikes
          handleDetails={handleDetails}
          handleBikeId={handleBikeId}
          handlePage={handlePage}
          page={page}
        />
      ) : (
        <Details handleDetails={handleDetails} />
      )}
    </ThemeProvider>
  );
}

export default App;
