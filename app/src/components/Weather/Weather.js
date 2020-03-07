import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchWeather, fetchCities } from "../../actions/weather";

import CityDropdown from "./CityDropdown";
import ConditionIcon from "./ConditionIcon";
import Temperature from "./Temperature";
import TemperatureUnitToggle from "./TemperatureUnitToggle";
import Alert from "../Common/Alert";

export class Weather extends Component {
  constructor(props) {
    super(props);

    this.handleCityChanged = this.handleCityChanged.bind(this);
    this.handleToggleTemperatureUnit = this.handleToggleTemperatureUnit.bind(
      this
    );

    this.state = {
      selectedCity: {
        name: "Toronto",
        code: "CAON0103"
      },
      isCelsius: true
    };
  }

  componentDidMount() {
    this.props.fetchCities();
    this.props.fetchWeather(
      this.state.selectedCity.code,
      this.state.isCelsius ? "C" : "F"
    );
  }

  handleCityChanged(city) {
    this.props.fetchWeather(city.code, this.state.isCelsius ? "C" : "F", () => {
      this.setState({ selectedCity: city });
    });
  }

  handleToggleTemperatureUnit() {
    const isCelsius = !this.state.isCelsius;
    this.props.fetchWeather(
      this.state.selectedCity.code,
      isCelsius ? "C" : "F",
      () => {
        this.setState({ isCelsius: isCelsius });
      }
    );
  }

  render() {
    const { selectedCity, isCelsius } = this.state;
    const { weather, error, cities = [] } = this.props;

    return (
      <React.Fragment>
        {error && <Alert message={error} />}
        <div className="row pt-3 pb-3 mt-3 mb-3">
          <div className="col-6 col-md-4 offset-md-2 col-lg-3 offset-lg-3">
            <div className="input-group">
              <div className="input-group-prepend mr-3">City:</div>
              <CityDropdown
                cities={cities}
                currentCity={selectedCity}
                handleChange={this.handleCityChanged}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="input-group">
              <div className="input-group-prepend mr-3">C/F:</div>
              <TemperatureUnitToggle
                isCelsius={this.state.isCelsius}
                handleToggle={() => this.handleToggleTemperatureUnit()}
              />
            </div>
          </div>
        </div>

        <div className="row pb-3 mb-3">
          <div className="col-6 col-md-4 offset-md-2 col-lg-3 offset-lg-3">{`City name:`}</div>
          <div className="col-6">
            {selectedCity ? selectedCity.name : undefined}
          </div>
        </div>
        <div className="row pb-3 mb-3">
          <div className="col-6 col-md-4 offset-md-2 col-lg-3 offset-lg-3">{`Data last updated time:`}</div>
          <div className="col-6">
            {weather ? weather.updatetime : undefined}
          </div>
        </div>
        <div className="row pb-3 mb-3">
          <div className="col-6 col-md-4 offset-md-2 col-lg-3 offset-lg-3">{`Condition:`}</div>
          <div className="col-6">
            {weather ? weather.wxcondition : ""}{" "}
            <ConditionIcon
              condition={weather ? weather.wxcondition : undefined}
            />
          </div>
        </div>
        <div className="row pb-3 mb-3">
          <div className="col-6 col-md-4 offset-md-2 col-lg-3 offset-lg-3">{`Temperature:`}</div>
          <div className="col-6">
            <Temperature
              temperature={weather ? weather.temperature : undefined}
              isCelsius={isCelsius}
            />
          </div>
        </div>
        <div className="row pb-3 mb-3">
          <div className="col-6 col-md-4 offset-md-2 col-lg-3 offset-lg-3">{`Feels like:`}</div>
          <div className="col-6">
            <Temperature
              temperature={weather ? weather.feels_like : undefined}
              isCelsius={isCelsius}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather.weather,
    error: state.weather.error,
    message: state.weather.message,
    cities: state.weather.cities
  };
};

const mapDispatchToProps = dispatch => ({
  fetchWeather: (placeCode, temperatureUnit, callback) =>
    dispatch(fetchWeather(placeCode, temperatureUnit, callback)),
  fetchCities: () => dispatch(fetchCities())
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
