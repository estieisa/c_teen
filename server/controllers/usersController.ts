const nodemailer = require("nodemailer");
require("dotenv").config();
import {  Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { bucket, db } from "..";

import { checkAdminStatus } from "../middleWare/authorization";
const expiresIn = 15 * 60 * 60 * 1000; //15 h

export const signInUser = async (req: any, res: Response) => {
  try {
    // Get the ID token passed
    const idToken = req.headers?.["authorization"]?.split(" ");
    // Create the session cookie.
    if (idToken) {
      await getAuth()
        .createSessionCookie(idToken[1], { expiresIn })
        .then(
          (sessionCookie) => {
            req.cookies.session = sessionCookie;
            // Set cookie policy for session cookie.
            const options = { maxAge: expiresIn, httpOnly: true, secure: true };
            res.cookie("session", sessionCookie, options);
          },
          (error) => {
            res.status(401).send("unauthorization");
          }
        );

      const isAdmin = await checkAdminStatus(req);
      // res.end(JSON.stringify({ status: "login successfully", isAdmin }));
    }
  } catch (err) {
    res.status(401).send(err + "unauthorization");
  }
};

export const signUpUser = async (req: any, res: Response) => {
  const { phoneNumber, firstName, lastName, gender, grade, userId } = req.body;
  try {
    const file = bucket.file(`usersImages/${req.file.originalname}`);
    // Upload the file to Firebase Storage
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
      public: true,
      validation: "md5",
    });
    stream.on("error", (error) => {
      res.status(500).send("Error uploading the file: " + error);
    });

    // Handle stream finish (upload completed successfully)
    stream.on("finish", () => {
      const downloadURL = file.publicUrl();
      console.log("downloadURL", downloadURL);

      getAuth()
        .updateUser(userId, {
          phoneNumber,
          displayName: `${firstName} ${lastName}`,
          photoURL: downloadURL,
          disabled: false,
        })
        .then((userRecord) => {
          db.collection("users").doc(userRecord.uid).set({
            grade,
            gender,
          });
          const idToken = req.headers?.["authorization"]?.split(" ");
          // getAuth()
          //   .verifyIdToken(idToken[1])
          //     .then((claims) => {
          //     if (
          //       typeof claims.email !== "undefined" &&
          //       claims.email.endsWith("@admin.com")
          //     ) {
          //       getAuth().setCustomUserClaims(claims.sub, {
          //         admin: true,
          //       });
          //     } else {
          //       console.log('error admin')
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
          // Create the session cookie.
          if (idToken) {
            getAuth()
              .createSessionCookie(idToken[1], { expiresIn })
              .then(
                (sessionCookie) => {
                  // Set cookie policy for session cookie.
                  const options = {
                    maxAge: expiresIn,
                    httpOnly: true,
                    secure: true,
                  };
                  res.cookie("session", sessionCookie, options);
                  res.end(JSON.stringify({ status: "login successfully" }));
                },
                (error) => {
                  res.status(401).send("unauthorization");
                }
              );
          }
        })
        .catch((err) => {
          return res.status(401).send(err + "unauthorization");
        });
    });
    stream.end(req.file.buffer);
  } catch (err: any) {
    res.status(401).send(err + "unauthorization");
  }
};

export const signOutUser = async (req: Request, res: Response) => {
  // res.clearCookie("session", { domain: 'http://localhost:3000', path: 'http://localhost:3000' });
  res.clearCookie("session");
  res.status(200).send("logout");
};

