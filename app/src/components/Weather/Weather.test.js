import React from "react";

import { Weather } from "./Weather";
import CityDropdown from "./CityDropdown";
import ConditionIcon from "./ConditionIcon";
import Temperature from "./Temperature";
import TemperatureUnitToggle from "./TemperatureUnitToggle";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Weather Component", () => {
  let props;

  beforeEach(() => {
    props = {
      weather: {},
      error: undefined,
      message: undefined,
      fetchCities: () => {
        return {
          cities: [
            {
              name: "Toronto",
              code: "CAON0103"
            },
            {
              name: "Montreal",
              code: "CAON0423"
            }
          ]
        };
      },
      fetchWeather: () => {
        return {
          lbl_updatetime: "Updated on",
          updatetime: "Thu Mar 5 8:15 PM",
          updatetime_stamp_gmt: "1583457300000",
          wxcondition: "Mostly Cloudy",
          temperature: 32,
          feels_like: 27,
          temperature_unit: "F",
          placecode: "CAON0103"
        };
      }
    };
  });

  it("renders without crashing", () => {
    const tree = renderer.create(<Weather {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders an error message when a network error occurs", () => {
    props.error = "Something bad occurred";
    const tree = renderer.create(<Weather {...props} />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders the Weather component correctly", () => {
    props.weather = {
      lbl_updatetime: "Updated on",
      updatetime: "Thu Mar 5 8:15 PM",
      updatetime_stamp_gmt: "1583457300000",
      wxcondition: "Mostly Cloudy",
      temperature: 32,
      feels_like: 27,
      temperature_unit: "F",
      placecode: "CAON0103"
    };

    const wrapper = shallow(<Weather {...props} />);
    wrapper.setState({
      isCelsius: false,
      selectedCity: {
        name: "Toronto",
        code: "CAON0103"
      }
    });

    expect(wrapper.find(CityDropdown)).toHaveLength(1);

    expect(wrapper.find(Temperature)).toHaveLength(2);
    expect(
      wrapper
        .find(Temperature)
        .at(0)
        .props().temperature
    ).toEqual(32);
    expect(
      wrapper
        .find(Temperature)
        .at(0)
        .props().isCelsius
    ).toEqual(false);
    expect(
      wrapper
        .find(Temperature)
        .at(1)
        .props().temperature
    ).toEqual(27);

    expect(wrapper.find(ConditionIcon)).toHaveLength(1);
    expect(
      wrapper
        .find(ConditionIcon)
        .at(0)
        .props().condition
    ).toEqual("Mostly Cloudy");
    expect(wrapper.find(TemperatureUnitToggle)).toHaveLength(1);
  });

  it("changes the weather info when city is changed", () => {
    props.weather = {
      lbl_updatetime: "Updated on",
      updatetime: "Fri Mar 6 3:15 PM",
      updatetime_stamp_gmt: "1583525700000",
      wxcondition: "Overcast",
      temperature: -1,
      feels_like: -6,
      temperature_unit: "C",
      placecode: "CAON0423"
    };
    const wrapper = shallow(<Weather {...props} />);
    wrapper.setState({
      isCelsius: true,
      selectedCity: {
        name: "Montreal",
        code: "CAON0423"
      }
    });

    expect(wrapper.find(CityDropdown)).toHaveLength(1);

    expect(wrapper.find(Temperature)).toHaveLength(2);
    expect(
      wrapper
        .find(Temperature)
        .at(0)
        .props().temperature
    ).toEqual(-1);
    expect(
      wrapper
        .find(Temperature)
        .at(0)
        .props().isCelsius
    ).toEqual(true);
    expect(
      wrapper
        .find(Temperature)
        .at(1)
        .props().temperature
    ).toEqual(-6);
 
    expect(wrapper.find(TemperatureUnitToggle)).toHaveLength(1);
  });

});
