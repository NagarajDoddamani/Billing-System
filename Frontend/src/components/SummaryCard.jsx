function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#F4F8FB] p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      <h3 className="text-sm text-gray-500 mb-2">
        {title}
      </h3>
      <p className="text-2xl font-bold text-[#2872A1]">
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;
