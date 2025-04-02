
import { v4 as uuidv4 } from "uuid";


export const createLocalDraft = () => {
  const draft = { id: uuidv4(), title: "untitled letter", text: "" };
  const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
  drafts.push(draft);
  localStorage.setItem('drafts', JSON.stringify(drafts));
  return draft.id
};


export const getDrafts = () => {
  const drafts = JSON.parse(localStorage.getItem("drafts"));
  return drafts
};


// update draft title
export const updateDraftTitle = (id, data) => {
  const drafts = JSON.parse(localStorage.getItem("drafts"));
 drafts.forEach(draft => {
   if(draft.id === id){
     draft.title = data
   }
 })
  localStorage.setItem("drafts", JSON.stringify(drafts));
};

export const updateDraftText = (id, data) => {
  const drafts = JSON.parse(localStorage.getItem("drafts"));
   drafts.forEach(draft => {
     if(draft.id === id){
       draft.text = data
     }
   })
  localStorage.setItem("drafts", JSON.stringify(drafts))
};

