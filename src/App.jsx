import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Function to generate a 10-character UID
const generateUID = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let uid = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uid += chars[randomIndex];
  }
  return uid;
};

function App() {
  const [loading, setLoading] = useState(false); // Loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading

    // Generate a 10-character unique ID
    const uid = generateUID();

    try {
      const res = await axios.post(
        "https://sheet.best/api/sheets/27658b60-3dca-4cc2-bd34-f65124b8a27d",
        {
          UID: uid, // Add UID to the data
          NAME: data.name,
          NUMBER: data.number,
          EMAIL: data.email,
          LOCATION: data.location,
          COUNTRY: data.country,
          WEIGHT: data.weight + " KG",
        }
      );
      console.log(res.data);
      reset();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Submit Your Details
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-[#8847D9]`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Number:</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            {...register("number", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a valid phone number",
              },
            })}
            className={`w-full px-3 py-2 border ${
              errors.number ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-[#8847D9]`}
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address",
              },
            })}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-[#8847D9]`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Location:
          </label>
          <input
            type="text"
            placeholder="Enter a detailed address"
            {...register("location", { required: "Location is required" })}
            className={`w-full px-3 py-2 border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-[#8847D9]`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Country:</label>
          <input
            type="text"
            placeholder="Enter full country name"
            {...register("country", { required: "Country is required" })}
            className={`w-full px-3 py-2 border ${
              errors.country ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-[#8847D9]`}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Weight (approx):
          </label>
          <input
            type="number"
            placeholder="Enter weight without units"
            {...register("weight", {
              required: "Weight is required",
              valueAsNumber: true,
            })}
            className={`w-full px-3 py-2 border ${
              errors.weight ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:border-[#8847D9]`}
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-[#8447D6] text-white font-bold py-2 px-4 rounded hover:bg-[#6E3BBF] focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "PickUp request"}
        </button>
      </form>
    </div>
  );
}

export default App;
