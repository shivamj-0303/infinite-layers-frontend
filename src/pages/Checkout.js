import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartApi, orderApi, userApi } from '../services/api';

const emptyProfile = {
  firstName: '',
  lastName: '',
  phone: '',
  addressLine1: '',
  addressCity: '',
  addressState: '',
  addressPincode: '',
};

const requiredFields = [
  'firstName',
  'lastName',
  'phone',
  'addressLine1',
  'addressCity',
  'addressState',
  'addressPincode',
];

const COD_CHARGE = 70;

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [profile, setProfile] = useState(emptyProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [activeStep, setActiveStep] = useState('details');
  const [paymentMethod, setPaymentMethod] = useState('');

  const loadCheckout = useCallback(async () => {
    try {
      setLoading(true);
      const [cartResponse, userResponse] = await Promise.all([
        cartApi.get(),
        userApi.me(),
      ]);

      setCart(cartResponse.data);
      const nextProfile = {
        ...emptyProfile,
        ...userResponse.data,
      };
      setProfile(nextProfile);
      setIsEditing(!hasCompleteProfile(nextProfile));
      setActiveStep(hasCompleteProfile(nextProfile) ? 'payment' : 'details');
    } catch (error) {
      toast.error('Unable to load checkout details');
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadCheckout();
  }, [loadCheckout]);

  const cartItems = useMemo(() => cart?.items || [], [cart]);
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );
    const tax = subtotal * 0.1;
    const shipping = subtotal > 500 ? 0 : 50;
    const codCharge = paymentMethod === 'COD' ? COD_CHARGE : 0;
    return {
      subtotal,
      tax,
      shipping,
      codCharge,
      total: subtotal + tax + shipping + codCharge,
    };
  }, [cartItems, paymentMethod]);

  const profileComplete = hasCompleteProfile(profile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    if (!hasCompleteProfile(profile)) {
      toast.error('Please fill all delivery details');
      return;
    }

    try {
      setSaving(true);
      const response = await userApi.updateMe(profile);
      setProfile({ ...emptyProfile, ...response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsEditing(false);
      setActiveStep('payment');
      toast.success('Delivery details saved');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save delivery details');
    } finally {
      setSaving(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!profileComplete || isEditing || activeStep !== 'review') {
      toast.error('Confirm delivery and payment details before placing the order');
      return;
    }

    if (!paymentMethod) {
      toast.error('Select a payment method');
      return;
    }

    try {
      setPlacing(true);
      const response = await orderApi.place({ paymentMethod });
      toast.success('Order placed successfully');
      navigate(`/order-confirmation/${response.data.id}`, {
        state: { order: response.data },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add products before starting checkout.</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button type="button" onClick={() => navigate('/cart')} className="hover:text-pink-500">
            Cart
          </button>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Checkout</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600 mt-2">Confirm delivery and payment details before placing your order.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="text-pink-600">Details</span>
            <span className="text-gray-300">/</span>
            <span className={['payment', 'review'].includes(activeStep) ? 'text-pink-600' : 'text-gray-400'}>
              Payment
            </span>
            <span className="text-gray-300">/</span>
            <span className={activeStep === 'review' ? 'text-pink-600' : 'text-gray-400'}>
              Review
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400">Done</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    These details are required before the order can be placed.
                  </p>
                </div>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true);
                      setActiveStep('details');
                    }}
                    className="border border-pink-500 text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-lg font-semibold"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First name" name="firstName" value={profile.firstName} onChange={handleChange} />
                  <Input label="Last name" name="lastName" value={profile.lastName} onChange={handleChange} />
                  <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} />
                  <Input label="Address line" name="addressLine1" value={profile.addressLine1} onChange={handleChange} full />
                  <Input label="City" name="addressCity" value={profile.addressCity} onChange={handleChange} />
                  <Input label="State" name="addressState" value={profile.addressState} onChange={handleChange} />
                  <Input label="Pincode" name="addressPincode" value={profile.addressPincode} onChange={handleChange} />
                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                    {profileComplete && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-3 rounded-lg font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white px-5 py-3 rounded-lg font-semibold"
                    >
                      {saving ? 'Saving...' : 'Save and Review'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900">
                    {profile.firstName} {profile.lastName}
                  </p>
                  <p className="text-gray-700 mt-2">{profile.phone}</p>
                  <p className="text-gray-700 mt-2">{profile.addressLine1}</p>
                  <p className="text-gray-700">
                    {profile.addressCity}, {profile.addressState} {profile.addressPincode}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveStep('payment')}
                    className="mt-5 bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-lg font-semibold"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                  <p className="text-gray-600 text-sm mt-1">Choose how you want to pay for this order.</p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('COD');
                    setActiveStep('review');
                  }}
                  disabled={!profileComplete || isEditing}
                  className={`w-full text-left border rounded-lg p-5 transition ${
                    paymentMethod === 'COD'
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  } disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-600 mt-1">Pay when your package is delivered.</p>
                    </div>
                    <p className="font-semibold text-gray-900">+₹{COD_CHARGE.toFixed(2)}</p>
                  </div>
                </button>

                <button
                  type="button"
                  disabled
                  className="w-full text-left border border-gray-200 rounded-lg p-5 bg-gray-50 text-gray-400 cursor-not-allowed"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-bold">Razorpay Online Payment</p>
                      <p className="text-sm mt-1">
                        Available after server-side Razorpay order creation and signature verification are configured.
                      </p>
                    </div>
                    <p className="font-semibold">Setup required</p>
                  </div>
                </button>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Items</h2>
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-5 last:border-0 last:pb-0">
                    <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.images?.[0]?.publicUrl || 'https://via.placeholder.com/160'}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{item.product?.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600">₹{(item.product?.price || 0).toFixed(2)} each</p>
                    </div>
                    <p className="font-bold text-gray-900">
                      ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Total Details</h2>
              <PriceRow label="Subtotal" value={totals.subtotal} />
              <PriceRow label="Tax (10%)" value={totals.tax} />
              <PriceRow label="Shipping" value={totals.shipping} free={totals.shipping === 0} />
              {paymentMethod === 'COD' && (
                <PriceRow label="COD charge" value={totals.codCharge} />
              )}
              <div className="border-t border-gray-200 my-6"></div>
              <div className="text-sm text-gray-600 mb-4">
                Payment: <span className="font-semibold text-gray-900">{paymentMethod || 'Not selected'}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span className="text-pink-600">₹{totals.total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={!profileComplete || isEditing || activeStep !== 'review' || !paymentMethod || placing}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:shadow-lg disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg"
              >
                {placing ? 'Placing Order...' : 'Confirm and Place Order'}
              </button>
              {(!profileComplete || isEditing || activeStep !== 'review' || !paymentMethod) && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
                  Save delivery details and choose a payment method to enable order placement.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

function hasCompleteProfile(profile) {
  return requiredFields.every((field) => String(profile[field] || '').trim().length > 0);
}

function Input({ label, name, value, onChange, full = false }) {
  return (
    <label className={full ? 'md:col-span-2' : ''}>
      <span className="block text-sm font-semibold text-gray-700 mb-1">{label}</span>
      <input
        required
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500"
      />
    </label>
  );
}

function PriceRow({ label, value, free = false }) {
  return (
    <div className="flex justify-between text-gray-700 mb-4">
      <span>{label}</span>
      <span className={free ? 'text-green-600 font-semibold' : ''}>
        {free ? 'FREE' : `₹${value.toFixed(2)}`}
      </span>
    </div>
  );
}

export default Checkout;
