/// <reference types="@types/jest" />

const supertest = require('supertest')
const appFactory = require('../app')
const { MongoClient } = require('mongodb');

describe('NodeGoat react apirest api', () => {
  let request;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db = await connection.db();
    await initiliseData(db)

    request = supertest(appFactory(db));
  });

  afterAll(async () => {
    await connection.close();
  });

  test('should handle NOT FOUND route', async done => {
    const response = await request.get('/invented-route')

    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({ error: { message: 'Not Found' } })
    done()
  })

  test('should handle API route', async done => {
    const response = await request.get('/api/v1/')

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({ msg: 'respond with a resource' })
    done()
  })
})


function initiliseData(db) {
  const initiliase = require('../artifacts/initialise-data')
  return initiliase(db, { silent: true });
}
