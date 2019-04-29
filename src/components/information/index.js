// @vendors
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'react-md';

const Information = (props) => {
  return (
    <Fragment>
      <h1 className="information-section__title">
        {`Welcome ${props.name}`}
      </h1>
      <section className="information-section__container">
        <Card className="information-section__description margin-bottom-1rem">
          <CardTitle title="About Me" />
          <CardText>
            <p>
              {props.description}
            </p>
          </CardText>
        </Card>
        <Card className="information-section__more-about">
          <CardTitle title="More Info About Me" />
          <CardText>

            <div className="information-section__phone">
              <h3 className="information-section__sub-title">
                Phone
              </h3>
              <span>
                {props.phone}
              </span>
            </div>
            <div className="information-section__fav-avenger">
              <h3 className="information-section__sub-title">
                My Favorite Avenger
              </h3>
              <span>
                {props.favAvenger}
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
  favAvenger: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default Information;
