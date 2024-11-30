import { Router } from "express";
import jwt from "jsonwebtoken";
import db from "../database/db.js";
import bcrypt from "bcrypt";
const mySecretCode = crypto.randomUUID();

//  ROUTER
const router = Router();

const verify = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.json({ log: false, message: "No token" });
  } else {
    jwt.verify(token, mySecretCode, (err, data) => {
      if (err) return res.json({ log: false, message: "Token error" });
      req.userID = data.id;
      next();
    });
  }
};

router.get("/verify", verify, (req, res) => {
  if (req.userID) {
    res.json({ log: true });
  } else {
    return res.json({ log: false });
  }
});

router.get("/", verify, async (req, res) => {
  try {
    (await db)
      .query("SELECT * FROM contacts WHERE user_id = ?", [req.userID])
      .then((ms) => {
        if (ms[0].length < 1) {
          return res.json({ message: "insertion error" });
        } else {
          if (ms[0].length < 1) {
            res.json({ one: false });
          } else {
            res.json({ one: true, data: ms[0] });
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = crypto.randomUUID();
    (await db)
      .query("SELECT * FROM users WHERE user_email = ?", [email])
      .then(async (ms) => {
        if (ms[0].length < 1) {
          const newPassword = await bcrypt.hash(password, 10);
          (await db)
            .query(
              "INSERT INTO users(user_id, user_name, user_email, user_password) VALUES (?,?,?,?)",
              [userId, name, email, newPassword]
            )
            .then((ms2) => {
              if (ms2[0].affectedRows == 1) {
                const token = jwt.sign({ id: userId }, mySecretCode, {
                  expiresIn: "1h",
                });
                res.json({ log: true, token });
              } else {
                res.json({ log: false });
              }
            });
        } else {
          res.json({ log: false, message: "Email already registred" });
        }
      });
  } catch (error) {
    res.json({ log: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    (await db)
      .query("SELECT * FROM users WHERE user_email = ?", [email])
      .then((ms) => {
        if (ms[0].length < 1) {
          return res.json({ log: false, message: "User not found" });
        } else {
          const passVerify = bcrypt.compare(
            password,
            ms[0][0]["user_password"],
            (err, result) => {
              if (err) {
                return res.json({ log: false, message: err });
              }
              if (result) {
                const token = jwt.sign(
                  { id: ms[0][0]["user_id"] },
                  mySecretCode,
                  { expiresIn: "1h" }
                );
                res.json({ log: true, token });
              } else {
                res.json({ log: false, message: "Wrong password" });
              }
            }
          );
        }
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", verify, async (req, res) => {
  const { name, lastname, email, number, description } = req.body;
  (await db)
    .query(
      "INSERT INTO contacts (user_id, contact_name, contact_lastname, contact_email, contact_number, contact_description) VALUES (?,?,?,?,?,?)",
      [req.userID, name, lastname, email, number, description]
    )
    .then((ms) => {
      if (ms.affectedRows < 1) {
        return res.json({ ok: false, message: "try it again" });
      } else {
        res.json({ ok: true });
      }
    });
});

router.get("/view/:id", async (req, res) => {
  const contactId = req.params.id;

  const myReq = (await db)
    .query("SELECT * FROM contacts WHERE contact_id = ?", [contactId])
    .then((ms) => {
      res.json({ data: ms[0] });
    });
});

router.patch("/edit", async (req, res) => {
  try {
    const { ctcID, name, lastname, email, number, description } = req.body;
    await (await db)
      .query(
        "UPDATE contacts SET contact_name = ?, contact_lastname = ?, contact_email = ?, contact_number = ?, contact_description = ? WHERE contact_id = ?",
        [name, lastname, email, number, description, ctcID]
      )
      .then((ms) => {
        if (ms[0].affectedRows == 1) {
          res.json({ ok: true });
        } else {
          res.json({ ok: false });
        }
      });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/del/:id", async (req, res) => {
  try {
    const contactID = req.params.id;
    const myREq = await (await db)
      .query("DELETE FROM contacts WHERE contact_id = ?", [contactID])
      .then((ms) => {
        if (ms[0].affectedRows == 1) {
          res.json({ ok: true });
        } else {
          res.json({ ok: false });
        }
      });
  } catch (error) {
    res.json({ error });
  }
});

export default router;
