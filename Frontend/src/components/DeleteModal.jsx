function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2872A1] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-80 text-center shadow-2xl">
        <h2 className="text-lg font-bold text-red-500 mb-6">
          Delete Company?
        </h2>

        <p className="text-gray-500 mb-6 text-sm">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
