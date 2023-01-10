const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require('../../../server.js');
const Concert = require('../../../models/concerts.model.js');

describe('GET /api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', id: 1, performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConOne.save();
  
    const testConTwo = new Concert({ _id: '5d9f1140f10a81216cfd4408' ,id: 2, performer: 'Rebekah Parker', genre: 'R&B', price: 35, day: 2, image: '/img/uploads/2f342s4fsdg.jpg' });
    await testConTwo.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
  })

  it('should return Concerts by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('should return Concerts by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John+Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('should return Concerts by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  it('should return Concerts by min and max price', async () => {
    const res = await request(server).get('/api/concerts/price/20/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });
});