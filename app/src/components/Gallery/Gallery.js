import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchPhotos } from "../../actions/gallery";
import Photo from "./Photo";
import Alert from "../Common/Alert";

export class Gallery extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedPhotoChanged = this.handleSelectedPhotoChanged.bind(
      this
    );

    this.state = {
      selectedPhotoUrl: undefined
    };
  }

  componentDidMount() {
    this.props.fetchPhotos();
  }

  handleSelectedPhotoChanged(photoUrl) {
    this.setState({ selectedPhotoUrl: photoUrl });
  }

  render() {
    const { photoUrls = [], error } = this.props;
    return (
      <React.Fragment>
        {error && <Alert message={error} />}
        <div className="row">
          <div className="col-12 text-center">
            {this.state.selectedPhotoUrl && (
              <Photo
                photoUrl={this.state.selectedPhotoUrl}
                className={`img-fluid`}
                style={{}}
              />
            )}
            {!this.state.selectedPhotoUrl && photoUrls.length > 0 && (
              <Photo
                photoUrl={photoUrls[0]}
                className={`img-fluid`}
                style={{}}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {photoUrls.map((photoUrl, index) => (
              <Photo
                photoUrl={photoUrl}
                key={index}
                className={`img-fluid img-thumbnail m-3 clickable`}
                style={{ height: "125px", width: "125px", cursor: "pointer" }}
                onClick={() => this.handleSelectedPhotoChanged(photoUrl)}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    photoUrls: state.gallery.photoUrls,
    error: state.weather.error,
    message: state.weather.message
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPhotos: () => dispatch(fetchPhotos())
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
