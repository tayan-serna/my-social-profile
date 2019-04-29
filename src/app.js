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
        <div className="main-section__name">
          <span>{props.name}</span>
        </div>
      </Cell>
      <Cell
        className="information-section"
        size={8}
        tabletSize={12}
      >
        <div>
          <span>{props.phone}</span>
        </div>
        <div>
          <span>
            {props.description}
          </span>
        </div>
        <div>
          <span>{props.favAvenger}</span>
        </div>
      </Cell>
    </Grid>
  );
}

App.propTypes = {
  description: PropTypes.string,
  favAvenger: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string
};

App.defaultProps = {
  description: ' Lorem ',
  favAvenger: 'Thor',
  name: 'Adrian Serna',
  phone: '+57 3106064463'
};

export default App;
