import Train from "../models/train.model.js";

const addTrain = async (req, res) => {
  const { name, source, destination, total_seats } = req.body;
  // console.log("Request Body:", req.body);

  try {
    const trainId = await Train.create(name, source, destination, total_seats);
    // console.log("Train added successfully with ID:", trainId);
    res.status(201).json({ message: "Train added successfully!!", trainId });
  } catch (err) {
    res.status(500).json({ message: "Error adding train!!", error: err.message });
  }
};

const getTrains = async (req, res) => {
  const { source, destination } = req.query;

  if (!source || !destination) {
    return res
      .status(400)
      .json({ message: "Source and destination are required!!" });
  }

  try {
    const trains = await Train.findByRoute(source, destination);
    res.json(trains);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching availability!!", error: err.message });
  }
};

export { addTrain, getTrains };
