import React from "react";
import ConditionIcon from "./ConditionIcon";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("ConditionIcon Component", () => {
  let props;

  beforeEach(() => {
    props = {
      condition: undefined
    };
  });

  it("renders without crashing", () => {
    const tree = renderer.create(<ConditionIcon {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders the known condition correctly", () => {
    props.condition = "snow";
    const wrapper = shallow(<ConditionIcon {...props} />);
    expect(wrapper.exists(".wi-snow")).toBeTruthy();
  });

  it("renders the unknown condition correctly", () => {
    props.condition = "fair";
    const wrapper = shallow(<ConditionIcon {...props} />);
    expect(wrapper.html()).toEqual("");
  });
});
