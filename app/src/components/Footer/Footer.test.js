import React from "react";
import Footer from "./Footer";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import moment from "moment";

describe("Footer Component", () => {
  beforeEach(() => {});

  it("renders without crashing", () => {
    const tree = renderer.create(<Footer />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders the Footer component correctly', () => {
    const wrapper = shallow(<Footer />);
    const expected = `@ ${moment().format("YYYY")} Weather Network, All Rights Reserved.`;
    expect(wrapper.text()).toEqual(expected);
  });
});
