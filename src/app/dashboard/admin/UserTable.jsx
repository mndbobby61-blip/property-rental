export default function Pagination({
  page,
  setPage,
}) {
  return (
    <div className="flex gap-3">

      <button
        onClick={()=>
          setPage(page-1)
        }
      >
        Prev
      </button>

      <button
        onClick={()=>
          setPage(page+1)
        }
      >
        Next
      </button>

    </div>
  );
}