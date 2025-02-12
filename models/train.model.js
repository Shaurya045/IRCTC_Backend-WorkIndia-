import pool from "../config/db.js";

class Train {
  static async create(name, source, destination, total_seats) {
    try {
      // console.log({
      //   name,
      //   source,
      //   destination,
      //   total_seats,
      // });
      const [result] = await pool.query(
        "INSERT INTO Trains (name, source, destination, total_seats) VALUES (?, ?, ?, ?)",
        [name, source, destination, total_seats]
      );
      // console.log(result.insertId);
      return result.insertId;
    } catch (err) {
      console.error("Error in Train.create:", err); // Log the error
      throw err;
    }
  }

  static async findByRoute(source, destination) {
    const [rows] = await pool.query(
      "SELECT * FROM Trains WHERE LOWER(source) = LOWER(?) AND LOWER(destination) = LOWER(?)",
      [source, destination]
    );
    return rows;
  }

  static async bookSeatsWithLock(trainId, seats) {
    const connection = await pool.getConnection();
    try {
      // console.log( trainId);
      await connection.beginTransaction();

      // Lock the row to prevent race conditions
      const [train] = await connection.query(
        "SELECT * FROM Trains WHERE id = ? FOR UPDATE",
        [trainId]
      );
      // console.log(train[0]);

      if (!train.length) {
        throw new Error("Train not found");
      }

      if (train[0].total_seats < seats) {
        throw new Error("Not enough seats");
      }

      await connection.query(
        "UPDATE Trains SET total_seats = total_seats - ? WHERE id = ?",
        [seats, trainId]
      );
      // console.log("Seats updated successfully!!");

      await connection.commit();
      return true;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

export default Train;
