import User from "../models/User.js";


export const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