export const userProfile = async (req: any, res: Response) => {
  const userId = req.user.uid;
  if (userId) {
    const reqDoc = await db.collection("users").doc(userId).get();
    const usersData = reqDoc.data();
    const gender = usersData?.gender;
    const grade = usersData?.grade;
    const events = usersData?.events;
    await getAuth()
      .getUser(userId)
      .then((user) => {
        return res.status(200).send({ user, gender, grade, events });
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  } else {
    return res.status(401).send("unauthorization");
  }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const authUsers = await getAuth().listUsers(1000);
    const usersData = await Promise.all(
      authUsers.users.map(async (user: any) => {
        const authUserData = user.toJSON();

        // Fetch additional user details from Firestore collection
        const firestoreUserData = await db
          .collection("users")
          .doc(authUserData.uid)
          .get();

        const userDetail = firestoreUserData.exists
          ? firestoreUserData.data()
          : { gender: "", grade: "", events: [] };
        return {
          user: {
            uid: authUserData.uid,
            email: authUserData.email,
            phoneNumber: authUserData.phoneNumber,
            displayName: authUserData.displayName,
            photoURL: authUserData.photoURL,
            isAdmin: (await authUserData?.customClaims) ? true : false,
          },
          gender: userDetail?.gender,
          grade: userDetail?.grade,
          events: userDetail?.events,
        };
      })
    );

    return res.status(200).json(usersData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateEventsUser = async (req: any, res: Response) => {
  const userId = req?.user?.uid;
  const { post } = req.body;
  const postId = post.id;
  const doc = await db.collection("users").doc(userId).get();

  try {
    const postExists = doc
      .data()
      ?.events?.some((event: any) => event.id === postId);
    const postGenderExists = post.gender.includes(doc.data()?.gender);
    const postGradeExists = post.grade.includes(doc.data()?.grade);

    if (!(postGenderExists && postGradeExists)) {
      return res.status(400).send("No match - gender and grade mismatch.");
    } else if (postExists) {
      return res.status(400).send("Post with this ID is already registered.");
    } else {
      const existingEvents = doc.data()?.events || [];
      existingEvents.push(post);
      await db.collection("users").doc(userId).update({
        events: existingEvents,
      });
      return res.status(200).send(existingEvents);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error.");
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const userId = req?.user?.uid;
    const data = req.body;
    if (Object.keys(data).length === 0) {
      const file = bucket.file(`usersImages/${req.file.originalname}`);
      // Upload the file to Firebase Storage
      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
        public: true,
        validation: "md5",
      });
      stream.on("error", (error) => {
        res.status(500).send("Error uploading the file: " + error);
      });

      // Handle stream finish (upload completed successfully)
      stream.on("finish", () => {
        const downloadURL = file.publicUrl();
        console.log("downloadURL", downloadURL);
        getAuth().updateUser(userId, {
          photoURL: downloadURL,
        });
        return res.status(200).send("Profile picture updated successfully.");
      });
      stream.end(req.file.buffer);
    } else {
      const { email, phoneNumber, firstName, lastName, gender, grade, events } =
        data;
      const updateUser = await getAuth().updateUser(userId, {
        email,
        phoneNumber,
        displayName: `${firstName} ${lastName}`,
        disabled: false,
      });

      await db
        .collection("users")
        .doc(userId)
        .set({
          grade,
          gender,
          events: events || [],
        });
      return res.status(200).send("Profile updated successfully.");
    }
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

export const deleteEventUser = async (req: any, res: Response) => {
  const userId = req?.user?.uid;
  const { post } = req.body;
  const postId = post.id;

  try {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).send("User not found.");
    }

    const existingEvents = userDoc.data()?.events || [];
    const updatedEvents = existingEvents.filter(
      (event: any) => event.id !== postId
    );

    await userDocRef.update({
      events: updatedEvents,
    });

    return res.status(200).send(updatedEvents);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error.");
  }
};

export const deleteUser = async (req: any, res: Response) => {
  const { userId } = req.body;
  try {
    const userDocRef = db.collection("users").doc(userId);

    await userDocRef.delete();

    await getAuth().deleteUser(userId);

    return res.status(200).send("User deleted successfully.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error.");
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const getUserByEmail = await getAuth().getUserByEmail(email);
  const displayName = getUserByEmail.displayName;
  const actionCodeSettings = {
    url: "http://localhost:3000/",
    // This must be true for email link sign-in.
    handleCodeInApp: true,
  };
  try {
    getAuth()
      .generatePasswordResetLink(email, actionCodeSettings)
      .then((link) => {
        const emailBody = `
      <p>Hello ${`${displayName}` || "User"},</p>
      <p>You've requested a password reset for your account.</p>
      <p>To reset your password, click the link below:</p>
      <a href="${link}">Reset Password</a>
      <p>If you didn't request a password reset, you can safely ignore this email.</p>
    `;
        // Construct password reset email template, embed the link and send
        // using custom SMTP server.
        return sendCustomPasswordResetEmail(
          res,
          email,
          "Reset password for c teen site",
          emailBody
        );
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error("Error sending password reset email: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function sendCustomPasswordResetEmail(
  res: any,
  userEmail: string,
  subject: string,
  emailBody: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        // Trust self-signed certificates
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "cteen@gmail.com",
      to: userEmail,
      subject: subject,
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json("Password reset email sent successfully.");
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending custom password reset email:", error);
  }
}
