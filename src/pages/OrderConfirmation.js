import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { orderApi } from '../services/api';

const OrderConfirmation = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);

  useEffect(() => {
    if (order) return;

    const loadOrder = async () => {
      try {
        setLoading(true);
        const response = await orderApi.getById(id);
        setOrder(response.data);
      } catch (error) {
        toast.error('Unable to load order confirmation');
        navigate('/cart');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, navigate, order]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
            <div>
              <p className="text-pink-600 font-semibold mb-2">Order confirmed</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Thank you for your order
              </h1>
              <p className="text-gray-600 mt-3">
                Order number <span className="font-semibold text-gray-900">{order.orderNumber}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-3 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>
            <div className="space-y-5">
              {(order.items || []).map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 border-b border-gray-200 pb-5 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-gray-900">Product ID: {item.productId}</p>
                    <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Price snapshot: ₹{Number(item.price || 0).toFixed(2)}</p>
                  </div>
                  <p className="font-bold text-gray-900">
                    ₹{(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-8">
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery</h2>
              <p className="font-semibold text-gray-900">{order.customerName}</p>
              <p className="text-gray-700 mt-2">{order.phone}</p>
              <p className="text-gray-700 mt-2">{order.shippingAddressLine1}</p>
              <p className="text-gray-700">
                {order.shippingCity}, {order.shippingState} {order.shippingPincode}
              </p>
              <p className="text-gray-600 text-sm mt-4">{order.customerEmail}</p>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
                <p className="text-sm text-gray-600">Payment method</p>
                <p className="font-semibold text-gray-900 mt-1">{formatPaymentMethod(order.paymentMethod)}</p>
                <p className="text-sm text-gray-600 mt-3">Payment status</p>
                <p className="font-semibold text-gray-900 mt-1">{formatPaymentStatus(order.paymentStatus)}</p>
                {order.paymentReference && (
                  <>
                    <p className="text-sm text-gray-600 mt-3">Payment reference</p>
                    <p className="font-mono text-sm text-gray-900 break-all mt-1">{order.paymentReference}</p>
                  </>
                )}
                {order.paymentProviderPaymentId && (
                  <>
                    <p className="text-sm text-gray-600 mt-3">Provider payment ID</p>
                    <p className="font-mono text-sm text-gray-900 break-all mt-1">{order.paymentProviderPaymentId}</p>
                  </>
                )}
              </div>
              <SummaryRow label="Subtotal" value={order.subtotal} />
              <SummaryRow label="Tax" value={order.tax} />
              <SummaryRow label="Shipping" value={order.shippingCharge} />
              {Number(order.codCharge || 0) > 0 && (
                <SummaryRow label="COD charge" value={order.codCharge} />
              )}
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-pink-600">₹{Number(order.total || 0).toFixed(2)}</span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between text-gray-700 mb-3">
      <span>{label}</span>
      <span>₹{Number(value || 0).toFixed(2)}</span>
    </div>
  );
}

function formatPaymentMethod(method) {
  if (method === 'COD') return 'Cash on Delivery';
  if (method === 'RAZORPAY') return 'Razorpay';
  return method || 'Not available';
}

function formatPaymentStatus(status) {
  return String(status || 'Not available').replaceAll('_', ' ');
}

export default OrderConfirmation;
