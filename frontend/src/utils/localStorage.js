import { v4 as uuidv4 } from "uuid";
export const createLocalDraft = () => {
  const draft = { id: uuidv4(), title: "untitled letter", text: "" };
  const drafts = localStorage.getItem('drafts');
  if(drafts){
    localStorage.setItem("drafts", JSON.stringify(drafts.push(draft)));

  }else{
    localStorage.setItem("drafts", JSON.stringify([draft]));

  }
  return draft.id
};
export const getDrafts = () => {
  const drafts = JSON.parse(localStorage.getItem("drafts"));
  return drafts
};
export const updateDraftTitle = (id, data) => {
  const drafts = JSON.parse(localStorage.getItem("drafts"));
  const draft = drafts.find((draft)=>draft.id ===id);
  draft.title += data;
};

export const updateDraftText = (id, data) => {
  const drafts = JSON.parse(localStorage.getItem("drafts"));
  const draft = drafts.find((draft)=>draft.id ===id);
  draft.text += data;
};

