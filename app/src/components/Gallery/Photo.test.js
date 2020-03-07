import React from "react";
import Photo, {webpFileUrl, jpegFileUrl} from "./Photo";

import { shallow } from "enzyme";
import renderer from "react-test-renderer";

describe("Photo Component", () => {
  let props;

  beforeEach(() => {
    props = {
      photoUrl: undefined,
      className: undefined,
      style: undefined,
      onClick: undefined
    };
  });

  it("renders without crashing", () => {
    const tree = renderer.create(<Photo {...props} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders the Photo component correctly', () => {
    props.photoUrl="photo_001.jpeg";
    props.className="img-fluid";
    const wrapper = shallow(<Photo {...props} />);
    
    expect(wrapper.find('source')).toHaveLength(2);
    expect(wrapper.find('source').at(0).props().srcSet).toEqual("http://localhost:3000/api/photo?photoUrl=photo_001.webp");
    expect(wrapper.find('source').at(1).props().srcSet).toEqual("http://localhost:3000/api/photo?photoUrl=photo_001.jpeg");
    expect(wrapper.find('img').at(0).props().className).toEqual("img-fluid");
  });

  it("calculates webp file url correctly", () => {
    expect(webpFileUrl("photo_001.jpeg")).toEqual("http://localhost:3000/api/photo?photoUrl=photo_001.webp");
  });

  it("calculates jpeg file url correctly", () => {
    expect(jpegFileUrl("photo_001.jpeg")).toEqual("http://localhost:3000/api/photo?photoUrl=photo_001.jpeg");
  });
});
