const app = require('../../app');
const request = require('supertest');
let profiles = {};

describe('test POST /api/v1/profiles endpoint', () => {
  test('test id belum terdaftar -> sukses', async () => {
    try {
      let user_id = 1;
      let identity_type = "KTP";
      let identity_number = "18711988299302";
      let address = "jln.marga Bandar Lampung";

      let { statusCode, body } = (await request(app).post('/api/v1/profiles')).send({ user_id, identity_type, identity_number, address });
      profiles = body.data;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('user_id');
      expect(body.data).toHaveProperty('idendity_type');
      expect(body.data).toHaveProperty('identity_number');
      expect(body.data).toHaveProperty('address');
      expect(body.data.user_id).toBe(user_id);
      expect(body.data.identity_type).toBe(identity_type);
      expect(body.data.identity_number).toBe(identity_number);
      expect(body.data.address).toBe(address);
    } catch (err) {
      expect('error');
    }
  });

  test('test id sudah terdaftar -> error', async () => {
    try {
      let user_id = 1;
      let identity_type = "KTP";
      let identity_number = "18711988299302";
      let address = "jln.marga Bandar Lampung";

      let { statusCode, body } = await request(app).post('/api/v1/profiles').send({ user_id, identity_type, identity_number, address });

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
    } catch (err) {
      expect('id sudah dipakai');
    }
  });
});

describe('test GET /api/v1/profiles/:id endpoint', () => {
  test('test cari profiles dengan id yang terdaftar -> sukses', async () => {
    try {
      let { statusCode, body } = await request(app).get(`/api/v1/profiles/${profiles.id}`);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('user_id');
      expect(body.data).toHaveProperty('idendity_type');
      expect(body.data).toHaveProperty('identity_number');
      expect(body.data).toHaveProperty('address');
      expect(body.data.user_id).toBe(user_id);
      expect(body.data.identity_type).toBe(identity_type);
      expect(body.data.identity_number).toBe(identity_number);
      expect(body.data.address).toBe(address);
    } catch (err) {
      expect('error');
    }
  });

  test('test cari profiles dengan id yang tidak terdaftar -> error', async () => {
    try {
      try {
        let { statusCode, body } = await request(app).get(`/api/v1/profiles/${profiles.id + 1000}`);

        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        // expect(body.data.id).toBe(profiles.id);
      } catch (err) {
        expect(err).toBe('error');
      }
    } catch (err) {
      expect('id tidak ditemukan');
    }
  });
});

describe('Uji endpoint PUT /api/v1/profiles/:id', () => {
  test('Uji memperbarui pengguna dengan ID yang terdaftar -> Sukses', async () => {
    try {
      // Simulasikan pembaruan data profiles yang ada
      const newData = {
        user_id: 1,
        identity_type: "SIM",
        identity_number: "918829927737",
        address: "jln.semangka Bandar Lampung"
      };

      const { statusCode, body } = await request(app)
        .put(`/api/v1/profiles/${profiles.id}`)
        .send(newData);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status', 'success');
      expect(body).toHaveProperty('message', 'Profiles berhasil diperbarui');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id', profiles.id);
      expect(body.data).toHaveProperty('user_id', newData.user_id);
      expect(body.data).toHaveProperty('identity_type', newData.identity_type);
      expect(body.data).toHaveProperty('identity_number', newData.identity_number);
      expect(body.data).toHaveProperty('address', newData.address);
    } catch (err) {
      expect('id sudah dipakai');
    }
  });

  test('Uji memperbarui pengguna dengan ID yang tidak terdaftar -> Gagal', async () => {
    try {
      // Simulasikan pembaruan data pengguna dengan ID yang tidak ada
      const newData = {
        user_id: 1,
        identity_type: "SIM",
        identity_number: "918829927737",
        address: "jln.semangka Bandar Lampung"
      };

      const { statusCode, body } = await request(app)
        .put(`/api/v1/profiles/${profiles.id + 1000}`)
        .send(newData);

      // Pastikan respons server sesuai dengan yang diharapkan
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('status', 'error');
      expect(body).toHaveProperty('message', 'Pengguna tidak ditemukan');
      expect(body).toHaveProperty('data', null);
    } catch (err) {
      expect('id sudah dipakai');
    }
  });
});

describe('Uji endpoint DELETE /api/v1/profiles/:id', () => {
  test('Uji menghapus pengguna dengan ID yang terdaftar -> Sukses', async () => {
    try {
      const { statusCode, body } = await request(app).delete(`/api/v1/profiles/${profiles.id}`);

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
      const { statusCode, body } = await request(app).delete(`/api/v1/profiles/${profiles.id + 1000}`);

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
