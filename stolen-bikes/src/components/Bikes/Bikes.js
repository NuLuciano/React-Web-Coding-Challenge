import { CircularProgress, Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Bike from './Bike/Bike';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 40,
    position: 'relative',
    gap: 15,
  },
  total: {
    position: 'absolute',
    right: '10%',
    top: -25,
  },
  item: {
    width: '100%',
  },
  pagination: {
    margin: 20,
  },
}));

const Bikes = ({ handleDetails, handleBikeId, handlePage, page }) => {
  const classes = useStyles();
  const bikes = useSelector((state) => state.bikes.bikes);
  const error = useSelector((state) => state.bikes.error);
  const empty = useSelector((state) => state.bikes.empty);
  const total = useSelector((state) => state.bikes.total);

  const renderBikes = () => {
    if (error) {
      return (
        <Grid item>
          <Typography variant="h5" color="secondary">
            {error.message}
          </Typography>
        </Grid>
      );
    }
    if (empty) {
      return (
        <Grid item>
          <Typography variant="h5" color="inherit">
            No results found...
          </Typography>
        </Grid>
      );
    }
    if (bikes.length > 0) {
      return bikes.map(
        (bike) =>
          bike.stolen && (
            <Grid item xs={12} key={bike.id}>
              <Bike
                handleDetails={handleDetails}
                handleBikeId={handleBikeId}
                bikeId={bike.id}
                thumb={bike.thumb}
                title={bike.title}
                description={bike.description}
                frameColors={bike.frame_colors}
                dateStolen={bike.date_stolen}
                stolenLocation={bike.stolen_location}
              />
            </Grid>
          ),
      );
    }
    return (
      <Grid item>
        <CircularProgress size={50} thickness={30} />
      </Grid>
    );
  };

  useEffect(() => {
    renderBikes();
  }, [empty]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      {total ? (
        <Grid item>
          <Typography variant="h5" color="primary" className={classes.total}>
            {`Total: ${total}`}
          </Typography>
        </Grid>
      ) : null}
      {renderBikes()}
      {bikes.length && total ? (
        <Grid item>
          <Pagination
            className={classes.pagination}
            count={Math.ceil(total / 10)}
            page={page}
            color="primary"
            size="large"
            shape="rounded"
            onChange={handlePage}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Bikes;

Bikes.defaultProps = {
  page: 1,
};

Bikes.propTypes = {
  handleDetails: PropTypes.func.isRequired,
  handleBikeId: PropTypes.func.isRequired,
  handlePage: PropTypes.func.isRequired,
  page: PropTypes.number,
};
