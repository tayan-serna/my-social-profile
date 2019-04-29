// @vendors
import React from 'react';
import { Grid, Cell } from 'react-md';
import PropTypes from 'prop-types';

// @components
import Picture from './picture';

import './app.scss';

const App = (props) => {
  return (
    <Grid className="container">
      <Cell
        className="main-section"
        size={4}
        tabletSize={12}
      >
        <Picture />
        {props.name}
      </Cell>
      <Cell
        className="information-section"
        size={8}
        tabletSize={12}
      >
        - Phone number
        - Brief description about self.
        - Favorite avenger
      </Cell>
    </Grid>
  );
}

App.propTypes = {
  name: PropTypes.string
};

App.defaultProps = {
  name: 'Adrian Serna'
};

export default App;
