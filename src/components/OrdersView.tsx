import React from 'react';
import { X, Package, Clock, CheckCircle2, Truck, ArrowLeft } from 'lucide-react';
import { Order } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onClose: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl relative text-gray-800 my-auto">
        
        {/* Header */}
        <div className="bg-[#2874f0] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-yellow-300" />
            <h2 className="font-extrabold text-lg sm:text-xl tracking-tight">
              My Orders & Live Delivery Tracking
            </h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-gray-50 space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border p-6">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">No Orders Placed Yet!</h3>
              <p className="text-xs text-gray-500 mb-4">
                Place an order to track delivery status, download tax invoices, and request returns.
              </p>
              <button
                onClick={onClose}
                className="bg-[#2874f0] text-white font-bold px-6 py-2 rounded-sm text-xs hover:bg-blue-700 uppercase"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden">
                
                {/* Order Top Bar */}
                <div className="bg-blue-50/70 p-4 border-b border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <div>
                    <span className="text-gray-500">Order ID: </span>
                    <span className="font-bold text-gray-900">{order.id}</span>
                    <span className="ml-3 text-gray-500">Placed on: </span>
                    <span className="font-semibold text-gray-800">{order.orderDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Tracking #:</span>
                    <span className="font-bold text-[#2874f0]">{order.trackingNumber}</span>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-4 divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-contain p-1 border rounded bg-gray-50"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-gray-500">
                            Qty: {item.quantity} • Price: ₹{item.product.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-gray-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Status Timeline */}
                <div className="bg-gray-50 p-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">Status: {order.status}</span>
                    <span className="text-green-700 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Delivery by {order.expectedDelivery}
                    </span>
                  </div>

                  {/* Visual Tracker Bar */}
                  <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] font-bold">
                    {[
                      { step: 'Placed', icon: CheckCircle2, active: true },
                      { step: 'Packed', icon: Package, active: true },
                      { step: 'Shipped', icon: Truck, active: order.status !== 'Placed' },
                      { step: 'Delivered', icon: CheckCircle2, active: order.status === 'Delivered' }
                    ].map((st, idx) => {
                      const Icon = st.icon;
                      return (
                        <div key={idx} className="space-y-1">
                          <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center transition-colors ${
                            st.active ? 'bg-green-600 text-white shadow-xs' : 'bg-gray-200 text-gray-400'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={st.active ? 'text-green-700' : 'text-gray-400'}>
                            {st.step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
