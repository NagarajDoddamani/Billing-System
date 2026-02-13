function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-[#F9FBFD] p-6 rounded-2xl shadow-md hover:shadow-xl transition">

      <h3 className="text-xl font-bold text-[#2872A1] mb-2">
        {product.name}
      </h3>

      <p className="text-gray-600 mb-4">
        ₹ {product.price}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(product)}
          className="border border-[#2872A1] text-[#2872A1] px-4 py-2 rounded-xl hover:bg-[#2872A1] hover:text-white transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product._id)}
          className="border border-red-400 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
