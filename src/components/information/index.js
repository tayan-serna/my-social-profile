// @vendors
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'react-md';
import { FontIcon, TextField } from 'react-md';
// import React, { useState, useEffect } from 'react';

const Information = (props) => {
  const [profile, setProfile] = useState({
    description: props.description,
    favAvenger: props.favAvenger,
    name: props.name,
    phone: props.phone
  });

  const [editDesc, setEditDesc] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  console.log(props.editProfile);
  console.log(profile);
  const handlePropChange = (propName, value) => {
    setProfile({
      ...profile,
      [propName]: value
    })
  }

  return (
    <Fragment>
      <h1 className="information-section__title">
        {`Welcome ${profile.name}`}
      </h1>
      <section className="information-section__container">
        <Card className="information-section__description margin-bottom-1rem">
          <CardTitle
            className="information-section__card-title"
            title={(
              <Fragment>
                <FontIcon>face</FontIcon><span>About Me</span>
              </Fragment>
            )}
          />
          <CardText
            onClick={() => setEditDesc(true)}
          >
            {
              editDesc
                ? (
                  <TextField
                    id="description"
                    lineDirection="right"
                    onChange={(val) => handlePropChange('description', val)}
                    onBlur={() => setEditDesc(false)}
                    rows={2}
                    value={profile.description}
                  />
                )
                : (
                  <p>
                    {profile.description}
                  </p>
                )
            }
          </CardText>
        </Card>
        <Card className="information-section__more-about">
          <CardTitle
            className="information-section__card-title"
            title={(
              <Fragment>
                <FontIcon>directions_run</FontIcon><span>More Info About Me</span>
              </Fragment>
            )}
          />
          <CardText>
            <div
              className="information-section__phone"
              onClick={() => setEditPhone(true)}
            >
              <h3 className="information-section__sub-title">
                Phone
              </h3>
              {
                editPhone
                  ? (
                    <TextField
                      id="phone"
                      lineDirection="right"
                      onChange={(val) => handlePropChange('phone', val)}
                      onBlur={() => setEditPhone(false)}
                      rows={2}
                      value={profile.phone}
                    />
                  )
                  : (
                    <span>
                      {profile.phone}
                    </span>
                  )
              }
            </div>
            <div className="information-section__fav-avenger">
              <h3 className="information-section__sub-title">
                My Favorite Avenger
              </h3>
              <span>
                {profile.favAvenger}
              </span>
            </div>
          </CardText>
        </Card>
      </section>
    </Fragment>
  )
};

Information.propTypes = {
  description: PropTypes.string.isRequired,
  editProfile: PropTypes.func.isRequired,
  favAvenger: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default Information;
