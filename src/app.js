// @vendors
import React, { useEffect, useRef, useState } from 'react';
import { Grid, Cell } from 'react-md';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// @components
import Picture from './components/picture';
import Information from './components/information';

// @actions
import { editProfile } from './actions/profile';
import { getAvengers } from './actions/avengers';

import './app.scss';

const App = (props) => {
  const [myProfile, setProfile] = useState({
    description: props.profile.description,
    favAvenger: props.profile.favAvenger,
    imageSrc: props.profile.imageSrc,
    name: props.profile.name,
    phone: props.profile.phone
  });
  
  const prevProfileRef = useRef();

  
  useEffect(() => {
    prevProfileRef.current = myProfile;
    const { avengers, getAvengers, profile } = props;

    if (!avengers.length) {
      getAvengers();
    }
    
  });

  return (
    <Grid className="container">
      <Cell
        className="main-section"
        size={4}
        tabletSize={12}
      >
        <Picture
          editProfile={props.editProfile}
          profile={props.profile}
        />
      </Cell>
      <Cell
        className="information-section"
        size={8}
        tabletSize={12}
      >
        <Information
          {...props.profile}
          avengers={props.avengers}
          editProfile={props.editProfile}
        />
      </Cell>
    </Grid>
  );
}

App.propTypes = {
  avengers: PropTypes.array.isRequired,
  editProfile: PropTypes.func.isRequired,
  getAvengers: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    description: PropTypes.string,
    favAvenger: PropTypes.string,
    imageSrc: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string
  }).isRequired
};

const mapStateToProps = ({ avengers, profile }) => ({
  avengers,
  profile
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  editProfile,
  getAvengers
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
