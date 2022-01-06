SELECT
  properties.id,
  title,
  cost_per_night,
  AVG(rating) AS average_rating
FROM
  property_reviews
  JOIN properties ON property_id = properties.id
WHERE
  properties.city LIKE '%ancouve%'
GROUP BY
  properties.id 
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;
