INSERT INTO
  users (name, email, password)
VALUES
  (
    'justin',
    'justin.s.diaz@gmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  );

INSERT INTO
  users (name, email, password)
VALUES
  (
    'melissa',
    'mel@mel.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  );

INSERT INTO
  users (name, email, password)
VALUES
  (
    'wiggles',
    'wiggles@wiggles.com,',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  );

INSERT INTO
  properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES
  (
    1,
    '20 Bruyeres Mews',
    'cozy home',
    'https://images.app.goo.gl/3R1CjFcpuexQavfF6',
    'https://images.app.goo.gl/3R1CjFcpuexQavfF6',
    50,
    0,
    1,
    1,
    'CANADA',
    'Bruyeres Mews',
    'Toronto',
    'Ontario',
    'M5V0G8',
    TRUE
  );

INSERT INTO
  properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES
  (
    2,
    '20 Bruyeres Mews',
    'cozy home w/ cat',
    'https://images.app.goo.gl/3R1CjFcpuexQavfF6',
    'https://images.app.goo.gl/3R1CjFcpuexQavfF6',
    50,
    0,
    1,
    1,
    'CANADA',
    'Bruyeres Mews',
    'Toronto',
    'Ontario',
    'M5V0G8',
    TRUE
  );

INSERT INTO
  properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES
  (
    3,
    '35 Brookwell Dr',
    'messy home',
    'https://images.app.goo.gl/3R1CjFcpuexQavfF6',
    'https://images.app.goo.gl/3R1CjFcpuexQavfF6',
    50,
    0,
    1,
    1,
    'CANADA',
    'Brookwell Dr.',
    'North York',
    'Ontario',
    'M3M2Y3',
    TRUE
  );

INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2015-12-31', '2022-1-5', 1, 1);

INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2001-12-31', '2022-1-5', 2, 2);

INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2021-12-31', '2022-1-5', 3, 3);

INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (
    1,
    1,
    1,
    10,
    'house was lovely kinda small'
  );
INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (
    2,
    2,
    2,
    0,
    'I was promised a cat and there wasn''t one there, apparently she got adopted '
  );
INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  ) 
VALUES
  (
    3,
    3,
    3,
    7,
    'house was a bit messy, might contain a hoarder'
  );