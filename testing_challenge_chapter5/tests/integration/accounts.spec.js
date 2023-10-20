const app = require('../../app');
const request = require('supertest');
let accounts = {};

describe('test POST /api/v1/accounts endpoint', () => {
  test('test id belum terdaftar -> sukses', async () => {
    try {
      let user_id = 1;
      let bank_name = "Bank BRI";
      let bank_account_number = "892773884";
      let balance = "17500000";

      let { statusCode, body } = (await request(app).post('/api/v1/accounts')).send({ user_id, bank_name, bank_account_number, balance });
      accounts = body.data;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('user_id');
      expect(body.data).toHaveProperty('idendity_type');
      expect(body.data).toHaveProperty('bank_account_number');
      expect(body.data).toHaveProperty('balance');
      expect(body.data.user_id).toBe(user_id);
      expect(body.data.bank_name).toBe(bank_name);
      expect(body.data.bank_account_number).toBe(bank_account_number);
      expect(body.data.balance).toBe(balance);
    } catch (err) {
      expect('error');
    }
  });

  test('test id sudah terdaftar -> error', async () => {
    try {
      let user_id = 1;
      let bank_name = "Bank BRI";
      let bank_account_number = "892773884";
      let balance = "17500000";

      let { statusCode, body } = await request(app).post('/api/v1/accounts').send({ user_id, bank_name, bank_account_number, balance });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    } catch (err) {
      expect('id sudah dipakai');
    }
  });
});

describe('test GET /api/v1/accounts/:id endpoint', () => {
  test('test cari accounts dengan id yang terdaftar -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).get(`/api/v1/accounts/${accounts.id}`);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('user_id');
      expect(body.data).toHaveProperty('idendity_type');
      expect(body.data).toHaveProperty('bank_account_number');
      expect(body.data).toHaveProperty('balance');
      expect(body.data.user_id).toBe(user_id);
      expect(body.data.bank_name).toBe(bank_name);
      expect(body.data.bank_account_number).toBe(bank_account_number);
      expect(body.data.balance).toBe(balance);
    } catch (err) {
      expect('error');
    }
  });

  test('test cari accounts dengan id yang tidak terdaftar -> error', async () => {
    try {
      try {
        let { statusCode, body } = await request(app).get(`/api/v1/accounts/${accounts.id + 1000}`);

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        // expect(body.data.id).toBe(accounts.id);
      } catch (err) {
        expect(err).toBe('error');
      }
    } catch (err) {
      expect('id tidak ditemukan');
    }
  });
});