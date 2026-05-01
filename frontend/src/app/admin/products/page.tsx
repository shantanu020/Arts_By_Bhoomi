import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default function AdminProductsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-1">Products</h1>
          <p className="text-sm text-text-muted">Manage your store inventory</p>
        </div>
        <button className="bg-text-main text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-black transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white border border-secondary rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {[
                { title: "Serenity in Blue", cat: "Paintings", price: 15000, stock: 1 },
                { title: "Charcoal Portrait", cat: "Sketches", price: 5000, stock: 0 },
                { title: "Abstract Flow", cat: "Digital", price: 3000, stock: -1 }, // -1 implies unlimited for digital
              ].map((item, i) => (
                <tr key={i} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded overflow-hidden relative">
                       {/* Placeholder for actual image */}
                       <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">IMG</div>
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </td>
                  <td className="px-6 py-4 text-text-muted">{item.cat}</td>
                  <td className="px-6 py-4">₹{item.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    {item.stock > 0 ? (
                      <span className="text-green-600 font-medium">{item.stock} in stock</span>
                    ) : item.stock === 0 ? (
                      <span className="text-red-500 font-medium">Out of stock</span>
                    ) : (
                      <span className="text-blue-500 font-medium">Unlimited</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-text-muted hover:text-text-main transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
