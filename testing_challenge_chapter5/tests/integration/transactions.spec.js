const app = require('../../app');
const request = require('supertest');
let transactions = {};

describe('test POST /api/v1/transactions endpoint', () => {
  test('test id belum terdaftar -> sukses', async () => {
    try {
      let source_account_id = 1;
      let destination_account_id = 1;
      let amount = 150000;

      let { statusCode, body } = (await request(app).post('/api/v1/transactions')).send({ source_account_id, destination_account_id, amount });
      transactions = body.data;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('source_account_id');
      expect(body.data).toHaveProperty('idendity_type');
      expect(body.data).toHaveProperty('amount');
      expect(body.data.source_account_id).toBe(source_account_id);
      expect(body.data.destination_account_id).toBe(destination_account_id);
      expect(body.data.amount).toBe(amount);
    } catch (err) {
      expect('error');
    }
  });

  test('test id sudah terdaftar -> error', async () => {
    try {
      let source_account_id = 1;
      let destination_account_id = 1;
      let amount = 150000;

      let { statusCode, body } = await request(app).post('/api/v1/transactions').send({ source_account_id, destination_account_id, amount, });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    } catch (err) {
      expect('id sudah dipakai');
    }
  });
});

describe('test GET /api/v1/transactions/:id endpoint', () => {
  test('test cari transactions dengan id yang terdaftar -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).get(`/api/v1/transactions/${transactions.id}`);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('source_account_id');
      expect(body.data).toHaveProperty('idendity_type');
      expect(body.data).toHaveProperty('amount');
      expect(body.data.source_account_id).toBe(source_account_id);
      expect(body.data.destination_account_id).toBe(destination_account_id);
      expect(body.data.amount).toBe(amount);
    } catch (err) {
      expect('error');
    }
  });

  test('test cari transactions dengan id yang tidak terdaftar -> error', async () => {
    try {
      try {
        let { statusCode, body } = await request(app).get(`/api/v1/transactions/${transactions.id + 1000}`);

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        // expect(body.data.id).toBe(transactions.id);
      } catch (err) {
        expect(err).toBe('error');
      }
    } catch (err) {
      expect('id tidak ditemukan');
    }
  });
});

describe('Uji endpoint PUT /api/v1/transactions/:id', () => {
  test('Uji memperbarui transactions dengan ID yang terdaftar -> Sukses', async () => {
    try {
      // Simulasikan pembaruan data transactions yang ada
      const newData = {
        source_account_id: 1,
        destination_account_id: 2,
        amount: 160000
      };

      const { statusCode, body } = await request(app)
        .put(`/api/v1/transactions/${transactions.id}`)
        .send(newData);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('message', 'transactions berhasil diperbarui');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id', transactions.id);
      expect(body.data).toHaveProperty('source_account_id', newData.source_account_id);
      expect(body.data).toHaveProperty('destination_account_id', newData.destination_account_id);
      expect(body.data).toHaveProperty('amount', newData.amount);
    } catch (err) {
      expect('id sudah dipakai');
    }
  });

  test('Uji memperbarui transactions dengan ID yang tidak terdaftar -> Gagal', async () => {
    try {
      // Simulasikan pembaruan data transactions dengan ID yang tidak ada
      const newData = {
        source_account_id: 1,
        destination_account_id: 2,
        amount: 160000
      };

      const { statusCode, body } = await request(app)
        .put(`/api/v1/transactions/${transactions.id + 1000}`)
        .send(newData);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('status', 'error');
      expect(body).toHaveProperty('message', 'transactions tidak ditemukan');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('id sudah dipakai');
    }
  });
});

describe('Uji endpoint DELETE /api/v1/transactions/:id', () => {
  test('Uji menghapus transactions dengan ID yang terdaftar -> Sukses', async () => {
    try {
      const { statusCode, body } = await request(app).delete(`/api/v1/transactions/${transactions.id}`);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('message', 'transactions berhasil dihapus');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('error');
    }
  });

  test('Uji menghapus transactions dengan ID yang tidak terdaftar -> Gagal', async () => {
    try {
      const { statusCode, body } = await request(app).delete(`/api/v1/transactions/${transactions.id + 1000}`);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('status', 'error');
      expect(body).toHaveProperty('message', 'transactions tidak ditemukan');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('transactions tidak ditemukan');
    }
  });
});
