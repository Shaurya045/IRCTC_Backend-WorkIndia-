const { ADMIN_API_KEY } = process.env;

const adminAuth = async (req, res, next) => {
  const apiKey = req.header("Authorization");
  if (apiKey !== ADMIN_API_KEY) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

export default adminAuth;
