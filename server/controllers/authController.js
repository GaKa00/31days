
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Anta att du har en User-modell definierad
const SECRET_KEY = "dinhemliganyckel"; // Flytta till en miljövariabel i en produktionsapp


exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Användare skapad!" });
  } catch (error) {
    res.status(500).json({ error: "Det gick inte att skapa användaren" });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Ogiltigt användarnamn eller lösenord" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Ogiltigt användarnamn eller lösenord" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Inloggning misslyckades" });
  }
};
