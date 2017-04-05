const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`We running on ${app.get('port')}.`)
})


//get all users
app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then((users) => {
      response.status(200).json(users);
    })
    .catch(function(error) {
      console.error('somethings wrong with db')
      console.log(error)
      response.status(404)
    });
})

//get one user by ID
app.get('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  const userFiles = [];

  database('users').where('id', id).select()
  .then((user) => {
    userFiles.push({user})
  })
  .then(()=>{
    database('compositions').where('user_id', id).select()
    .then((compositions) => {
      userFiles.push({compositions})
    })
  })
  .then(()=>{
    database('sounds').where('user_id', id).select()
    .then((sounds) => {
      userFiles.push({sounds})
      if(userFiles[0].user.length<1){
        response.status(404).send({
          error: 'ID did not match any existing users'
        })
      } else {
        response.status(202).json(userFiles)
      }
    })
  })
  .catch((error)=>{
    response.status(404).send({
      error
    })
  })

})

//post a user
app.post('/api/v1/users', (request, response) => {
  const { name, email } = request.body
  const newUser = { name, email, deleted:false }

  if(!name || !email){
    response.status(422).json("[]")
  } else {
    database('users').insert(newUser)
    .then(()=> {
      database('users').select()
        .then((users) => {
          response.status(200).json(users);
        })
        .catch((error) => {
          response.status(422)
          console.error(error)
        });
    })
  }
})

//patch a user
app.patch('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body

  database('users').where('id', id).select().update({ name, email })
    .then(()=> {
      database('users').where('id', id).select()
        .then((user) => {
          if(user.length<1){
            response.status(404).send({
              error: 'ID did not match any existing users'
            })
          } else {
            response.status(200).json(user);
          }
        })
    })
    .catch((error) => {
      response.status(422)
      console.error(error)
    });
})

//delete a user
app.delete('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;

  database('compositions').where('id', id).select()
  .then((composition)=>{
    if(composition.length<1){
      response.status(404).send({
        error: 'ID did not match any existing sounds'
      })
    } else {
      database('sounds').where('user_id',id).update({ user_id: null })
      .then(()=>{
        database('compositions').where('user_id',id).delete()
        .then(()=>{
          database('users').where('id', id).delete()
          .then(()=> {
            database('users').select()
            .then((users) => {
              response.status(200).json(users);
            })
          })
        })
      })
      .catch((error) => {
        console.error(error)
      });
    }
  })
})

//get request that return total number of a users composititons and sounds
app.get('/api/v1/users/:id/creations', (request, response) => {
  const { id } = request.params;
  let totalCompositions;
  let totalSounds;
  let userName;


  database('compositions').where('user_id', id).select()
  .then((compositions) => {
    totalCompositions = compositions.length;
  })
  .then(()=>{
    database('sounds').where('user_id', id).select()
    .then((sounds) => {
      totalSounds = sounds.length
    })
  })
  .then(()=>{
    database('users').where('id', id).select()
    .then((user) => {
      if(user.length<1){
        response.status(404).send({
          error: 'ID did not match any existing users'
        })
      } else {
        userName = user[0].name;
        response.send(`${userName} has created ${totalCompositions} compositions and ${totalSounds} sounds!`)
      }
    })
  })
  .catch((error)=>{
    response.status(404).send({
      error: 'ID did not match any existing users'
    })
  })

})

//get compositions also, narrow down compositions by complexity
app.get('/api/v1/compositions', (request, response) => {
  let complexity = request.query.complexity;

  database('compositions').select()
    .then((compositions) => {
      if(complexity){
        let complex = compositions.filter((obj)=>{
          let attributes = JSON.parse(obj.attributes)
          return attributes.length == complexity;
        })
        if(complex.length<1){
          response.status(404).send({
            error: 'query did not return any matches'
          })
        } else {
          response.status(200).json(complex)
        }
      } else {
        response.status(200).json(compositions);
      }
    })
    .catch(function(error) {
      response.status(404)
      console.error('somethings wrong with db')
      console.log(error)
    });
})

