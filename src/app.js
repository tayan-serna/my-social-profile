// @vendors
import React from 'react';
import { Grid, Cell } from 'react-md';
import PropTypes from 'prop-types';

// @components
import Picture from './components/picture';
import Information from './components/information';

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
      </Cell>
      <Cell
        className="information-section"
        size={8}
        tabletSize={12}
      >
        <Information {...props} />
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
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia lectus nulla, et ornare risus malesuada eu. Proin sodales elit id bibendum hendrerit. Vivamus vitae elementum leo. Phasellus imperdiet felis eros, et luctus nulla posuere placerat. Cras aliquam suscipit tempor. Aliquam erat volutpat. Ut vel felis vitae ligula accumsan interdum. In placerat velit ut diam mattis eleifend. Sed mollis tellus libero. Morbi tristique nisl eu eros ullamcorper congue. Etiam euismod iaculis pellentesque. Vestibulum est risus, maximus vestibulum ipsum non, semper venenatis orci. Nullam elementum, mi eu dictum gravida, enim erat condimentum lectus, sed viverra erat leo sit amet lacus. Nulla facilisi.',
  favAvenger: 'Thor',
  name: 'Adrian Serna',
  phone: '+57 3106064463'
};

export default App;
