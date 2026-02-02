import NoteForm from "./NoteForm";
import "./BookDetails.css";
import { Link, useParams } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import { db } from "../../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import useFirestore from "../../hooks/useFirestore";
import NoteLists from "./NoteLists";
export default function BookDetails() {
  let { id } = useParams();
  // let {data : book,error,loading} = useFetch(`http://localhost:3001/books/${id}`)
  let { getDocument } = useFirestore();
  let { data: book, error, loading } = getDocument("books", id);

  return (
    <div>
      <Link to="/" className="back-btn">
        ← Back to Library
      </Link>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {book && (
        <>
          <main className="book-detail-wrapper">
            <div className="book-info">
              <h1 className="book-title">{book.title}</h1>
              <div className="flex flex-wrap gap-2">
                {book.categories.map((c) => (
                  <span
                    key={c}
                    className=" text-white bg-primary rounded-full py-1 px-1 mt-1 text-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="description-section m-4 p-2 space-y-3">
                <h3>{book.description}</h3>
                <p>{book.body}</p>
              </div>
            </div>
          </main>
          <div>
            <h3 className="font-bold text-xl text-primary my-3 text-center">
              My Notes
            </h3>
            <NoteForm id={id}/>
            <NoteLists id={id}/>
          </div>
        </>
      )}
    </div>
  );
}
