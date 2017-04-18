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
    return database.migrate.rollback()
    .then(() => {
      return database.migrate.latest()
      .then(() => {
        database('users').insert(userList)
        .then(() => {
          database('sounds').insert({ attributes: 'saucy',
          user_id: 1,
          deleted: false })
          .then(() => {
            database('compositions').insert({ attributes: 'tuney', user_id: 2, deleted: false })
            .then(() => {
              return
            })
          })
        })
      })
    })
  })

    it('should exist', (done) => {
      expect(app).to.exist;
      done()
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

      it('GET returns a single user and their creations', (done)=>{
        chai.request(app)
        .get('/api/v1/users/2')
        .end((err, res)=> {
          if(err) { done(err) }
          expect(res).to.have.status(202)
          expect(res).to.be.json
          expect(res.body).to.be.a('array')
          expect(res.body.length).to.deep.equal(2 || 3)
          expect(res.body[0]).to.be.a('object')
          expect(res.body[0]).to.have.property('user')
          done()
        })
      })

      it('GET returns an error if user does not exist', (done)=>{
        chai.request(app)
        .get('/api/v1/users/51')
        .end((err, res)=> {
          expect(res).to.throw;
          expect(res).to.have.status(404)
          done()
        })
      })

    it('POST doesn\'t allow duplicate users', (done)=>{
      chai.request(app)
      .post('/api/v1/users')
      .send({ username: 'Beans', email: 'beans@sample.com', password: 'password', deleted: false })
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        done()
      })
    })

    it('POST creates a new user and returns that users token', (done)=>{
      chai.request(app)
      .post('/api/v1/users')
      .send({ username: 'Potatoes',
                 email: 'potatoes@sample.com',
              password: 'password',
               deleted: false
            })
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('token');
        done()
      })
    })

    it('POST (login) logs in an existing user and returns their token', (done)=>{
      chai.request(app)
      .post('/api/v1/user/login')
      .send({ email: 'beans@sample.com',
              password: 'password'
            })
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('token');
        done()
      })
    })

    it('POST (login) returns error if creds do not match', (done) => {
      chai.request(app)
      .post('/api/v1/user/login')
      .send({ email: 'tomatoes@sample.com',
              password: 'younameit!'
            })
      .end((err, res)=> {
        expect(err).to.have.status(404);
        done()
      })
    })

    it('PATCH returns an updated user', (done) => {
      chai.request(app)
      .patch('/api/v1/users/2')
      .send({
        username: 'bimbleton',
        email : 'email@gmail.com'
      })
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(1);
        expect(res.body[0]).to.have.property('username');
        expect(res.body[0].username).to.equal('bimbleton');
        expect(res.body[0]).to.have.property('email');
        expect(res.body[0].email).to.equal('email@gmail.com');
        done()
      })
    })

    it('PATCH returns an error if user does not exist', (done)=>{
      chai.request(app)
      .patch('/api/v1/users/41')
      .send({
        username: 'Joe Guy',
        email : 'email@gmail.com'
      })
      .end((err, res)=>{
        expect(res).to.throw;
        expect(res).to.have.status(404)
        done()
      })
    })

    it('DELETE removes a user', (done)=>{

      chai.request(app)
      .delete('/api/v1/users/1')
      .end((err,res)=>{
        if(err){done(err)}
        expect(res.text).to.equal('All records have been deleted')
        expect(res).to.have.status(200)
        done()
      })
    })

    it('DELETE returns an error if a user does not exist', (done)=>{
      chai.request(app)
      .delete('/api/v1/users/51')
      .end((err, res)=>{
        expect(res).to.have.status(404)
        done()
      })
    })

    it('GET returns a summary of a user\'s creations', (done)=>{
      chai.request(app)
      .get('/api/v1/users/1/creations')
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        done()
      })
    })

    it('GET returns an error if user does not exist', (done)=>{
      chai.request(app)
      .get('/api/v1/users/31/creations')
      .end((err, res)=> {
        expect(res).to.throw;
        expect(res).to.have.status(404)
        done()
      })
    })

    it('GET does not return compositions if bad token provided', (done) => {

      chai.request(app)
      .get('/api/v1/userCompositions/2?token=aofijsf.slkfj.ksjf')
      .end((err, res) => {
        expect(err).to.have.status(403)
        done()
      })
    })

    it('POST creates a new sound', (done)=>{
      chai.request(app)
      .post('/api/v1/sounds')
      .send({
        attributes: 'groovey AF',
        user_id : 2,
        deleted: false
      })
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        // expect(res.body).to.have.length(2);
        // expect(res.body[1].id).to.equal(2)
        // expect(res.body[1]).to.have.property('attributes');
        done()
      })
    })

    it('POST creates a new composition', (done)=>{
      chai.request(app)
      .post('/api/v1/compositions')
      .send({
        attributes: 'groovey AF',
        user_id : 2,
      })
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        // expect(res.body).to.have.length(2);
        done()
      })
    })

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

    // it('GET returns a single composition', (done)=>{
    //   chai.request(app)
    //   .get('/api/v1/compositions/1')
    //   .end((err, res)=> {
    //     if(err) { done(err); }
    //     expect(res).to.have.status(202);
    //     expect(res).to.be.json;
    //     expect(res.body).to.be.a('array');
    //     expect(res.body).to.have.length(1);
    //     expect(res.body[0]).to.be.a('object');
    //     expect(res.body[0]).to.have.property('user_id')
    //     expect(res.body[0]).to.have.property('attributes')
    //     expect(res.body[0]).to.have.property('id')
    //     done()
    //   })
    // })


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
})
