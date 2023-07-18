db.users.insertOne(
    {
        nik: '--',
        full_name: 'Super Admin',
        email: 'admin1@mail.com',
        password: '$2b$10$rV4PkMniHKA0eXOpGBxf0ezrSU8RDddv1YJdOK6UmhNvfyYrhbyPi',
        gender: 'laki-laki',
        address: 'medan',
        occupation: { name: 'lainnya', id: 'mahasiswa' },
        birth_date: '1998-04-13',
        phone: '98976798976',
        level: 'super admin',
        photo_profile: 'basic-photo-profile.png',
        status: 'approved',
        createdAt: 'Monday, March 6, 2023 3:05 PM',
      }
    
)
db.users.insertOne(
    {
        nik: '---',
        full_name: 'Frondtend Office',
        email: 'fo@mail.com',
        password: '$2b$10$rV4PkMniHKA0eXOpGBxf0ezrSU8RDddv1YJdOK6UmhNvfyYrhbyPi',
        gender: 'laki-laki',
        address: 'medan',
        occupation: { name: 'lainnya', id: 'mahasiswa' },
        birth_date: '1998-04-13',
        phone: '9897678976',
        level: 'fo',
        photo_profile: 'basic-photo-profile.png',
        status: 'approved',
        createdAt: 'Monday, March 6, 2023 3:05 PM',
      }
    
)