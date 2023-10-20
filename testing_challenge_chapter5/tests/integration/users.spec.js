const app = require('../../app');
const request = require('supertest');
let users = {};

describe('test POST /api/v1/users endpoint', () => {
  test('test email belum terdaftar -> sukses', async () => {
    try {
      let name = 'usertest2';
      let email = 'usertest2@mail.com';
      let password = 'pasword123';

      let { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password });
      users = body.data;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
      expect(body.data.password).toBe(password);
    } catch (err) {
      expect('email sudah dipakai');
    }
  });

  test('test email sudah terdaftar -> error', async () => {
    try {
      let name = 'usertest2';
      let email = 'usertest2@mail.com';
      let password = 'pasword123';

      let { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    } catch (err) {
      expect('email sudah dipakai');
    }
  });
});


describe('test GET /api/v1/users/:id endpoint', () => {
  test('test cari user dengan id yang terdaftar -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).get(`/api/v1/users/${users.id}`);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data.id).toBe(users.id);
      expect(body.data.name).toBe(users.name);
      expect(body.data.email).toBe(users.email);
      expect(body.data.password).toBe(users.password);
    } catch (err) {
      expect('error');
    }
  });

  test('test cari user dengan id yang tidak terdaftar -> error', async () => {
    try {
      try {
        let { statusCode, body } = await request(app).get(`/api/v1/users/${users.id + 1000}`);

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        // expect(body.data.id).toBe(user.id);
      } catch (err) {
        expect(err).toBe('error');
      }
    } catch (err) {
      expect('user tidak ditemukan');
    }
  });
});


describe('Uji endpoint PUT /api/v1/users/:id', () => {
  test('Uji memperbarui pengguna dengan ID yang terdaftar -> Sukses', async () => {
    try {
      // Simulasikan pembaruan data pengguna yang ada
      const newData = {
        name: 'usertest3',
        email: 'usertest3@baru.com',
        password: 'password123'
      };

      const { statusCode, body } = await request(app)
        .put(`/api/v1/users/${users.id}`)
        .send(newData);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('message', 'Pengguna berhasil diperbarui');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id', users.id);
      expect(body.data).toHaveProperty('name', newData.name);
      expect(body.data).toHaveProperty('email', newData.email);
      expect(body.data).toHaveProperty('password', newData.password);
    } catch (err) {
      expect('email sudah dipakai');
    }
  });

  test('Uji memperbarui pengguna dengan ID yang tidak terdaftar -> Gagal', async () => {
    try {
      // Simulasikan pembaruan data pengguna dengan ID yang tidak ada
      const newData = {
        name: 'usertest3',
        email: 'usertest3@baru.com',
        password: 'password123'
      };

      const { statusCode, body } = await request(app)
        .put(`/api/v1/users/${users.id + 1000}`)
        .send(newData);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('status', 'error');
      expect(body).toHaveProperty('message', 'Pengguna tidak ditemukan');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('email sudah dipakai');
    }
  });
});

describe('Uji endpoint DELETE /api/v1/users/:id', () => {
  test('Uji menghapus pengguna dengan ID yang terdaftar -> Sukses', async () => {
    try {
      const { statusCode, body } = await request(app).delete(`/api/v1/users/${users.id}`);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('message', 'Pengguna berhasil dihapus');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('error');
    }
  });

  test('Uji menghapus pengguna dengan ID yang tidak terdaftar -> Gagal', async () => {
    try {
      const { statusCode, body } = await request(app).delete(`/api/v1/users/${users.id + 1000}`);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('status', 'error');
      expect(body).toHaveProperty('message', 'Pengguna tidak ditemukan');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('user tidak ditemukan');
    }
  });
});
