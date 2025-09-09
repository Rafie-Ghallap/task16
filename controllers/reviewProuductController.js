const { usersData } = require("../models/users");
const { reviewsData } = require("../models/reviews");
const { SendEmailToUser } = require("../utils/mailSender");
let proudctData = [
  { name: "product", id: "1", price: "1000" },
  { name: "product", id: "2", price: "2000" },
];

const reviewProuduct = async (req, res) => {
  try {
    const { email, stars, description } = req.body;
    const { id } = req.params;
    if (!email || !stars || !description || !id) {
      return res.status(400).json({ message: "All inputs are required" });
    }

    let checkEmail = email.split("@");
    if (!["gmail.com", "yahoo.com", "hotmail.com"].includes(checkEmail[1])) {
      return res.status(400).json({ message: "Email must be a Gmail address" });
    }

    const getUser = await usersData.findOne({ email: email });
    if (!getUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const checkReview = await reviewsData.findOne({
      username: getUser.username,
      productId: id,
    });
    if (checkReview) {
      return res.status(400).json({ message: "I have already evaluated it" });
    }

    for(let proudct of proudctData){
        if(proudct.id === id){
            checkProduct = proudct
            break;
        }
    }
    if (!checkProduct) {
      return res.status(400).json({ message: "Product not found" });
    }

    const addReview = new reviewsData({
      username: getUser.username,
      productId: id,
      stars: stars,
      description: description,
    });
    await addReview.save();
    if (addReview.stars <= 2) {
      SendEmailToUser(
        email,
        "We are sorry about your experience",
        `Hi ${getUser.username},\n\nWe're sorry your experience with the product wasn't satisfying. 
We truly value your feedback and would love to know more details so we can improve our service. 
Please reply to this email and share your thoughts.\n\nThank you.`
      );
    } else if (addReview.stars === 3) {
      SendEmailToUser(
        email,
        "Thanks for your feedback!",
        `Hi ${getUser.username},\n\nThank you for your review! 
It seems there are some good points but also areas we can improve. 
We'd appreciate if you share suggestions with us to make your experience even better.\n\nBest regards.`
      );
    } 
     else if (addReview.stars >= 4) {
      SendEmailToUser(
        email,
        "Glad you liked it",
        `Hi ${getUser.username},\n\nThank you so much for your amazing review! 
We're thrilled you had an excellent experience. 
Your support motivates us to keep doing our best.\n\nBest wishes.`
      );
    }

    return res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error get users", error: error.message });
  }
};

module.exports = { reviewProuduct };
