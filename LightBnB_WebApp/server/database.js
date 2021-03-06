/* eslint-disable camelcase */
const { Pool } = require("pg/lib");

/// Users

let pool = new Pool({
  user: "meep",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  //returns promise that will resolve when db returns data
  return pool.query(`
  SELECT
    *
  FROM
    users
  WHERE
    email = $1
  ;`, [email])
    .then(res => {
      console.log(res.rows,'uwu');
      return res.rows[0];
    })
    .catch(err => console.log(err));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function(id) {
  return pool.query(`
    SELECT
      *
    FROM
      users
    WHERE
      id = $1;
  `, [id])
    .then(res => res.rows[0])
    .catch(err => console.log(err))
  ;
};
exports.getUserWithId = getUserWithId;



/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3);
  RETURNING *;
  `,[user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => err);

};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT
    reservations.id,
    start_date,
    end_date,
    reservations.property_id,
    reservations.guest_id,
    properties.*,
    avg(property_reviews.rating) AS average_rating
  FROM
    reservations
    JOIN users ON guest_id = users.id
    JOIN properties ON property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE
    users.id = $1 AND reservations.end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date
  LIMIT $2;
  `, [guest_id, limit])
    .then(res => {
      return res.rows;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  let queryParams = [];

  //create queryString based on options user inputs into seacrch form

  let queryString = `
    SELECT
      properties.*,
      AVG(rating) AS average_rating
    FROM
      property_reviews
      JOIN properties ON property_id = properties.id
  `;
  if (options.city || options.owner_id || options.minimum_price_per_night || options.maximum_price_per_night) {
    queryString += " WHERE ";
  }
  //adds more clauses to WHERE parameter
  if (options.city) {
    queryParams.push(`%${options.city.toLowerCase()}%`);
    queryString += `LOWER(city) LIKE $${queryParams.length}`;
  }
  if (options.owner_id) {
    if (queryParams.length >= 1) {
      queryString += ' AND ';
    }
    queryParams.push(`${options.owner_id}`);
    queryString += `owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    if (queryParams.length >= 1) {
      queryString += ' AND ';
    }
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `cost_per_night / 100 > $${queryParams.length}`;
  }
  if (options.maximum_price_per_night) {
    if (queryParams.length >= 1) {
      queryString += ' AND ';
    }
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `cost_per_night / 100 < $${queryParams.length}`;
  }
 
  queryString += `
  GROUP BY
    properties.id`;
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING avg(rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY
    cost_per_night
  LIMIT
    $${queryParams.length};
    `;
  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
    .then(res => res.rows);
 
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function({
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
  post_code
}) {
  return pool.query(
    `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, TRUE)
  RETURNING *;
  `,[
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
      post_code
    ]
  )
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};
exports.addProperty = addProperty;
