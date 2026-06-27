export default function PropertySearch({
  value,
  setValue,
}) {
  return (
    <input
      value={value}
      onChange={(e)=>
        setValue(
          e.target.value
        )
      }
      placeholder="Search..."
      className="
      border
      p-3
      rounded
      w-full
      "
    />
  );
}