import "./Shelf.css";

export function Shelf({ books, numBooks = 21, shelf, lastTable = false }) {
  const randomColor = () => {
    const colors = ["#E1B07E", "#a4303f", "#028090", "#a09be7", "#0D1B2A"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="table">
      {books
        .slice((shelf - 1) * numBooks, shelf * numBooks)
        .map((book, idx) => {
          const asignedColor = randomColor();

          return (
            <div
              className={`book book-color ${asignedColor}`}
              id={book.book_id}
              key={`book_${book.id}_${idx}`}
              style={{ backgroundColor: asignedColor }}
            >
              <p className={`id book-color ${asignedColor}`} id={book.book_id}>
                {/* book-color ${asignedColor} */}
                {book.book_id}
              </p>
            </div>
          );
        })}
    </div>
  );
}
