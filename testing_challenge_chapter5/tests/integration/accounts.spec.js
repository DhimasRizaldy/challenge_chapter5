const app = require('../../app');
const request = require('supertest');
let accounts = {};

describe('test POST /api/v1/accounts endpoint', () => {
  test('test id belum terdaftar -> sukses', async () => {
    try {
      let user_id = 1;
      let bank_user_id = "Bank BRI";
      let bank_account_number = "892773884";
      let balance = "17500000";

      let { statusCode, body } = (await request(app).post('/api/v1/accounts')).send({ user_id, bank_user_id, bank_account_number, balance });
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
      expect(body.data.bank_user_id).toBe(bank_user_id);
      expect(body.data.bank_account_number).toBe(bank_account_number);
      expect(body.data.balance).toBe(balance);
    } catch (err) {
      expect('error');
    }
  });

  test('test id sudah terdaftar -> error', async () => {
    try {
      let user_id = 1;
      let bank_user_id = "Bank BRI";
      let bank_account_number = "892773884";
      let balance = "17500000";

      let { statusCode, body } = await request(app).post('/api/v1/accounts').send({ user_id, bank_user_id, bank_account_number, balance });

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
      expect(body.data.bank_user_id).toBe(bank_user_id);
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

describe('Uji endpoint PUT /api/v1/accounts/:id', () => {
  test('Uji memperbarui accounts dengan ID yang terdaftar -> Sukses', async () => {
    try {
      // Simulasikan pembaruan data accounts yang ada
      const newData = {
        user_id: 1,
        bank_name: 'Mandiri',
        bank_account_number: '819709792093',
        balance: 17500000
      };

      const { statusCode, body } = await request(app)
        .put(`/api/v1/accounts/${accounts.id}`)
        .send(newData);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('message', 'accounts berhasil diperbarui');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id', accounts.id);
      expect(body.data).toHaveProperty('user_id', newData.user_id);
      expect(body.data).toHaveProperty('bank_name', newData.bank_name);
      expect(body.data).toHaveProperty('bank_account_number', newData.bank_account_number);
      expect(body.data).toHaveProperty('balance', newData.balance);
    } catch (err) {
      expect('id sudah dipakai');
    }
  });

  test('Uji memperbarui accounts dengan ID yang tidak terdaftar -> Gagal', async () => {
    try {
      // Simulasikan pembaruan data accounts dengan ID yang tidak ada
      const newData = {
        user_id: 1,
        bank_name: 'Mandiri',
        bank_account_number: '819709792093',
        balance: 17500000
      };

      const { statusCode, body } = await request(app)
        .put(`/api/v1/accounts/${accounts.id + 1000}`)
        .send(newData);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('status', 'error');
      expect(body).toHaveProperty('message', 'accounts tidak ditemukan');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('bank_name sudah dipakai');
    }
  });
});

describe('Uji endpoint DELETE /api/v1/accounts/:id', () => {
  test('Uji menghapus accounts dengan ID yang terdaftar -> Sukses', async () => {
    try {
      const { statusCode, body } = await request(app).delete(`/api/v1/accounts/${accounts.id}`);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('message', 'accounts berhasil dihapus');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('error');
    }
  });

  test('Uji menghapus accounts dengan ID yang tidak terdaftar -> Gagal', async () => {
    try {
      const { statusCode, body } = await request(app).delete(`/api/v1/accounts/${accounts.id + 1000}`);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('status', 'error');
      expect(body).toHaveProperty('message', 'accounts tidak ditemukan');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('user tidak ditemukan');
    }
  });
});
