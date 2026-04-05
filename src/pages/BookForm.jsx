import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import useFetch from '../hooks/useFetch';
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function BookForm() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [categories, setCategories] = useState("");
  let [newCategories, setNewCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState(null);
  let [body, setBody] = useState("");
  let navigate = useNavigate();
  let addCategory = (e) => {
    if (!categories.trim()) return;
    setNewCategories((prevState) => [categories, ...prevState]);
    setCategories("");
  };
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      let ref = doc(db, "books", id);
      onSnapshot(ref, (doc) => {
        let { title, categories, description, body } = doc.data();
        setTitle(title);
        setDescription(description);
        setBody(body);
        setNewCategories(categories);
      });
    } else {
      setIsEdit(false);
      setTitle("");
      setDescription("");
      setBody("");
      setNewCategories([]);
    }
  }, [id]);

  // let {setPostData, data : book, loading} = useFetch('http://localhost:3001/books',"POST")
  let { updateDocument, addDocument } = useFirestore();
  let { user } = useContext(AuthContext);
  let uploadToFirebase = async (file) => {
    let fileName = Date.now().toString() + "_" + file.name;
    let filePath = "/covers/" + user.uid + "/" + fileName;
    let storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);

  };
  let submitForm = async (e) => {
    e.preventDefault();
    let url = await uploadToFirebase(file);
    let data = {
      title,
      description,
      categories: newCategories,
      body,
      uid: user.uid,
      cover: url,
    };
    // setPostData(data)
    if (isEdit) {
      await updateDocument("books", id, data);
    } else {
      await addDocument("books", data);
    }
    //firebase store
    navigate("/");
  };

  // useEffect(()=>{
  //   if(book){
  //     navigate('/')
  //   }
  // },[book])

  let handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  let handlePreviewImg = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };
  useEffect(() => {
    if (file) {
      handlePreviewImg(file);
    }
  }, [file]);
  return (
    <div className="flex justify-center h-screen">
      <form className="w-full max-w-lg" onSubmit={submitForm}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Book Cover Image
            </label>
            <input
              onChange={handleFile}
              type="file"
              accept="image/*"
              className="
                      w-full
                      text-sm text-slate-600 dark:text-slate-300
                      file:mr-4 file:rounded-xl file:border-0
                      file:px-4 file:py-2 file:text-sm file:font-semibold
                      file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200
                      dark:file:bg-slate-900 dark:file:text-slate-200 dark:hover:file:bg-slate-800
                      file:shadow-sm
                    "
            />
            {!!preview && (
              <img src={preview} alt="" className="my-2 h-100 w-full" />
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Book Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Write book title"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Write description"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Content
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.currentTarget.value)}
              className="appearance-none block w-full h-55 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Write content"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Categories
            </label>
            <div className="flex justify-center items-center gap-2">
              <input
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Write Book's Categories"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-primary rounded-2xl h-full mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {newCategories.map((c) => (
            <span
              key={c}
              className=" text-white bg-primary rounded-full py-1 px-1 mt-1 text-sm"
            >
              {c}
            </span>
          ))}
        </div>
        <button className="bg-primary text-white rounded-2xl px-3 py-2 flex gap-1 w-full justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <span className="hidden md:block">
            {isEdit ? "Update" : "Create"} Book
          </span>
        </button>
      </form>
    </div>
  );
}
