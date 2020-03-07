import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import moment from "moment";

describe("Header Component", () => {
  beforeEach(() => {});

  it('renders the Header component correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(NavLink)).toHaveLength(3);
    expect(wrapper.find(NavLink).first().props().to).toEqual("/");
    expect(wrapper.find(NavLink).at(1).props().to).toEqual("/weather");
    expect(wrapper.find(NavLink).at(2).props().to).toEqual("/gallery");
  });
});