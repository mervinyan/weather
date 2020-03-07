process.env.NODE_ENV = "test";

const fs = require("fs");
const config = require("config");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();

chai.use(chaiHttp);

describe("Photo", () => {
  beforeEach(done => {
    if (fs.existsSync(config.photo_location)) {
      fs.readdirSync(config.photo_location, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(config.photo_location, file), err => {
            if (err) throw err;
          });
        }
      });
    }
    done();
  });

  describe("/GET photo", () => {
    it("it should GET all photos", done => {
      chai
        .request(server)
        .get("/api/photo")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("photoUrls");
          res.body.should.have.property("photoUrls").which.is.a("array");
          res.body.should.have.property("photoUrls").with.lengthOf(0);
          done();
        });
    });

    it("it should GET 404 error", done => {
      chai
        .request(server)
        .get("/api/photo?photoUrl=abc.jpeg")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
  });
});
