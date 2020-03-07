import React from "react";
import CityDropdown from "./CityDropdown";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("CityDropdown Component", () => {
  let props;

  beforeEach(() => {
    props = {
      cities: [
        {
          name: "Toronto",
          code: "CAON0103"
        },
        {
          name: "Montreal",
          code: "CAON0423"
        }
      ],
      currentCity: {
        name: "Toronto",
        code: "CAON0103"
      },
      handleChange: () => {}
    };
  });

  it("renders without crashing", () => {
    const tree = renderer.create(<CityDropdown {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders the CityDropdown component correctly", () => {  
    const wrapper = shallow(<CityDropdown {...props} />);
    expect(wrapper.find(".dropdown-item")).toHaveLength(2);
  });

  it("renders the dropdownMenuButton text correctly when 2nd city is selected", () => {  
    props.currentCity = {
      name: "Montreal",
      code: "CAON0423"
    };
    const wrapper = shallow(<CityDropdown {...props} />);

    expect(wrapper.find("#dropdownMenuButton")).toHaveLength(1);
    expect(wrapper.find("#dropdownMenuButton").at(0).text()).toEqual("Montreal");
  });

});
