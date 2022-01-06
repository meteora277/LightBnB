SELECT
  city,
  count(city) AS total_reservations
FROM
  reservations
  JOIN properties ON property_id = properties.id
GROUP BY
  city
ORDER BY count(city)
DESC;