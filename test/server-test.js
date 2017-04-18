process.env.NODE_ENV = 'test'

const chai = require('chai');
const expect = chai.expect;
const app = require('../server.js');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const environment = 'test';
const configuration = require('../knexfile.js')[environment];
const database = require('knex')(configuration);

describe('Server', () => {

  const userList = [{ username: 'Beans', email: 'beans@sample.com', password: 'password', deleted: false }, { username: 'Greens', email: 'greens@sample.com', password: 'password', deleted: false }]

  beforeEach(function() {
    // this.timeout(15000)
    return database.migrate.rollback()
    .then(() => {
      return database.migrate.latest()
      .then(() => {
        database('users').insert(userList)
        .then(() => {
          return
        })
      })
    })
  })

  // afterEach((done) => {
  //   database.migrate.rollback()
  //   .then(() => {
  //     done()
  //   })
  // })


  describe('server', () => {
    it('should exist', (done) => {
      expect(app).to.exist;
      done()
    })
  })

  describe('GET /api/v1/users', () => {
    it('GET should get all users', (done) => {
      chai.request(app)
      .get('/api/v1/users')
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(2);
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0]).to.have.property('password');
        expect(res.body[0]).to.have.property('deleted');
        done()
      })
    })
})

// describe('/api/v1/users', ()=>{
//     it('GET returns all users', (done)=>{
//       chai.request(app)
//       .get('/api/v1/users')
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(30);
//         expect(res.body[0]).to.have.property('id');
//         expect(res.body[0]).to.have.property('name');
//         expect(res.body[0]).to.have.property('email');
//         expect(res.body[0]).to.have.property('email');
//         expect(res.body[0]).to.have.property('deleted');
//         done()
//       })
//     })
//
//     it('POST creates a new user', (done)=>{
//       chai.request(app)
//       .post('/api/v1/users')
//       .send({
//         name: 'Joe Guy',
//         email : 'email@gmail.com'
//       })
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(31);
//         expect(res.body[30]).to.have.property('id');
//         expect(res.body[30].id).to.equal(31)
//         expect(res.body[30]).to.have.property('name');
//         expect(res.body[30].name).to.equal('Joe Guy');
//         expect(res.body[30]).to.have.property('email');
//         expect(res.body[30].email).to.equal('email@gmail.com');
//         expect(res.body[30]).to.have.property('deleted');
//         done()
//       })
//     })
//
//     it('POST returns an error if not all attributes are present', (done)=>{
//       chai.request(app)
//       .post('/api/v1/users')
//       .send({
//         name: 'Joe Guy',
//         email : null
//       })
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(422)
//         done()
//       })
//     })
//
//   })
//
//   describe('/api/v1/users/:id', ()=>{
//     it('GET returns a single user and their creations', (done)=>{
//       chai.request(app)
//       .get('/api/v1/users/12')
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(202);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(2);
//         expect(res.body[0]).to.be.a('object');
//         expect(res.body[0]).to.have.property('user');
//         expect(res.body[1]).to.have.property('sounds');
//         done()
//       })
//     })
//
//     it('GET returns an error if user does not exist', (done)=>{
//       chai.request(app)
//       .get('/api/v1/users/51')
//       .end((err, res)=> {
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//     it('PATCH returns an updated user', (done)=>{
//       chai.request(app)
//       .patch('/api/v1/users/12')
//       .send({
//         name: 'Joe Guy',
//         email : 'email@gmail.com'
//       })
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(1);
//         expect(res.body[0]).to.have.property('name');
//         expect(res.body[0].name).to.equal('Joe Guy');
//         expect(res.body[0]).to.have.property('email');
//         expect(res.body[0].email).to.equal('email@gmail.com');
//         done()
//       })
//     })
//
//     it('PATCH returns an error if user does not exist', (done)=>{
//       chai.request(app)
//       .patch('/api/v1/users/41')
//       .send({
//         name: 'Joe Guy',
//         email : 'email@gmail.com'
//       })
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//     it('DELETE removes a user', (done)=>{
//       chai.request(app)
//       .delete('/api/v1/users/1')
//       .end((err,res)=>{
//         if(err){done(err)}
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.length(29)
//         done()
//       })
//     })
//
//     it('DELETE returns an error if a user does not exist', (done)=>{
//       chai.request(app)
//       .delete('/api/v1/users/51')
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//   })
//
//   describe('/api/v1/users/:id/creations', () => {
//     it('returns a summary of a user\'s creations', (done)=>{
//       chai.request(app)
//       .get('/api/v1/users/1/creations')
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(200);
//         expect(res.res.text).to.equal("Charles Stone has created 2 compositions and undefined sounds!")
//         done()
//       })
//     })
//
//     it('returns an error if user does not exist', (done)=>{
//       chai.request(app)
//       .get('/api/v1/users/31/creations')
//       .end((err, res)=> {
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//   })
//
//   describe('/api/v1/compositions', ()=>{
//     it('GET returns all compositions', (done)=>{
//       chai.request(app)
//       .get('/api/v1/compositions')
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(50);
//         expect(res.body[0]).to.have.property('id');
//         expect(res.body[0]).to.have.property('attributes');
//         expect(res.body[0]).to.have.property('user_id');
//         done()
//       })
//     })
//
//     it('POST creates a new composition', (done)=>{
//       chai.request(app)
//       .post('/api/v1/compositions')
//       .send({
//         attributes: '[{},{},{}]',
//         user_id : 4
//       })
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(51);
//         expect(res.body[50]).to.have.property('id');
//         expect(res.body[50].id).to.equal(51)
//         expect(res.body[50]).to.have.property('attributes');
//         expect(res.body[50].attributes).to.equal('[{},{},{}]');
//         expect(res.body[50]).to.have.property('user_id');
//         expect(res.body[50].user_id).to.equal(4);
//         expect(res.body[50]).to.have.property('deleted');
//         done()
//       })
//     })
//
//     it('POST returns an error if not all attributes are present', (done)=>{
//       chai.request(app)
//       .post('/api/v1/compositions')
//       .send({
//         name: 'Joe Guy',
//         email : 'james@franco.com'
//       })
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(422)
//         done()
//       })
//     })
//
//     it('Returns only compositions with attributes specified in query', (done)=>{
//       chai.request(app)
//       .get('/api/v1/compositions?complexity=2')
//       .end((err,res)=>{
//         if(err){done(err)}
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.length(11)
//         done()
//       })
//     })
//
//     it('Returns an error if query parameter returns no matches', (done)=>{
//       chai.request(app)
//       .get('/api/v1/compositions?complexity=11')
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//   })
//
//   describe('/api/v1/compositions/:id', ()=>{
//     it('GET returns a single composition', (done)=>{
//       chai.request(app)
//       .get('/api/v1/compositions/12')
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(202);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(1);
//         expect(res.body[0]).to.be.a('object');
//         expect(res.body[0]).to.have.property('user_id')
//         expect(res.body[0]).to.have.property('attributes')
//         expect(res.body[0]).to.have.property('id')
//         done()
//       })
//     })
//
//     it('GET returns an error if composition does not exist', (done)=>{
//       chai.request(app)
//       .get('/api/v1/compositions/51')
//       .end((err, res)=> {
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//     it('PATCH returns an updated composition', (done)=>{
//       chai.request(app)
//       .patch('/api/v1/compositions/12')
//       .send({
//         attributes: '[{},{},{},{,},{}]'
//       })
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(202);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(1);
//         expect(res.body[0]).to.have.property('attributes');
//         expect(res.body[0].attributes).to.equal('[{},{},{},{,},{}]');
//         done()
//       })
//     })
//
//     it('PATCH returns an error if composition does not exist', (done)=>{
//       chai.request(app)
//       .patch('/api/v1/compositions/51')
//       .send({
//         attributes: '[{},{},{},{,},{}]'
//       })
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//     it('DELETE removes a composition', (done)=>{
//       chai.request(app)
//       .delete('/api/v1/compositions/1')
//       .end((err,res)=>{
//         if(err){done(err)}
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.length(49)
//         done()
//       })
//     })
//
//     it('DELETE returns an error if composition does not exist', (done)=>{
//       chai.request(app)
//       .delete('/api/v1/compositions/55')
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//   })
//
//   describe('/api/v1/sounds', ()=>{
//     it('GET returns all sounds', (done)=>{
//       chai.request(app)
//       .get('/api/v1/sounds')
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(100);
//         expect(res.body[0]).to.have.property('id');
//         expect(res.body[0]).to.have.property('attributes');
//         expect(res.body[0]).to.have.property('user_id');
//         done()
//       })
//     })
//
//     it('POST creates a new sound', (done)=>{
//       chai.request(app)
//       .post('/api/v1/sounds')
//       .send({
//         attributes: '[{},{},{}]',
//         user_id : 4
//       })
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(101);
//         expect(res.body[100]).to.have.property('id');
//         expect(res.body[100].id).to.equal(101)
//         expect(res.body[100]).to.have.property('attributes');
//         expect(res.body[100].attributes).to.equal('[{},{},{}]');
//         expect(res.body[100]).to.have.property('user_id');
//         expect(res.body[100].user_id).to.equal(4);
//         expect(res.body[100]).to.have.property('deleted');
//         done()
//       })
//     })
//
//     it('POST returns an error if not all attributes are present', (done)=>{
//       chai.request(app)
//       .post('/api/v1/sounds')
//       .send({
//         name: 'Joe Guy',
//         email : 'james@franco.com'
//       })
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(422)
//         done()
//       })
//     })
//
//   })
//
//   describe('/api/v1/sounds/:id', ()=>{
//     it('GET returns a single sound', (done)=>{
//       chai.request(app)
//       .get('/api/v1/sounds/12')
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(202);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(1);
//         expect(res.body[0]).to.be.a('object');
//         expect(res.body[0]).to.have.property('user_id')
//         expect(res.body[0]).to.have.property('attributes')
//         expect(res.body[0]).to.have.property('id')
//         done()
//       })
//     })
//
//     it('GET returns an error if sounds does not exist', (done)=>{
//       chai.request(app)
//       .get('/api/v1/sounds/101')
//       .end((err, res)=> {
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//     it('PATCH returns an updated sounds', (done)=>{
//       chai.request(app)
//       .patch('/api/v1/sounds/12')
//       .send({
//         attributes: '[{},{},{},{,},{}]'
//       })
//       .end((err, res)=> {
//         if(err) { done(err); }
//         expect(res).to.have.status(202);
//         expect(res).to.be.json;
//         expect(res.body).to.be.a('array');
//         expect(res.body).to.have.length(1);
//         expect(res.body[0]).to.have.property('attributes');
//         expect(res.body[0].attributes).to.equal('[{},{},{},{,},{}]');
//         done()
//       })
//     })
//
//     it('PATCH returns an error if sound does not exist', (done)=>{
//       chai.request(app)
//       .patch('/api/v1/sounds/101')
//       .send({
//         attributes: '[{},{},{},{,},{}]'
//       })
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//     it('DELETE removes a sound', (done)=>{
//       chai.request(app)
//       .delete('/api/v1/sounds/1')
//       .end((err,res)=>{
//         if(err){done(err)}
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.length(99)
//         done()
//       })
//     })
//
//     it('DELETE returns an error if sound does not exist', (done)=>{
//       chai.request(app)
//       .delete('/api/v1/sounds/121')
//       .end((err, res)=>{
//         expect(res).to.throw;
//         expect(res).to.have.status(404)
//         done()
//       })
//     })
//
//   })

})
