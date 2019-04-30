// @vendors
import React from 'react';
import { Grid, Cell } from 'react-md';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// @components
import Picture from './components/picture';
import Information from './components/information';

// @actions
import { editVideoClip } from './actions/profile';

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
        <Information {...props.profile} />
      </Cell>
    </Grid>
  );
}

App.propTypes = {
  editVideoClip: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    description: PropTypes.string,
    favAvenger: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string
  }).isRequired
};

const mapStateToProps = ({ profile }) => ({
  profile
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  editVideoClip
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
