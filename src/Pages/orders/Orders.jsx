import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const baseUrl = import.meta.env.VITE_ORDERS_BASE_URL;

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${baseUrl}/payments/all`);
      const data = await res.json();
      if (data.success === true) {
        setOrders(data.data);
      } else {
        console.log(data.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [baseUrl]);

  // Calculate stats from actual data
  const totalOrders = orders.length;
  const paidOrders = orders.filter((order) => order.status === true).length;
  const unpaidOrders = orders.filter((order) => order.status === false).length;
  const totalRevenue = orders
    .filter((order) => order.status === true)
    .reduce((sum, order) => sum + order.paid_amount, 0);

  return (
    <div className="w-full p-6 lg:p-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Header */}
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold text-neutral-800">
              Omada Orders
            </h1>
            <p className="text-neutral-600">
              Manage and track all Omada payments
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="mb-1 text-sm font-medium text-neutral-600">
                Total Orders
              </h3>
              <p className="text-2xl font-bold text-neutral-800">
                {totalOrders}
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="mb-1 text-sm font-medium text-neutral-600">
                Paid
              </h3>
              <p className="text-2xl font-bold text-green-600">{paidOrders}</p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="mb-1 text-sm font-medium text-neutral-600">
                Unpaid
              </h3>
              <p className="text-2xl font-bold text-red-600">{unpaidOrders}</p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="mb-1 text-sm font-medium text-neutral-600">
                Total Revenue
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                €{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-neutral-50 text-left text-sm font-semibold text-neutral-700">
                    <th className="border border-neutral-200 px-6 py-3 text-center">
                      Order Id
                    </th>
                    <th className="border border-neutral-200 px-6 py-3 text-center">
                      Customer
                    </th>
                    <th className="border border-neutral-200 px-6 py-3 text-center">
                      Software
                    </th>
                    <th className="border border-neutral-200 px-6 py-3 text-center">
                      Paid Amount
                    </th>
                    <th className="border border-neutral-200 px-6 py-3 text-center">
                      Status
                    </th>
                    {/* <th className="text-center border border-neutral-200 px-6 py-3">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-neutral-500"
                      >
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border border-neutral-200 bg-white text-sm text-gray-700 transition hover:bg-gray-50"
                      >
                        {/* Order ID */}
                        <td className="border border-neutral-200 px-4 py-3 font-medium text-gray-800">
                          #{order?.order_id}
                          <div className="mt-1 text-xs text-gray-500">
                            {new Date(order?.createdAt).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </div>
                        </td>

                        {/* Customer Info */}
                        <td className="border border-neutral-200 px-4 py-3">
                          <div className="font-semibold text-gray-900">
                            {order?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order?.email}
                          </div>
                        </td>

                        {/* Software */}
                        <td className="border border-neutral-200 px-4 py-3">
                          <div className="font-medium">{order?.software}</div>
                        </td>

                        {/* Payment */}
                        <td className="border border-neutral-200 px-4 py-3">
                          <div className="font-semibold text-gray-800">
                            €{order?.paid_amount.toLocaleString()}{" "}
                            <span className="text-xs text-gray-500">
                              / €{order?.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="mt-1 h-1 w-full rounded bg-neutral-200">
                            <div
                              className="h-full rounded bg-blue-500"
                              style={{
                                width: `${
                                  (order?.paid_amount / order?.price) * 100
                                }%`,
                              }}
                            />
                          </div>
                        </td>

                        {/* Status */}
                        <td className="border border-neutral-200 px-4 py-3">
                          <div className="mb-1 font-medium capitalize text-gray-700">
                            {order?.payment_type}
                          </div>
                          {order?.status ? (
                            <span className="inline-block rounded border border-green-200 bg-green-100 px-2 py-0.5 text-xs text-green-700">
                              Paid
                            </span>
                          ) : (
                            <span className="inline-block rounded border border-red-200 bg-red-100 px-2 py-0.5 text-xs text-red-600">
                              Unpaid
                            </span>
                          )}
                        </td>

                        {/* Action */}
                        {/* <td className="px-4 py-3 border border-neutral-200">
                          <div className="flex items-center justify-center gap-3">
                            <Link
                              to={`/dashboard/bfinit/${order?._id}`}
                              className="text-blue-600 hover:text-blue-800"
                              title="View Order"
                            >
                              <FiEye className="h-5 w-5" />
                            </Link>
                          </div>
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
