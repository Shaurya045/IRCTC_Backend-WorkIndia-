import Train from "../models/train.model.js";
import Booking from "../models/booking.model.js";

const bookSeat = async (req, res) => {
  const { trainId, seats } = req.body;
  const userId = req.user.id;

  // console.log("Booking Request:", { userId, trainId, seats });

  // Validate input
  if (!trainId || !seats || seats <= 0) {
    return res.status(400).json({
      message:
        "Invalid input: trainId and seats are required, and seats must be greater than 0.",
    });
  }

  try {
    await Train.bookSeatsWithLock(trainId, seats);
    const bookingId = await Booking.create(userId, trainId, seats);
    res.json({ message: "Booking successful!!", bookingId });
  } catch (err) {
    if (err.message === "Not enough seats!!") {
      res.status(400).json({ message: "Not enough seats available!!" });
    } else {
      res
        .status(500)
        .json({ message: "Error booking seat", error: err.message });
    }
  }
};

const getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.user_id !== req.user.id) {
      return res.status(404).json({ message: "Booking not found!!" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking details!!" });
  }
};

export { bookSeat, getBookingDetails };