//get one composition by ID
app.get('/api/v1/compositions/:id', (request, response) => {
  const { id } = request.params;

  database('compositions').where('id', id).select()
    .then((composition) => {
      if(composition.length<1){
        response.status(404).send({
          error: 'ID did not match any existing compositions'
        })
      } else {
        response.status(202).json(composition)
      }
    })
    .catch((error)=>{
      response.status(404).send({
        error: 'ID did not match any existing compositions'
      })
    })
})

//post a composition
app.post('/api/v1/compositions', (request, response) => {
  const { attributes, user_id } = request.body
  const newComposition = { attributes, user_id, deleted:false }

  if(!attributes || !user_id){
    response.status(422).json("[]")
  } else {
    database('compositions').insert(newComposition)
    .then(()=> {
      database('compositions').select()
      .then((compositions) => {
        response.status(200).json(compositions);
      })
      .catch((error) => {
        response.status(422)
        console.error(error)
      });
    })
  }
})

//patch a composition
app.patch('/api/v1/compositions/:id', (request, response) => {
  const { id } = request.params;
  const { attributes } = request.body

  database('compositions').where('id', id).update({ attributes })
    .then(()=> {
      database('compositions').where('id', id).select()
        .then((composition) => {
          if(composition.length<1){
            response.status(404).send({
              error: 'ID did not match any existing compositions'
            })
          } else {
            response.status(202).json(composition)
          }
        })
    })
    .catch((error) => {
      response.status(404)
      console.error(error)
    });
})

//delete a composition
app.delete('/api/v1/compositions/:id', (request, response) => {
  const { id } = request.params;

  database('compositions').where('id', id).select()
  .then((composition)=>{
    if(composition.length<1){
      response.status(404).send({
        error: 'ID did not match any existing sounds'
      })
    } else {
      database('compositions').where('id', id).delete()
      .then(()=>{
        database('compositions').select()
        .then((compositions)=> {
          response.status(200).json(compositions)
        })
        .catch((error) => {
          console.error(error)
        });
      })
    }
  })

})

//get sounds
app.get('/api/v1/sounds', (request, response) => {
  database('sounds').select()
    .then((sounds) => {
      response.status(200).json(sounds);
    })
    .catch(function(error) {
      response.status(404)
      console.error('somethings wrong with db')
      console.log(error)
    });
})

//get one sound by ID
app.get('/api/v1/sounds/:id', (request, response) => {
  const { id } = request.params;
  database('sounds').where('id', id).select()
    .then((sound) => {
      if(sound.length<1){
        response.status(404).send({
          error: 'ID did not match any existing sounds'
        })
      } else {
        response.status(202).json(sound)
      }
    })
    .catch((error)=>{
      response.status(404).send({
        error: 'ID did not match any existing sounds'
      })
    })
})

//post a sound
app.post('/api/v1/sounds', (request, response) => {
  const { attributes, user_id } = request.body
  const newSound = { attributes, user_id, deleted:false }

  if(!attributes || !user_id){
    response.status(422).json("[]")
  } else {
    database('sounds').insert(newSound)
    .then(()=> {
      database('sounds').select()
        .then((sounds) => {
          response.status(200).json(sounds);
        })
        .catch((error) => {
          response.status(404)
          console.error(error)
        });
    })
  }
})

//patch a sound
app.patch('/api/v1/sounds/:id', (request, response) => {
  const { id } = request.params;
  const { attributes } = request.body

  database('sounds').where('id', id).update({ attributes })
  .then(()=>{
    database('sounds').where('id', id).select()
    .then((sound) => {
      if(sound.length<1){
        response.status(404).send({
          error: 'ID did not match any existing sounds'
        })
      } else {
        response.status(202).json(sound)
      }
    })
  })
    .catch((error) => {
      response.status(404)
      console.error(error)
    });
})

//delete a sound
app.delete('/api/v1/sounds/:id', (request, response) => {
  const { id } = request.params;

  database('sounds').where('id', id).select()
  .then((sound)=>{
    if(sound.length<1){
      response.status(404).send({
        error: 'ID did not match any existing sounds'
      })
    } else {
      database('sounds').where('id', id).delete()
        .then(()=> {
          database('sounds').select()
          .then((data)=>{
            response.status(200).json(data)
          })
        })
        .catch((error) => {
          console.error(error)
        });
    }
  })
})

//display something at the root
app.get('/', function (request, response) {
  response.send('try out some real endpoints!')
})

module.exports = app;
