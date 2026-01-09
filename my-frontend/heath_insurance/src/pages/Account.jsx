import { useState } from "react";

function Account() {
  const [formData, setFormData] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Account Information
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["firstName", "First Name"],
            ["lastName", "Last Name"],
            ["phone", "Phone"],
            ["gender", "Gender"],
            ["city", "City"],
            ["region", "Region"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm text-gray-600 mb-1">
                {label}
              </label>
              <input
                value={formData[name] || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dob || ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">
              Address
            </label>
            <input
              value={formData.address || ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="md:col-span-2 border-t pt-6 mt-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Security
            </h3>

            <input
              type="password"
              placeholder="Current Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="New Password"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex gap-4 mt-8">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium">
              Update Account
            </button>
            <button
              type="button"
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
