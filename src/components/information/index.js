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

import { validatePhone } from '../../utils/utils';

const Information = (props) => {
  const [profile, setProfile] = useState({
    ...props.profile
  });
  const [modalProfile, setModalProfile] = useState({
    ...props.profile
  });
  const [modalValidations, setModalValidations] = useState({
    isNameValid: true,
    isModalPhoneValid: true
  });
  const [isPhoneValid, setIsPhoneValid] = useState(true);
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
  };

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
  }, [hasProfileChanged, props.profile])


  const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: onCancel });
    actions.push(
      <Button
        disabled={
          !modalValidations.isNameValid || !modalValidations.isModalPhoneValid
        }
        flat
        onClick={() => onConfirm()}
        primary
      >
        Confirm
      </Button>
    );

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
                      error={!isPhoneValid}
                      errorText="invalid format"
                      id="phone"
                      lineDirection="right"
                      onChange={(val) => {
                        setIsPhoneValid(validatePhone(val));
                        handlePropChange('phone', val)
                      }}
                      onBlur={() => {
                        setIsPhoneValid(validatePhone(profile.phone, true));
                        if (validatePhone(profile.phone, true)) {
                          setEditPhone(false)
                        }
                      }}
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
                      className="information-section__select-field"
                      id="favorite-avenger"
                      label="Favorite Avenger"
                      menuItems={renderSelectItems()}
                      onChange={(val) => handlePropChange('favAvenger', val)}
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
        dialogClassName="information-section__dialog"
        id="edit-dialog"
        modal
        onHide={onCancel}
        title="Edit My Profile"
        visible={modalOpen}
        width={600}
      >
        <form>
          <TextField
            id="edit-name"
            label="Name"
            lineDirection="right"
            onChange={(val) => {
              setModalValidations({
                ...modalValidations,
                isNameValid: val.length >= 1
              });
              handleModalPropChange('name', val);
            }}
            value={modalProfile.name}
            error={!modalValidations.isNameValid}
            errorText="Name should not be empty"
          />
          <TextField
            id="edit-phone"
            label="Phone"
            lineDirection="right"
            onChange={(val) => {
              setModalValidations({
                ...modalValidations,
                isModalPhoneValid: validatePhone(val)
              });
              handleModalPropChange('phone', val);
            }}
            onBlur={() => setModalValidations({
              ...modalValidations,
              isModalPhoneValid: validatePhone(modalProfile.phone, true)
            })}
            value={modalProfile.phone}
            error={!modalValidations.isModalPhoneValid}
            errorText="Invalid format"
          />
          <TextField
            id="edit-description"
            label="Description"
            lineDirection="right"
            onChange={(val) => handleModalPropChange('description', val)}
            onBlur={() => setEditDesc(false)}
            rows={2}
            value={modalProfile.description}
          />
          <SelectField
            id="edit-fav-avenger"
            label="Favorite Avenger"
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
