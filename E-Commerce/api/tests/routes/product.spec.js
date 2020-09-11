/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Beer, Style, conn } = require('../../src/db.js');

//traigo estas liñas del CP-M4
/* import fsMisc from 'fs-misc';
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
import supertest from 'supertest';
import sinon from 'sinon'; */


const agent = session(app);
const beer = {
    name: 'duff',
    price: 1.0,
    stock: 10,
    description: 'cerveza de lo simson',
    image: 'imagen piola',
    IBU: 0.5,
    ABV: 25
  };

describe('PRODUCT routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Beer.sync({ force: true })
    .then(() => Beer.create(beer)));
  describe('GET /beers', () => {
    it('should get 200', () => 
      agent.get('/beers/').expect(200)
    );
  });
});

// ACA ESTAN LOS TESTS DEL CP-M4, VAMOS A IR ADAPTANDOLOS

/* describe('▒▒▒ Backend tests ▒▒▒', () => {

  beforeEach('Sincroniza y limpia tu base de datos', () => db.sync({force: true}));

  after('Sincroniza y limpia tu base de datos', () => db.sync({force: true}));

  describe('Modelos Sequlize', function () {

      describe('Modelo Cerveza', () => {

          // *Traducción del Assertion*:
          // Este assertion espera que el modelo User va a
          // poner una columna `email` en la tabla users.
          it('tiene la definición de schema esperado', () => {
              console.log(Beer);
              expect(Beer.tableAttributes.name).to.be.an('object');
          });
 */
          /* describe('validaciones', () => {

              // *Traducción del Assertion*:
              // La columand `email` debería ser un campo requerido.
              it('requiere email', () => {
                  const user = User.build();
                  return user.validate()
                      .then(() => { throw new Error('Promise should have rejected');})
                      .catch(err => {
                          expect(err).to.exist;
                          expect(err).to.be.an('error');
                          expect(err.errors).to.contain.a.thing.with.properties({
                              path: 'email',
                              type: 'notNull Violation'
                          });
                      });
              });

          }); */

      /* }); */
