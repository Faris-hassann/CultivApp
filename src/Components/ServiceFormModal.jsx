import React from "react";

const ServiceFormModal = ({ open, onClose, title, borderColor }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Overlay - clicking closes modal */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      {/* Modal content */}
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl py-6 sm:py-8 md:py-12 px-4 sm:px-8 z-10 flex flex-col mx-2 sm:mx-4 my-8 sm:my-12 max-h-[90vh] overflow-y-auto"
        style={{ border: `3px solid ${borderColor}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Exit button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: borderColor }}
        >
          {title}
        </h2>
        <form className="space-y-5">
          {/* Branch Dropdown */}
          <div className="relative">
            <select
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              required
            >
              <option value="">Branch | الفرع</option>
              <option value="branch1">Branch 1</option>
              <option value="branch2">Branch 2</option>
            </select>
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              Branch | الفرع
            </label>
          </div>
          {/* First Name */}
          <div className="relative">
            <input
              type="text"
              required
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              First Name
            </label>
          </div>
          {/* Last Name */}
          <div className="relative">
            <input
              type="text"
              required
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              Last Name
            </label>
          </div>
          {/* Phone */}
          <div className="relative">
            <input
              type="tel"
              required
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              Phone
            </label>
          </div>
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              Email
            </label>
          </div>
          {/* Agency Name */}
          <div className="relative">
            <input
              type="text"
              required
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              Agency name | اسم الوكالة
            </label>
          </div>
          {/* Group ID */}
          <div className="relative">
            <input
              type="text"
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              Group ID | رقم المجموعة
            </label>
          </div>
          {/* Amount */}
          <div className="relative">
            <input
              type="number"
              required
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              Amount | المبلغ
            </label>
          </div>
          {/* Currency Dropdown */}
          <div className="relative">
            <select
              className="peer w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50"
              required
            >
              <option value="">Currency | عملة التحويل</option>
              <option value="SAR">SAR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <label className="absolute left-4 top-0 text-xs text-gray-500 bg-white px-1 -translate-y-1/2 pointer-events-none transition-all peer-focus:text-primary peer-focus:-translate-y-1/2 peer-focus:top-0">
              Currency | عملة التحويل
            </label>
          </div>
          {/* File Upload */}
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">
              Transaction proof | ارفق مستند اثبات العملية
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white"
            style={{ background: borderColor }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceFormModal;
