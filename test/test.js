var supertest = require("supertest"),
    should = require('should');

var server = supertest.agent("http://localhost:8080");

describe("User Test API",function(){
  it("should return home page",function(done){
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      // res.body.error.should.equal(false);
      done();
    });
  });

  it("should return a 404 when a page is not found", function(done){
    server
    .get('/anything')
    .expect(404)
    .end(function(err, res){
      res.status.should.equal(404);
      done();
    });
  });

  it("should return a list of users", function(done){
    server
    .get('/api/v1/users')
    .expect(200)
    .end(function(err, res){
      res.status.should.equal(200);
      done();
    });
  });
});

//signup test
describe('Signup Endpoint', function(){
  it('should return a 403 forbidden when a user doesnt have any token', function(done){
    server
    .get('/api/v1/signup')
    .expect(403)
    .end(function(err, res){
      res.status.should.equal(403);
      done();
    });
  });

  it('should signup a user', function(done){
    server
    .post('/api/v1/signup')
    .send({
      name: "Jane Phoenix",
      birthday: "04/07/1996",
      age: 19,
      gender: "male",
      profImage: "image.jpg"
    })
    .expect('Content-type', /json/)
    .expect(200)
    .end(function(err, res){
      res.status.should.equal(200);
      done();
    });
  });
});
