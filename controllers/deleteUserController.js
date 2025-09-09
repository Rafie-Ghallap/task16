const { usersData } = require("../models/users");
const deleteUser = async (req, res) => {
  try {
    if(req.user.role !== "admin"){
        return res.status(401).json({message:"unauthorized"});
    }

    await usersData.deleteOne({email: req.user.email});
    return res.status(200).json({message:"delete successfull"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { deleteUser };
