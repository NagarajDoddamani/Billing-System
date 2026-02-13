import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(null);

  const companyId = localStorage.getItem("companyId");

  const fetchProducts = async () => {
    const { data } = await API.get(
      `/products?companyId=${companyId}`
    );
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (form) => {
    if (selectedProduct) {
      await API.put(`/products/${selectedProduct._id}`, form);
    } else {
      await API.post("/products", {
        ...form,
        companyId,
      });
    }

    setModalOpen(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  const confirmDelete = async () => {
    await API.delete(`/products/${deleteProduct._id}`);
    setDeleteProduct(null);
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-[#2872A1]">
          Products
        </h1>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#2872A1] text-white px-8 py-3 rounded-2xl font-semibold"
        >
          + Add Product
        </button>
      </div>

      <input
        type="text"
        placeholder="Search product..."
        className="w-full mb-8 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#2872A1] outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={(p) => {
              setSelectedProduct(p);
              setModalOpen(true);
            }}
            onDelete={(id) =>
              setDeleteProduct(products.find(p => p._id === id))}
          />
        ))}
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSave}
        selectedProduct={selectedProduct}
      />

      <DeleteModal
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={confirmDelete}
      />

    </div>
  );
}

export default Products;
