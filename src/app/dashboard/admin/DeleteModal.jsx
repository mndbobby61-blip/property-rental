export default function DeleteModal({
  onDelete,
}) {
  return (
    <button
      onClick={onDelete}
      className="
      bg-red-500
      text-white
      px-4
      py-2
      rounded
      "
    >
      Delete
    </button>
  );
}