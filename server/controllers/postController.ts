import { Request, Response } from "express";
import { bucket, db } from "../index";
import { uploadFileToStorage } from "../middleWare/uploadFileToStorage";

export const newPost = async (req: any, res: Response) => {
  try {
    const { title, description, grade, gender, category, date } = req.body;
    const reqFile = req.file;

    if (!reqFile) {
      return res.status(400).json({ status: "failed", msg: "No file provided" });
    }

    const file = bucket.file(`postsImages/${reqFile.originalname}`);
    const downloadURL = await uploadFileToStorage(file, reqFile);
    console.log(downloadURL);
    // Create a post document in Firestore
    const postRef = await db.collection("posts").add({
      title,
      description,
      grade,
      gender,
      category,
      image: downloadURL,
      date,
    });

    res.json({ message: "Post uploaded successfully!", postId: postRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", msg: error });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await db.collection("posts").get();

    let postsArr: object[] = [];
    allPosts.forEach((doc) => {
      const docData = doc.data();
      const docId = doc.id;
      docData.id = docId;
      postsArr.push(docData);
    });
    res.send({ postsArr });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "An error occurred while fetching posts." });
  }
};

// export const getPost = async (req: Request, res: Response) => {
//   try {
//     const reqDoc = db.collection("posts").doc(req.params.id);
//     const postDetails = await reqDoc.get();
//     const response = postDetails.data();
//     return res.status(200).send({ status: "success", data: response });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ status: "faild", msg: error });
//   }
// };

export const updatePostUsers = async (req: any, res: Response) => {
  const userId = req?.user?.uid;
  const { post } = req.body;
  const postId = post.id;
  const postDoc = await db.collection("posts").doc(postId).get();
  const userDoc = await db.collection("users").doc(userId).get();
  try {
    const userExists = postDoc
      .data()
      ?.users?.some((user: any) => user === userId);
    const postGenderExists = post.gender.includes(userDoc.data()?.gender);
    const postGradeExists = post.grade.includes(userDoc.data()?.grade);
    if (!(postGenderExists && postGradeExists)) {
      return res.status(400).send("No match - gender and grade mismatch.");
    } else if (userExists) {
      return res.status(400).send("Post with this ID is already registered.");
    } else {
      const existingUsers = postDoc.data()?.users || [];
      existingUsers.push(userDoc.id);
      await db.collection("posts").doc(postId).update({
        users: existingUsers,
      });
      return res.status(200).send(existingUsers);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (req: any, res: Response) => {
  const { postId } = req.body;
  const userId = req?.user?.uid;

  try {
    const postDocRef = db.collection("posts").doc(postId);

    // Delete the post document
    await postDocRef.delete();

    // Remove the post ID from the user's events array
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const updatedEvents = userData?.events?.filter(
        (event: any) => event.id !== postId
      );
      await userDocRef.update({ events: updatedEvents });
    } else {
      console.error("User not found.");
      return res.status(404).send("User not found.");
    }

    return res.status(200).send("Post deleted successfully.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error.");
  }
};

// type ScheduleOptions = {
//   oneTimeDate?: Date;
//   dayOfWeek?: number;
//   hour: number;
//   minute: number;
// };

// export const schedulePost = (options: ScheduleOptions, postContent: any) => {
//   const createPost = async () => {
//     // Create a new document in the 'posts' collection with the specified content
//     await db
//       .collection("posts")
//       .add(postContent)
//       .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//       })
//       .catch((error) => {
//         console.error("Error adding document: ", error);
//       });
//   };

//   if (options.oneTimeDate) {
//     const now = new Date();
//     const timeUntilEvent = options.oneTimeDate.getTime() - now.getTime();
//     if (timeUntilEvent > 0) {
//       createPost();
//     } else {
//       console.error("Specified date has already passed.");
//     }
//   } else if (options.dayOfWeek !== undefined) {
//     const now = new Date();
//     const targetDay = options.dayOfWeek;
//     const targetTime = new Date(now);
//     targetTime.setHours(options.hour);
//     targetTime.setMinutes(options.minute);
//     targetTime.setSeconds(0);
//     targetTime.setMilliseconds(0);
//     console.log(targetTime);

//     let timeUntilNextTargetDay = targetDay - now.getDay();
//     if (timeUntilNextTargetDay <= 0) {
//       timeUntilNextTargetDay += 7;
//     }

//     const timeUntilTargetTime = targetTime.getTime() - now.getTime();
//     const initialDelay =
//       timeUntilNextTargetDay * 24 * 60 * 60 * 1000 + timeUntilTargetTime;
//     createPost();
//     setTimeout(function () {
//       setInterval(createPost, 7 * 24 * 60 * 60 * 1000); // 1 week in milliseconds
//     }, initialDelay);
//   } else {
//     console.error("Invalid options provided.");
//   }
// };

// Example usage: Schedule a post every Friday at 3:00 PM
// schedulePost({ dayOfWeek: 5, hour: 15, minute: 0 }, { content: 'Your post content' });

// Example usage: Schedule a one-time post for a specific date and time
// const oneTimeDate = new Date('2023-09-01T15:00:00');
// schedulePost({ oneTimeDate, hour: 15, minute: 0 }, { content: 'Your one-time post content' });


