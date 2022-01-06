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
  users.id = 1 AND reservations.end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT 10;