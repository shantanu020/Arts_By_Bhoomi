import { DollarSign, ShoppingBag, Eye, Clock } from "lucide-react";

export default function AdminDashboardOverview() {
  const stats = [
    { label: "Total Revenue", value: "₹45,200", icon: DollarSign, trend: "+12%" },
    { label: "Active Products", value: "24", icon: ShoppingBag, trend: "+2" },
    { label: "Pending Requests", value: "5", icon: Clock, trend: "-1" },
    { label: "Page Views", value: "1,204", icon: Eye, trend: "+24%" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-light tracking-tight mb-8">Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-secondary shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-text-main">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-text-muted text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Placeholder */}
      <div className="bg-white border border-secondary rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-secondary flex justify-between items-center">
          <h2 className="text-lg font-medium">Recent Orders</h2>
          <button className="text-sm text-text-muted hover:text-text-main transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/30 text-text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {[1, 2, 3].map((row) => (
                <tr key={row} className="hover:bg-secondary/10 transition-colors">
                  <td className="px-6 py-4 font-medium">#ORD-00{row}</td>
                  <td className="px-6 py-4">John Doe</td>
                  <td className="px-6 py-4">Serenity in Blue</td>
                  <td className="px-6 py-4 text-text-muted">Oct 24, 2023</td>
                  <td className="px-6 py-4">₹15,000</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
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
