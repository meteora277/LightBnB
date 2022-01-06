const { Pool } = require("pg/lib");
const properties = require("./json/properties.json");

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
const addUser = function (user) {
  
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
const getAllProperties = function (options, limit = 1) {
  return pool
    .query(
      `
    SELECT * FROM properties LIMIT $1
  `,
      [limit]
    )
    .then((res) => res.rows)
    .catch((err) => console.log(err));
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;