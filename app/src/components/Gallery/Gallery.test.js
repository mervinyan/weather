import React from "react";
import {Gallery} from "./Gallery";
import Photo from "./Photo";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Gallery Component", () => {
  let props;

  beforeEach(() => {
    props = {
      photoUrls: ["photo_001.jpeg", "photo_002.jpeg"],
      error: undefined,
      message: undefined,
      fetchPhotos: () => {return ["photo_001.jpeg", "photo_002.jpeg"]}
    };
  });

  it("renders without crashing", () => {
    const tree = renderer.create(<Gallery {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders an error message when a network error occurs', () => {
    props.error = "Something bad occurred";
    const tree = renderer.create(<Gallery {...props} />)

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders the Gallery component correctly', () => {
    const wrapper = shallow(<Gallery {...props} />);  
    expect(wrapper.find(Photo)).toHaveLength(3);
    expect(wrapper.find(Photo).at(0).props().photoUrl).toEqual("photo_001.jpeg");
    expect(wrapper.find(Photo).at(1).props().photoUrl).toEqual("photo_001.jpeg");
    expect(wrapper.find(Photo).at(2).props().photoUrl).toEqual("photo_002.jpeg");
  });

  it('changes the large photo view when a diffrent thumbnail is clicked', () => {
    props.handleSelectedPhotoChanged = jest.fn();
    const wrapper = shallow(<Gallery {...props} />);
    wrapper.find(Photo).at(2).simulate('click');
    expect(wrapper.find(Photo).at(0).props().photoUrl).toEqual("photo_002.jpeg");
  });

});
