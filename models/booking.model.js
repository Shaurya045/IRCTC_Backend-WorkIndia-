import pool from "../config/db.js";

class Booking {
  static async create(userId, trainId, seatsBooked) {
    try {
      // console.log( { userId, trainId, seatsBooked });
      const [result] = await pool.query(
        "INSERT INTO Bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)",
        [userId, trainId, seatsBooked]
      );
      return result.insertId;
    } catch (err) {
      throw err;
    }
  }

  static async findById(bookingId) {
    const [rows] = await pool.query("SELECT * FROM Bookings WHERE id = ?", [
      bookingId,
    ]);
    return rows[0];
  }
}

export default Booking;
