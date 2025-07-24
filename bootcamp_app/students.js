const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = process.argv[2] || "";  // Get cohort name from CLI arg or default empty string
const limit = parseInt(process.argv[3], 10) || 5;  // Get limit from CLI arg or default 5

const queryString = `
  SELECT students.id AS student_id, students.name, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

const queryParams = [`%${cohortName}%`, limit];

pool
  .query(queryString, queryParams)
  .then((res) => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch((err) => console.error("query error", err.stack));
