import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./Main";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import moment from "moment";

describe("Main Component", () => {
  beforeEach(() => {});

  it('renders the Main component correctly', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(Route)).toHaveLength(3);
    expect(wrapper.find(Route).first().props().path).toEqual("/weather");
    expect(wrapper.find(Route).at(1).props().path).toEqual("/gallery");
    expect(wrapper.find(Route).at(2).props().path).toEqual("/*");
  });
});