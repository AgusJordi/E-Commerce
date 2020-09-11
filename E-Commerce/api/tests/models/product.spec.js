const { Beer, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('User model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Beer.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Beer.create({
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      const beer2 = {
        name: 'duff2',
        price: 1.0,
        stock: 10,
        description: 'cerveza de lo simson',
        image: 'imagen piola',
        IBU: 0.5,
        ABV: 25
      };
      it('should work when its a valid name', () => {
        Beer.create(beer2)
      });
    });
  });
});

