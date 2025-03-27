import Content from "../models/content.model.js";

export const createContent = async (req, res) => {
  try {
    console.log('save content called');
    const { text, title } = req.body;
    const newContent = new Content({ text, title });
    await newContent.save();

    res.status(201).json({ message: "Content saved successfully", content: newContent });
    console.log('api hit properly')
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }


}

export const updateContent = async (req, res) => {
  try {
    const { contentId, text, title } = req.body;
    if (!contentId) return res.status(400).json({ error: 'error contentID cannot be empty' });
    const existingContent = await Content.findOne({ _id: contentId });
    if (!existingContent) {
      return res.status(404).json({ error: "Content not found" });
    }


    if (text) {

      existingContent.text = text
      existingContent.save();
    };

    if (title) {

      existingContent.title = title;
      existingContent.save();
    }



    res.status(201).json({ message: "Content updated successfully", content: existingContent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }


}


export const getContents = async (req, res) => {
  try {
    const getAllDocs = await Content.find();
    res.json(getAllDocs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getContent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id:', id);
    const content = await Content.findById(id);
    console.log('content:', content);
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}