// @vendors
import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardText,
  CardTitle,
  DialogContainer,
  FontIcon,
  SelectField,
  TextField
} from 'react-md';

const Information = (props) => {
  const [profile, setProfile] = useState({
    ...props.profile
  });
  const [modalProfile, setModalProfile] = useState({
    ...props.profile
  });
  const [editDesc, setEditDesc] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editFavAvenger, setEditFavAvenger] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePropChange = (propName, value) => {
    if (propName === 'favAvenger') {
      setEditFavAvenger(false);
    }

    props.editProfile({
      ...profile,
      [propName]: value
    });
  };

  const handleModalPropChange = (propName, value) => {
    setModalProfile({
      ...modalProfile,
      [propName]: value
    });
  };

  const renderSelectItems = () => props.avengers.map(avenger => avenger.name);

  const onConfirm = () => {
    props.editProfile({...modalProfile});
    setModalOpen(false)
  };

  const onCancel = () => {
    setModalProfile({
      ...profile
    });
    setModalOpen(false);
  }

  let ref = useRef({...profile });
  let hasProfileChanged = JSON.stringify(ref.current) !== JSON.stringify(props.profile);

  useEffect(() => {
    if (hasProfileChanged) {
      ref.current = { ...props.profile };
      setProfile({
        ...props.profile
      })
      setModalProfile({
        ...props.profile
      });
    }
  })

  const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: onCancel });
    actions.push(<Button flat primary onClick={() => onConfirm()}>Confirm</Button>);

  return (
    <Fragment>
      <h1 className="information-section__title">
        {`Welcome ${profile.name}`}
        <FontIcon
          onClick={() => setModalOpen(true)}
        >
          edit
        </FontIcon>
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
                    autoFocus
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
                      autoFocus
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
            <div
              className="information-section__fav-avenger"
            >
              <h3
                onClick={() => setEditFavAvenger(true)}
                className="information-section__sub-title"
              >
                My Favorite Avenger
              </h3>
              {
                editFavAvenger
                  ? (
                    <SelectField
                      id="favorite-avenger"
                      label="avengers"
                      className="md-cell"
                      onChange={(val) => handlePropChange('favAvenger', val)}
                      menuItems={renderSelectItems()}
                      value={profile.favAvenger}
                    />
                  )
                  : (
                    <span onClick={() => setEditFavAvenger(true)} >
                      {profile.favAvenger}
                    </span>
                  )
              }
            </div>
          </CardText>
        </Card>
      </section>
      <DialogContainer
        actions={actions}
        closeOnEsc={false}
        id="edit-dialog"
        visible={modalOpen}
        title="Edit My Profile"
        onHide={onCancel}
        modal
      >
        <form>
          <TextField
            id="edit-name"
            lineDirection="right"
            onChange={(val) => handleModalPropChange('name', val)}
            onBlur={() => setEditPhone(false)}
            rows={2}
            value={modalProfile.name}
          />
          <TextField
            id="edit-phone"
            lineDirection="right"
            onChange={(val) => handleModalPropChange('phone', val)}
            onBlur={() => setEditPhone(false)}
            rows={2}
            value={modalProfile.phone}
          />
          <TextField
            id="edit-description"
            lineDirection="right"
            onChange={(val) => handleModalPropChange('description', val)}
            onBlur={() => setEditDesc(false)}
            rows={2}
            value={modalProfile.description}
          />
          <SelectField
            id="edit-fav-avenger"
            label="avengers"
            className="md-cell"
            onChange={(val) => handleModalPropChange('favAvenger', val)}
            menuItems={renderSelectItems()}
            value={modalProfile.favAvenger}
          />
        </form>
      </DialogContainer>
    </Fragment>
  )
};

Information.propTypes = {
  profile: PropTypes.shape({
    description: PropTypes.string.isRequired,
    favAvenger: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }).isRequired,
  avengers: PropTypes.array.isRequired,
  editProfile: PropTypes.func.isRequired
};

export default Information;
