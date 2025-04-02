import Draft from "../models/draft.model.js";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { userGoogleId, name, title, text } = req.body;

    let user = await User.findOne({ userGoogleId });

    let draft;

    // If a draft has valid title and text, create it
    if (title && text) {
      draft = new Draft({ title, text });
      await draft.save();
    } else {
      draft = new Draft({});
      await draft.save();
    }

    if (user) {
      // If user exists, just update their drafts array
      user.drafts.push(draft._id);
      await user.save();
      return res.status(200).json({
        message: "User exists. Draft created successfully.",
        draft,
        user,
      });
    } else {
      // If user does not exist, create a new user with the draft
      user = new User({ userGoogleId, name, drafts: [draft._id] });
      await user.save();
      return res.status(200).json({
        message: "User does not exist. Draft created successfully.",
        draft,
        user,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


//update the existing draft in the editor
export const updateDraft = async (req, res) => {
  try {
    const { draftId, text, title } = req.body;
    if (!draftId)
      return res.status(400).json({ error: "error draftId cannot be empty" });
    const existingDraft = await Draft.findOne({ _id: draftId });
    if (!existingDraft) {
      return res.status(404).json({ error: "Content not found" });
    }
    // console.log(existingDraft);
    if (text) {
      existingDraft.text = text;
      await existingDraft.save();
    }

    if (title) {
      existingDraft.title = title;
      await existingDraft.save();
    }

    res.status(201).json({
      message: "draft updated successfully",
      draft: existingDraft,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDrafts = async (req, res) => {
  //in this route u were working last map is not returning data desired
  try {
    const { userGoogleId } = req.params;
    const user = await User.findOne({ userGoogleId });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const drafts = user.drafts;
    const result = await Promise.all(
      drafts.map((draftId) => {
        const draft = Draft.findOne({ _id: draftId });

        return draft;
      }),
    );
    res.status(200).json({
      message: "drafts fetched successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// i will fix it later
export const getDraft = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const content = await Content.findById(id);
    console.log("content:", content);
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
