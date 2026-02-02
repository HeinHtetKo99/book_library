import bookcover from "../../assets/bookcover.jpg";
// import useFetch from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useFirestore from "../../hooks/useFirestore";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function BookLists() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let search = params.get("search");

  let { getCollection, deleteDocument, updateDocument } = useFirestore();
  let {user} = useContext(AuthContext)
  let { data: books, error, loading } = getCollection("books",['uid','==',user.uid],{
    field : 'title',
    value : search
  });

  let deleteBook = async (id) => {
    deleteDocument("books", id);
  };

  if (error) {
    return <p>{error}</p>;
  }

  let { isDark } = useTheme();

  return (
    <div className="py-4">
      {loading && (
        <div className="py-10 flex justify-center">
          <div
            className={`px-4 py-2 rounded-full text-sm border ${
              isDark ? "text-white border-white/20" : "text-gray-700 border-gray-200"
            }`}
          >
            Loading...
          </div>
        </div>
      )}

      {!!books && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {books.map((book) => (
            <div
              key={book.id}
              className={`group overflow-hidden rounded-3xl border transition-all duration-200 ${
                isDark
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-gray-200 bg-white hover:shadow-lg"
              }`}
            >
              {/* Image + overlay actions */}
              <div className="relative">
                <img
                  src={book.cover}
                  alt=""
                  className="w-full h-52 object-cover"
                />

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark ? "bg-black/35" : "bg-black/20"
                  }`}
                />

                <div className="absolute top-3 right-3 flex gap-2">
                  <Link
                    to={`/edit/${book.id}`}
                    className={`p-2 rounded-2xl backdrop-blur border transition ${
                      isDark
                        ? "border-white/20 bg-white/10 hover:bg-white/20"
                        : "border-white/40 bg-white/70 hover:bg-white"
                    }`}
                    title="Edit"
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
                  </Link>

                  <button
                    onClick={() => deleteBook(book.id)}
                    className={`p-2 rounded-2xl backdrop-blur border transition ${
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

                {/* title badge */}
                <div className="absolute left-3 bottom-3 right-3">
                  <div
                    className={`inline-flex max-w-full px-3 py-1.5 rounded-2xl backdrop-blur border ${
                      isDark
                        ? "border-white/20 bg-black/35 text-white"
                        : "border-white/40 bg-white/70 text-gray-900"
                    }`}
                  >
                    <h1 className="font-semibold text-base truncate">{book.title}</h1>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-white/80" : "text-gray-600"
                  }`}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {book.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {book.categories.map((c, i) => (
                    <span
                      key={i}
                      className={`rounded-full px-3 py-1 text-xs border ${
                        isDark
                          ? "text-white border-white/15 bg-white/5"
                          : "text-white border-gray-200 bg-primary"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  to={`/books/${book.id}`}
                  className={`w-full mt-1 inline-flex justify-center items-center gap-2 rounded-2xl px-4 py-2.5 font-semibold transition ${
                    isDark
                      ? "bg-primary text-white hover:opacity-90"
                      : "bg-primary text-white hover:opacity-90"
                  }`}
                >
                  Read Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {books && !books.length && (
        <div className="py-16 flex justify-center">
          <div
            className={`text-center rounded-3xl border px-6 py-8 max-w-xl w-full ${
              isDark ? "border-white/10 text-white/80" : "border-gray-200 text-gray-600"
            }`}
          >
            <p className="text-2xl md:text-3xl font-bold mb-2">No results</p>
            <p className="text-sm">
              {search ? `No books found for “${search}”.` : "No books to show yet."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
