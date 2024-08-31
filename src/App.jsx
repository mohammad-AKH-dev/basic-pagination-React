import { useEffect,  useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);
  const rows = 10;
  let pageNumbers;
  let end = currentPage * rows;
  let start = end - rows;


  function changePaginate(newPage) {
      setCurrentPage(newPage)
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos([...datas]);
        setIsPending(false);
        setPaginatedTodos([...datas].slice(start, end))
      });
  }, []);
  const pageCount = todos.length / rows;
  pageNumbers = Array.from(Array(pageCount).keys());

  useEffect(() => {
    setPaginatedTodos([...todos].slice(start, end));
  }, [currentPage]);
  
  
  return (
    <div>
      {isPending ? (
        "...Loading"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTodos?.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>
                  <p
                    className={`${
                      todo.completed ? "btn btn-success" : "btn btn-danger"
                    }`}
                  >
                    {todo.completed ? "completed" : "...not completed"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <nav>
        <ul className="pagination pagination-sm justify-content-center gap-2">
          {pageNumbers.length &&
            pageNumbers.map((page) => (
              <li
                style={{cursor:'pointer'}}
                className={`page-item ${
                  page + 1 === currentPage ? "active" : ""
                }`}
                key={page}
                onClick={()=> changePaginate(page + 1)}
              >
                <a className="page-link">{page + 1}</a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
