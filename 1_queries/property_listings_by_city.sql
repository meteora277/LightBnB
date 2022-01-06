SELECT
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
  active,
  AVG(rating) AS average_rating
FROM
  property_reviews
  JOIN properties ON property_id = properties.id
WHERE
  properties.city LIKE '%ancouve%'
GROUP BY
  properties.id
HAVING
  avg(property_reviews.rating) >= 4
ORDER BY
  cost_per_night
LIMIT
  10;