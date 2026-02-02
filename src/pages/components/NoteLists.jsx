import React, { useEffect, useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import moment from "moment";
import useTheme from "../../hooks/useTheme";
import NoteForm from "./NoteForm";

export default function NoteLists({ id }) {
  let { getCollection } = useFirestore();
  let { data: notes } = getCollection("notes", ["uid", "==", id]);
  let [isEdit, setIsEdit] = useState(null)
  let { isDark } = useTheme();
  let { deleteDocument } = useFirestore();
  let deleteNote = async (id) => {
    await deleteDocument("notes", id);
  };

  
  return (
    !!notes.length &&
    notes.map((note) => (
      <div key={note.id} className="border-2 shadow-md p-3 my-3">
        <div className="flex items-start space-x-3">
          <img
            src="https://static.vecteezy.com/system/resources/previews/056/673/911/non_2x/businessman-avatar-in-circle-icon-businessman-profile-avatar-illustration-vector.jpg"
            alt=""
            className="w-12 h-12 rounded-full"
          />

          <div className="flex-1">
            <h3>Hein Htet Ko</h3>
            <div className="text-gray-400">
              {moment(note?.date?.seconds * 1000).fromNow()}
            </div>
          </div>
          <button
            onClick={()=>setIsEdit(note)}
            type="button"
            className={`p-2 rounded-2xl backdrop-blur border transition cursor-pointer ${
              isDark
                ? "border-white/20 bg-white/10 hover:bg-white/20"
                : "border-white/40 bg-white/70 hover:bg-white"
            }`}
            title="edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="blue"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            type="button"
            className={`p-2 rounded-2xl backdrop-blur border transition cursor-pointer ${
              isDark
                ? "border-white/20 bg-white/10 hover:bg-white/20"
                : "border-white/40 bg-white/70 hover:bg-white"
            }`}
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>

        <div className="mt-3">
          {isEdit?.id !== note.id && note.body }
          {isEdit?.id === note.id && <NoteForm setIsEdit={setIsEdit} type='update' isEdit={isEdit}/>}
          </div>
      </div>
    ))
  );
}
