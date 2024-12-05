const express = require("express");
const db = require("../database/db.js");
const bcrypt = require("bcrypt");
const mySecretCode = crypto.randomUUID();

//  ROUTER
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [result] = await (
      await db
    ).query("SELECT * FROM contacts WHERE user_id = ?", [req.session.userID]);

    if (result.length < 1) {
      res.json({ one: false });
    } else {
      res.json({ one: true, result });
    }
  } catch (error) {
    return res.json({ error, message: "Server error" });
  }
});

router.get("/verify", (req, res) => {
  if (req.session.userID) {
    res.json({ log: true });
  } else {
    res.json({ log: false });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [result] = await (
      await db
    ).query("SELECT * FROM users WHERE user_email = ?", [email]);

    if (result.length >= 1) {
      return res.json({ log: false, message: "User already exists" });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const userIdCreated = crypto.randomUUID();
    const [putUser] = await (
      await db
    ).query(
      "INSERT INTO users(user_id, user_name, user_email, user_password) VALUES (?,?,?,?)",
      [userIdCreated, name, email, newPassword]
    );

    if (putUser.affectedRows == 1) {
      req.session.userID = userIdCreated;
      console.log(req.session.userID);
      res.json({ log: true });
    } else {
      return res.json({ log: false, message: "Unexpected error, try again" });
    }
  } catch (error) {
    return res.json({ error, message: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await (
      await db
    ).query("SELECT * FROM users WHERE user_email = ?", [email]);

    if (result.length < 1) {
      return res.json({ log: false, message: "User not found" });
    }

    bcrypt.compare(password, result[0]["user_password"], (err, myResult) => {
      if (err) {
        return res.json({ log: false, message: err });
      }
      if (myResult) {
        req.session.userID = result[0]["user_id"];
        res.json({ log: true });
      } else {
        res.json({ log: false, message: "Wrong password" });
      }
    });
  } catch (error) {
    return res.json({ error, message: "Server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, lastname, email, number, description } = req.body;

    const [result] = await (
      await db
    ).query(
      "INSERT INTO contacts (user_id, contact_name, contact_lastname, contact_email, contact_number, contact_description) VALUES (?,?,?,?,?,?)",
      [req.session.userID, name, lastname, email, number, description]
    );
    if (result.affectedRows > 0) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false });
    }
  } catch (error) {
    return res.json({ error, message: "Server error" });
  }
});

router.get("/view/:id", async (req, res) => {
  try {
    const contactId = req.params.id;

    const [result] = await (
      await db
    ).query("SELECT * FROM contacts WHERE contact_id = ?", [contactId]);

    if (result.length < 1) {
      res.json({ message: "No contacts with this id" });
    } else {
      res.json({ result });
    }
  } catch (error) {
    return res.json({ error, message: "Server error" });
  }
});

router.patch("/edit", async (req, res) => {
  try {
    const { ctcID, name, lastname, email, number, description } = req.body;

    const [update] = await (
      await db
    ).query(
      "UPDATE contacts SET contact_name = ?, contact_lastname = ?, contact_email = ?, contact_number = ?, contact_description = ? WHERE contact_id = ?",
      [name, lastname, email, number, description, ctcID]
    );

    if (update.affectedRows < 1) {
      res.send({ ok: false, message: "Unexpected error, try again" });
    } else {
      res.json({ ok: true });
    }
  } catch (error) {
    return res.json({ error, message: "Server error" });
  }
});

router.delete("/del/:id", async (req, res) => {
  try {
    const contactID = req.params.id;

    const [deleted] = await (
      await db
    ).query("DELETE FROM contacts WHERE contact_id = ?", [contactID]);

    if (deleted.affectedRows == 1) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false });
    }
  } catch (error) {
    return res.json({ error, message: "Server error" });
  }
});

module.exports = router;
