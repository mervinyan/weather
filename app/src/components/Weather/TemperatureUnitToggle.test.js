import React from "react";
import TemperatureUnitToggle from "./TemperatureUnitToggle";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("TemperatureUnitToggle Component", () => {
  let props;

  beforeEach(() => {
    props = {
      isCelsius: true,
      handleToggle: () => {
        console.log(isCelsius ? "C" : "F");
      }
    };
  });

  it("renders without crashing", () => {
    const tree = renderer.create(<TemperatureUnitToggle {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
