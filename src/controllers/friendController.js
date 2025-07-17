import User from "../models/User.js";

// ✅ in-memory store for online users (same object used in authController)
let onlineUsers = [];

export const setOnlineUsers = (users) => {
  onlineUsers = users;
};

export const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Add online status to each friend
    const friendsWithStatus = user.friends.map((friend) => {
      const isOnline = onlineUsers.includes(friend._id.toString());
      return { ...friend._doc, online: isOnline };
    });

    res.status(200).json({ friends: friendsWithStatus });
  } catch (error) {
    console.error("getUserFriends error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
