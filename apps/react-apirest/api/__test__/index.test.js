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

  describe("/profile", () => {

    describe("GET", () => {
      // Testing if API3 vulnerability is present.
      // Once vulnerability is fixed, add .skip() to prevent this test from failing.
      test('should return password field in the response', async done => {
        const response = await request
          .get('/api/v1/profile')
          .set("user-id", 1)

        expect(response.status).toBe(200)
        expect(response.body.password).toBeDefined();
        done();
      })

      // Skipped test for FIXED API3 vulnerability.
      // Once vulnerability is fixed, remove .skip().
      test.skip('should return password field in the response', async done => {
        const response = await request
          .get('/api/v1/profile')
          .set("user-id", 1)

        expect(response.status).toBe(200)
        expect(response.body.password).toBeUndefined();
        done();
      })
    })

    describe("PUT", () => {
      // Testing if API6 vulnerability is present.
      // Once vulnerability is fixed, add .skip() to prevent this test from failing.
      test('should change nonexisting property', async done => {
        await request
          .put('/api/v1/profile/2')
          .send({ "nonExistingProperty": 1 })
          .expect(200);

        const response = await request
          .get('/api/v1/profile')
          .set("user-id", 2)
          .expect(200);

        expect(response.body.nonExistingProperty).toBeDefined();

        done();
      })

      // Skipped test for FIXED API6 vulnerability.
      // Once vulnerability is fixed, remove .skip().
      test.skip('should return password field in the response', async done => {
        await request
          .put('/api/v1/profile/2')
          .send({ "nonExistingProperty": 1 })
          .expect(200);

        const response = await request
          .get('/api/v1/profile')
          .set("user-id", 2)
          .expect(200);

        expect(response.body.nonExistingProperty).toBeUndefined();

        done();
      })
    })
  })

  describe("/allocations", () => {
    describe('GET /:id', () => {
      let Cookies;

      // Obtain cookies for further tests.
      beforeAll(async () => {
        const response = await request
          .post('/api/v1/auth/login')
          .query({ username: "admin", password: "Admin_123" })
          .expect(200);

        Cookies = response.headers['set-cookie'].pop().split(';')[0];
      })

      /**
       * Test for NOT fixed API1:2019 Broken Object Level Authorization.
       * Once vulnerability is fixed, this test should start failing.
       */
      test('VULNERABILITY: should NOT restrict access for authenticated but not authorised user', async () => {
        const requestedUserId = 2; // different that logged in user (id = 1)
        const req = request
          .get(`/api/v1/allocations/${requestedUserId}`);

        req.cookies = Cookies;

        /**
         * Note: Expected status code should be 401 when vulnerability is fixed. 
         */
        await req.expect(200);
      });

      /**
      * Tests for fixed API1:2019 Broken Object Level Authorization.
      * Remove .skip() to test if vulnerability was fixed correctly.
      */
      test.skip('should restrict access for not logged in user', async () => {
        await request
          .get('/api/v1/allocations/1')
          .expect(401);
      });

      test.skip('should restrict access for authenticated but not authorised user', async () => {
        const requestedUserId = 2; // different that logged in user (id = 1)
        const req = request
          .get(`/api/v1/allocations/${requestedUserId}`);

        req.cookies = Cookies;

        await req.expect(401);
      });

      test.skip('should allow access for authenticated and authorised user', async () => {
        const requestedUserId = 1; // same as logged in user (id = 1)
        const req = request
          .get(`/api/v1/allocations/${requestedUserId}`);

        req.cookies = Cookies;

        await req.expect(200);
      });
    })

  })
})

function initiliseData(db) {
  const initiliase = require('../artifacts/initialise-data')
  return initiliase(db, { silent: true });
}
