
import { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "2499",
    quantity: "15",
    description: "Premium wireless headphones with clear sound.",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Accessories",
    price: "3999",
    quantity: "10",
    description: "Smart watch with fitness tracking features.",
  },
  {
    id: 3,
    name: "Travel Backpack",
    category: "Fashion",
    price: "1499",
    quantity: "20",
    description: "Durable backpack for travel and everyday use.",
  },
];

const emptyForm = {
  name: "",
  category: "",
  price: "",
  quantity: "",
  description: "",
};

function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Select an existing product
  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    setMessage("");
    setIsEditing(false);

    const product = products.find(
      (item) => item.id === Number(id)
    );

    setFormData(
      product
        ? {
            name: product.name,
            category: product.category,
            price: String(product.price),
            quantity: String(product.quantity),
            description: product.description,
          }
        : emptyForm
    );
  };

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  // Enable editing
  const handleEdit = () => {
    if (!selectedId) {
      setMessage("Please select a product first.");
      return;
    }

    setIsEditing(true);
    setMessage("Edit the product details and save your changes.");
  };

  // Update product
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!selectedId) {
      setMessage("Please select a product first.");
      return;
    }

    setProducts((prev) =>
      prev.map((product) =>
        product.id === Number(selectedId)
          ? {
              ...product,
              ...formData,
              price: Number(formData.price),
              quantity: Number(formData.quantity),
            }
          : product
      )
    );

    setIsEditing(false);
    setMessage("Product updated successfully!");
  };

  const handleCancel = () => {
    const product = products.find(
      (item) => item.id === Number(selectedId)
    );

    setFormData(
      product
        ? {
            name: product.name,
            category: product.category,
            price: String(product.price),
            quantity: String(product.quantity),
            description: product.description,
          }
        : emptyForm
    );

    setIsEditing(false);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
            Inventory Control
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Product Management
          </h1>

          <p className="mt-2 text-slate-500">
            Select, edit, and update your existing products.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-white bg-white p-4 shadow-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
            📦
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Products</p>
            <p className="text-2xl font-black text-indigo-700">
              {products.length}
            </p>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-5">
        {/* Update Form */}
        <section className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-indigo-100/60 sm:p-8 lg:col-span-2">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white">
              ✎
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Update Product
              </h2>
              <p className="text-sm text-slate-500">
                Modify existing product details
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="productSelect"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Select Existing Product
            </label>

            <select
              id="productSelect"
              value={selectedId}
              onChange={handleSelect}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Choose a product...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Product Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
                placeholder="Enter product name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!isEditing}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Living">Home &amp; Living</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Price (₹)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                disabled={!isEditing}
                required
                placeholder="Enter product description"
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  disabled={!selectedId}
                  className="flex-1 rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  ✎ Edit Product
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-emerald-600 px-4 py-3.5 font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700"
                  >
                    ✓ Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-xl border border-slate-200 px-4 py-3.5 font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>

            {message && (
              <p
                role="status"
                className={`rounded-xl p-3 text-sm font-semibold ${
                  message.includes("successfully")
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    : message.includes("Edit the")
                      ? "border border-indigo-200 bg-indigo-50 text-indigo-700"
                      : "border border-amber-200 bg-amber-50 text-amber-700"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </section>

        {/* Product Inventory */}
        <section className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Current Inventory
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a product from the form to edit its details.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  handleSelect({ target: { value: String(product.id) } });
                }}
                className={`rounded-2xl border bg-white p-5 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
                  selectedId === String(product.id)
                    ? "border-indigo-500 ring-2 ring-indigo-200"
                    : "border-white"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                    📦
                  </span>
                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                    {product.category}
                  </span>
                </div>

                <h3 className="break-words text-lg font-extrabold text-slate-900">
                  {product.name}
                </h3>

                <p className="mt-2 min-h-10 break-words text-sm leading-5 text-slate-500">
                  {product.description}
                </p>

                <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="text-xl font-black text-indigo-600">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">Stock</p>
                    <p className="font-bold text-slate-800">
                      {product.quantity} units
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm font-bold text-indigo-600">
                  {selectedId === String(product.id)
                    ? "✓ Selected for editing"
                    : "Select to edit →"}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-10 text-center text-sm text-slate-500">
        Product Management System · React + Tailwind CSS
      </footer>
    </div>
  );
}

export default ProductManagement;
