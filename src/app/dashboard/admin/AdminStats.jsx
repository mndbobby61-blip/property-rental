export default function AdminStats({
  title,
  value,
}) {
  return (
    <div className="border rounded-xl p-5">

      <h4 className="text-gray-500">
        {title}
      </h4>

      <h2 className="text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}