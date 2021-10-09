import {
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({
  handleQuery,
  handleSubmit,
  keyPress,
  handleDate,
  query,
  from,
  to,
}) => (
  <Grid container direction="row" justifyContent="center" alignItems="center">
    <Grid item>
      <FormControl>
        <InputLabel>Search</InputLabel>
        <Input
          type="text"
          value={query}
          onChange={(e) => handleQuery(e)}
          onKeyDown={(e) => keyPress(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" onClick={handleSubmit}>
                <SearchIcon color="primary" />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
    <Grid item>
      <Divider orientation="vertical" style={{ height: '5vh', width: 2 }} />
    </Grid>
    <Grid item>
      <FormControl
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id="date-from"
          label="From"
          name="from"
          type="date"
          value={from}
          onChange={(e) => handleDate(e)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="date-to"
          label="To"
          name="to"
          type="date"
          value={to}
          onChange={(e) => handleDate(e)}
          style={{ marginLeft: 10 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <IconButton
          type="submit"
          onClick={handleSubmit}
          style={{ marginTop: 20 }}
        >
          <SearchIcon color="primary" fontSize="medium" />
        </IconButton>
      </FormControl>
    </Grid>
  </Grid>
);

export default Filters;

Filters.defaultProps = {
  query: '',
  from: '',
  to: '',
};

Filters.propTypes = {
  handleQuery: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  keyPress: PropTypes.func.isRequired,
  handleDate: PropTypes.func.isRequired,
  query: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
};
