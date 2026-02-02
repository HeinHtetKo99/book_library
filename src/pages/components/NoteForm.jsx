import React, { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";

export default function NoteForm({ id,setIsEdit,type='create',isEdit }) {
  let [body, setBody] = useState('');
  let { addDocument ,updateDocument } = useFirestore();
  let submitNote = (e) => {
    e.preventDefault();
    if(type === 'create'){
      let data = {
      body,
      uid: id,
    };
    addDocument("notes", data);
    setBody("");
    }else{
      isEdit.body = body
      updateDocument('notes',isEdit.id,isEdit,false)
      setIsEdit(null)
    }
  };

  useEffect(()=>{
    if(type === 'update'){
      setBody(isEdit?.body)
    }
  },[type])
  return (
    <form onSubmit={submitNote}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="p-3 shadow-md border-2 bg-gray-50 w-full"
        name=""
        id=""
        cols="30"
        rows="5"
      ></textarea>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="text-white bg-primary px-3 py-2 rounded-lg my-3 flex items-center gap-1"
        >
          <span>{type === 'create'? 'Add' : 'Update'}Note</span>
        </button>
        {type === 'update' && <button
          onClick={()=>setIsEdit(null)}
          type="button"
          className="text-primary bg-white border border-primary px-3 py-2 rounded-lg my-3 flex items-center gap-1"
        >
          <span>Cancel</span>
        </button>}
      </div>
    </form>
  );
}
