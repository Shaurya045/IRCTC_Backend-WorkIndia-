import pool from "../config/db.js";

class User {
  static async create(username, password, role) {
    // console.log(username);
    try {
      const [result] = await pool.query(
        "INSERT INTO Users (username, password, role) VALUES (?, ?, ?)",
        [username, password, role]
      );
      // console.log("User created successfully!!");
      return result.insertId;
    } catch (err) {
      throw err;
    }
  }

  static async findByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM Users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }
}

export default User;
