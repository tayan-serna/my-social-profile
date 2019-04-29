// @vendors
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
// import PropTypes from 'prop-types';
import { Button, DialogContainer } from 'react-md';

import { getCroppedImg } from '../utils/image-utils';
import { IMAGE_ALLOW_TYPES } from '../constants';

import defaultPerson from '../assets/default-person.jpg';

import 'react-image-crop/lib/ReactCrop.scss';
import './style.scss';

const initialState = {
  crop: {
    aspect: 1,
    height: 10,
    width: 10,
    x: 0,
    y: 0
  },
  imageError: false,
  imageErrorMessage: '',
  imageFile: null,
  isDragging: false,
  src: null,
  visible: false
};

class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      imageSrc: props.imageSrc ? `${props.imageSrc}?${Date.now()}` : ''
    };
  }

  onConfirm = () => {
    const { crop, imageFile } = this.state;
    const Picture = getCroppedImg(imageFile, crop);
    this.setState({
        visible: false,
        imageSrc: Picture
    });
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  }

  onCropComplete = (crop) => {
    this.setState({ crop });
  }

  onImageLoaded = (imageFile) => {
    this.setState({ imageFile });
  }

  onDrop = (files) => {
    if (!files.length) return;

    this.setState({
      src: URL.createObjectURL(files[0]),
      visible: true,
      isDragging: false
    });
  }

  onDropRejected = (files) => {
    const isAllowed = IMAGE_ALLOW_TYPES.some(type => files[0].type.toLowerCase() === type);
    const imageErrorMessage = isAllowed ? 'File is larger than 1Mb' : 'Invalid format';

    this.setState({
      imageError: true,
      imageErrorMessage,
      isDragging: false
    }, () => {
      setTimeout(() => {
          this.setState({
            imageError: false,
            imageErrorMessage: ''
          });
      }, 5000);
    });
  }

  handleDrag = (isDragging) => {
    this.setState({ isDragging });
  }

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      crop,
      imageSrc,
      imageError,
      imageErrorMessage,
      isDragging,
      src,
      visible
    } = this.state;

    const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide });
    actions.push(<Button flat primary onClick={this.onConfirm}>Confirm</Button>);

    const renderImageError = imageError && (
      <div>
        <p className="image-container__error">
          {imageErrorMessage}
        </p>
      </div>
    );

    const dropZoneClassName = `
      image-container__dropzone-photo
      ${isDragging ? 'image-container__dropzone-photo--dragging' : ''}
    `

    const renderDropZone = (
      <Dropzone
        accept={IMAGE_ALLOW_TYPES}
        maxSize={1000000}
        multiple={false}
        onDrop={this.onDrop}
        onDragEnter={() => this.handleDrag(true)}
        onDragLeave={() => this.handleDrag(false)}
        onDropRejected={this.onDropRejected}
      >
        {({getRootProps, getInputProps}) => {
          return (
              <section
                className={dropZoneClassName}
                 {...getRootProps()}
              >
                <input {...getInputProps()} />
                {
                  imageSrc
                    ? <img alt="profile" src={imageSrc} />
                    : <img alt="dafault" src={defaultPerson} />
                }
              </section>
          )
        }}
      </Dropzone>
    );

    const renderDialog = (
      <DialogContainer
        actions={actions}
        closeOnEsc={false}
        dialogClassName="image-container__dialog"
        id="crop-image-dialog"
        modal
        onHide={this.hide}
        title="Crop Image"
        visible={visible}
        width={600}
      >
        <div className="image-container__dialog-content">
          {src && (
            <ReactCrop
              crop={crop}
              keepSelection
              onChange={this.onCropChange}
              onComplete={this.onCropComplete}
              onImageLoaded={this.onImageLoaded}
              src={src}
              imageStyle={{
                  maxHeight: 433
              }}
            />
          )}
        </div>
      </DialogContainer>
    );

    return (
      <section className="image-container">
        { renderDropZone }
        { renderImageError }
        { renderDialog }
      </section>
    );
  }
}

export default Picture;
