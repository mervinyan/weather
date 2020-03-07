import React from "react";
import Alert from "./Alert";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Alert Component", () => {
  let props;

  beforeEach(() => {
    props = {
      message: "Somthing bad occurred!"
    };
  });

  it("renders without crashing", () => {
    const tree = renderer.create(<Alert {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders alert correctly", () => {
    const wrapper = shallow(<Alert {...props} />);
    expect(wrapper.text()).toEqual("Error! Somthing bad occurred!");
  });
});