import React from "react";
import NotFound from "./NotFound";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("NotFound Component", () => {
  beforeEach(() => {});

  it("renders without crashing", () => {
    const tree = renderer.create(<NotFound />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders the NotFound component correctly', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('h1').first().text()).toEqual("404 - Page Not Found");
    expect(wrapper.find('p').first().text()).toEqual("I'm sorry, the page you were looking for cannot be found!");
  });
});