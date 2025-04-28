const db = require('../db');

const createProgress = async (userId, sectionId, subsectionId, status) => {
  const result = await db.query(
    'INSERT INTO progress (user_id, section_id, subsection_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, sectionId, subsectionId, status]
  );
  return result.rows[0];
};

const updateProgress = async (userId, sectionId, subsectionId, status) => {
  const result = await db.query(
    'UPDATE progress SET status = $4 WHERE user_id = $1 AND section_id = $2 AND subsection_id = $3 RETURNING *',
    [userId, sectionId, subsectionId, status]
  );
  return result.rows[0];
};

const getProgressByUser = async (userId) => {
  const result = await db.query(
    'SELECT * FROM progress WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

module.exports = {
  createProgress,
  updateProgress,
  getProgressByUser,
};
