import React from "react";
import Temperature from "./Temperature";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Temperature Component", () => {
  let props;

  beforeEach(() => {
    props = {
      temperature: undefined,
      isCelsius: undefined,
    };
  });

  it("renders without crashing", () => {
    const tree = renderer.create(<Temperature  {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders the Temperature component in Celsius correctly', () => {
    props.temperature = 12;
    props.isCelsius = true;
    const wrapper = shallow(<Temperature  {...props} />);
    expect(wrapper.text()).toEqual("12 C");
  });

  it('renders the Temperature component in fahrenheit. correctly', () => {
    props.temperature = 60;
    props.isCelsius = false;
    const wrapper = shallow(<Temperature  {...props} />);
    expect(wrapper.text()).toEqual("60 F");
  });
});