/* 
      describe('Modelo Message', () => {

          describe('definición', () => {

              // *Traducción del Assertion*:
              // Este assertion espera que el modelo Message ponga una
              // columna `subject` en la tabla messages.
              it('tiene la definición de subject esperada', () => {
                  expect(Message.tableAttributes.subject).to.be.an('object');
              });

              // *Traducción del Assertion*:
              // Este assertion espera que el modelo Message vaya a
              // poner la columna `body` en la tabla messages
              it('has expected body definition', () => {
                  expect(Message.tableAttributes.body).to.be.an('object');
              });

          });

          describe('validaciones', () => {

              it('tiene un valor por defecto "No Subject"', () => {
                  // .build crea una instancia de un modelo
                  // sin salvar la data representada a la base de datos.
                  const message = Message.build();
                  expect(message.subject).to.be.equal('No Subject');
              });

              it('requiere un body', () => {
                  const message = Message.build();
                  return message.validate()
                      .then(() => { throw new Error('Promise should have rejected');})
                      .catch(err => {
                          expect(err).to.exist;
                          expect(err).to.be.an('error');
                          expect(err.errors).to.contain.a.thing.with.properties({
                              path: 'body',
                              type: 'notNull Violation'
                          });
                      });
              });

          });

          describe('funcionalidad', () => {

              let annaId;
              let elsaId;
              beforeEach('Seed users', () => {
                  const users = [
                      {email: 'anna@gmail.com'},
                      {email: 'elsa@gmail.com'}
                  ];
                  return User.bulkCreate(users, {returning: true})
                      .then(createdUsers => {
                          annaId = createdUsers[0].id;
                          elsaId = createdUsers[1].id;
                      });
              });

              let annaFirstMessage;
              let elsaFirstMessage;
              let annaSecondMessage;
              beforeEach('Seed messages', () => {

                  const messages = [
                      {
                          toId: elsaId,
                          fromId: annaId,
                          subject: 'Hey Elsa!',
                          body: 'Do you wanna build a snowman?'
                      },
                      {
                          toId: annaId,
                          fromId: elsaId,
                          subject: 'Re: Hey Elsa!',
                          body: 'Go away, Anna.'
                      },
                      {
                          toId: elsaId,
                          fromId: annaId,
                          subject: 'Re: Re: Hey Elsa!',
                          body: 'Okay, bye…'
                      }
                  ];

                  return Message.bulkCreate(messages, {returning: true})
                      .then(createdMessages => {
                          annaFirstMessage = createdMessages[0].id;
                          elsaFirstMessage = createdMessages[1].id;
                          annaSecondMessage = createdMessages[2].id;
                      });

              });

              describe('métodos de clase', () => {

                  // Asegurate de leer el largo comentario en server/models/index.js
                  // antes de intentar el siguiente assertion.
                  describe('getAllWhereSender', () => {

                      it('existe', () => {
                          expect(Message.getAllWhereSender).to.be.a('function');
                      });

                      it('retorna una promise', () => {
                          expect(Message.getAllWhereSender(annaId).then).to.be.a('function');
                      });

                      it('resuelve a todos los mensajes enviados por Anna', () => {
                          return Message.getAllWhereSender(annaId)
                              .then(messages => {
                                  expect(messages.length).to.be.equal(2);
                                  expect(messages).to.contain.a.thing.with.property('id', annaFirstMessage);
                                  expect(messages).to.contain.a.thing.with.property('id', annaSecondMessage);
                              });
                      });

                      it('resuelve a todos los mensajes enviados por Elsa', () => {
                          return Message.getAllWhereSender(elsaId)
                              .then(messages => {
                                  expect(messages.length).to.be.equal(1);
                                  expect(messages[0].id).to.be.equal(elsaFirstMessage);
                              });
                      });


                      it('Carga (EAGERLY LOADS) la información completa de ambos en remitente y el receptor', () => {

                          // http://sequelize.readthedocs.io/en/v3/docs/models-usage/#eager-loading
                          // No te olvides de aliases explicadas en server/models/index.js!

                          return Message.getAllWhereSender(elsaId)
                              .then(messages => {

                                  const theMessage = messages[0];

                                  // Espera que el primer de los mensajes encontrados tenga las propiedades `to` y `from` que son objetos
                                  expect(theMessage.to).to.be.an('object');
                                  expect(theMessage.from).to.be.an('object');

                                  // Espera que la propiedad email de esos objetos coincidan con el de
                                  // los usuarios asociados que enviaron/recibieron el mensaje
                                  expect(theMessage.to.email).to.be.equal('anna@gmail.com');
                                  expect(theMessage.from.email).to.be.equal('elsa@gmail.com');

                              });
                      });

                  });

              });

              describe('métodos de instancia', () => {

                  describe('truncateSubject', () => {

                      let testMessage;
                      beforeEach(() => {
                          testMessage = Message.build({
                              from: annaId,
                              to: elsaId,
                              subject: `I don't know if I'm elated or gassy`,
                              body: `But I'm somewhere in that zone`
                          });
                      });

                      it('exists', () => {
                          expect(testMessage.truncateSubject).to.be.a('function');
                      });

                      it('retorna el objeto mensaje completo pero con el texto del subject limitado basado en el número pasado para determinar su length', () => {
                          // Aquí estamos esperando que el *valor retornado* de .truncateSubject()
                          // es *la instancia completa del objeto message* con su propiedad .subject alterada.
                          const messageWithTruncatedSubject = testMessage.truncateSubject(12);
                          expect(messageWithTruncatedSubject).to.be.an('object');
                          expect(messageWithTruncatedSubject.body).to.be.equal(`But I'm somewhere in that zone`);
                          expect(messageWithTruncatedSubject.subject).to.be.equal(`I don't know`);
                      });

                      it('agrega puntos suspensivos (...) luego del texto truncado si true es pasado como un segundo argumento', () => {
                          expect(testMessage.truncateSubject(4, true).subject).to.be.equal('I do...');
                      });

                  });

              });

          });

      });

  });
 */
  /* describe('Servidor HTTP', () => {

      let agent;
      beforeEach('Setea el agente para testear', () => {
          agent = supertest(app);
      });

      describe('api routes', () => {
          let obama;
          let biden;
          beforeEach('Seed users', () => {
              const users = [
                  {email: 'obama@gmail.com'},
                  {email: 'biden@gmail.com'}
              ];
              return User.bulkCreate(users, {returning: true})
                  .then(createdUsers => {
                      obama = createdUsers[0].id;
                      biden = createdUsers[1].id;
                  });
          });

          let obamaFirstMessage;
          let bidenFirstMessage;
          let obamaSecondMessage;
          beforeEach('Seed messages', () => {

              const messages = [
                  {
                      toId: biden,
                      fromId: obama,
                      body: 'HEYOOOOOOO'
                  },
                  {
                      toId: obama,
                      fromId: biden,
                      body: 'WAAASSUUUUPP??'
                  },
                  {
                      toId: biden,
                      fromId: obama,
                      body: 'nmu?'
                  }
              ];

              return Message.bulkCreate(messages, {returning: true})
                  .then(createdMessages => {
                      obamaFirstMessage = createdMessages[0].id;
                      bidenFirstMessage = createdMessages[1].id;
                      obamaSecondMessage = createdMessages[2].id;
                  });

          });

          describe('users', () => {

              it('sirve todos los usuarios en el pedido de GET /', () => {
                  return agent
                      .get('/users')
                      .expect(200)
                      .then(res => {
                          expect(res.body).to.be.an('array');
                          expect(res.body.length).to.be.equal(2);
                          expect(res.body).to.contain.a.thing.with.property('id', obama);
                          expect(res.body).to.contain.a.thing.with.property('id', biden);
                      });
              });

              it('actualiza un usuario en PUT /{{usersId}}, enviando un 201 como respuesta', () => {
                  return agent
                      .put(`/users/${obama}`)
                      .send({
                          email: 'potus@hotmail.com'
                      })
                      .expect(201)
                      .then(res => {
                          return User.findByPk(obama);
                      })
                      .then(user => {
                          expect(user.email).to.be.equal('potus@hotmail.com');
                      });
              });

          });

          describe('messages', () => {

              // encuentra todos los mensajes done el campo `to` coincida con la variable ID

              it('sirve todos los mensajes de un usuario específico en GET /to/{{recipientId}}', () => {
                  return agent
                      .get(`/messages/to/${obama}`)
                      .expect(200)
                      .then(res => {
                          expect(res.body).to.be.an('array');
                          expect(res.body.length).to.be.equal(1);
                          expect(res.body[0].body).to.be.equal('WAAASSUUUUPP??');
                      });
              });

              // encuentra todos los mensajes donde el campo `from` coincida con la variable ID

              it('sirve todos los mensajes de un remitente especifico en GET /from/{{senderId}}', () => {
                  return agent
                      .get(`/messages/from/${obama}`)
                      .expect(200)
                      .then(res => {
                          expect(res.body).to.be.an('array');
                          expect(res.body.length).to.be.equal(2);
                          expect(res.body).to.contain.a.thing.with.property('body', 'HEYOOOOOOO');
                          expect(res.body).to.contain.a.thing.with.property('body', 'nmu?');
                      });
              });

              // recuerdas eager loading?

              it('sirve todos los mensajes completada con referencia a los usuarios específicos en GET /to/{{recipientId}}', () => {
                  return agent
                      .get(`/messages/to/${obama}`)
                      .expect(200)
                      .then(res => {
                          expect(res.body).to.be.an('array');
                          expect(res.body.length).to.be.equal(1);
                          expect(res.body[0].from.email).to.be.equal('biden@gmail.com');
                          expect(res.body[0].to.email).to.be.equal('obama@gmail.com');
                      });
              });

              it(`sirve todos los mensajes de un remitente especifico en GET /from/{{senderId}}
                  y usa el método estatico delmodelo Message getAllWhereSender en el proceso`, () => {

                  // http://sinonjs.org/docs/#spies
                  const getAllWhereSenderSpy = sinon.spy(Message, 'getAllWhereSender');

                  return agent
                      .get(`/messages/from/${obama}`)
                      .expect(200)
                      .then(res => {

                          expect(res.body).to.be.an('array');
                          expect(res.body.length).to.be.equal(2);

                          expect(getAllWhereSenderSpy.called).to.be.equal(true);
                          expect(getAllWhereSenderSpy.calledWith(obama.toString())).to.be.equal(true);

                          getAllWhereSenderSpy.restore();

                      });

              });

              it('agrega un nuevo mensaje en adds POST /, respondiendo con un 201 y creando el mensaje', () => {

                  return agent
                      .post('/messages')
                      .send({
                          fromId: biden,
                          toId: obama,
                          body: 'You are my best friend. I hope you know that.'
                      })
                      .expect(201)
                      .then(res => {
                          const createdMessage = res.body;
                          return Message.findByPk(createdMessage.id)
                      })
                      .then(foundMessage => {
                          expect(foundMessage.body).to.be.equal('You are my best friend. I hope you know that.');
                      });

              });

          });

      });

  });
 */
/* });
 */
