import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getData } from "country-list";
import Nav from "./Nav";

function PickupBooking() {
  const [loading, setLoading] = useState(false); // Loading state
  const [countries, setCountries] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading

    console.log(data.name);
    try {
      const res = await axios.post(
        "https://sheet.best/api/sheets/27658b60-3dca-4cc2-bd34-f65124b8a27d",
        {
          NAME:data.name,
          EMAIL: data.email,
          PHONENUMBER: data.number,
          LONGITUDE: data.longitude,
          LATITUDE: data.latitude,
          CITY: data.location,
          PINCODE: data.pincode,
          COUNTRY_FROM: data.country,
          WEIGHTAPX: data.weight + " KG",
          PickUpPersonName: data.name,
          PICKUP_INSTRUCTIONS: data.instructions, // Added field
          PICKUP_DATETIME: data.pickupDate + data.pickupTime,
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

  useEffect(() => {
    setCountries(getData());
  }, []);

  return (
    <div className="">
      <Nav />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-md shadow-none w-full max-w-4xl" // Removed card-like appearance
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Submit Pickup Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number:
              </label>
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
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.number.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email:
              </label>
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
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Location (City):
              </label>
              <input
                type="text"
                placeholder="Enter city or location"
                {...register("location", { required: "Location is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Country:
              </label>
              <select
                {...register("country", { required: "Country is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              >
                <option value="">Select your country</option>{" "}
                {/* Placeholder option */}
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Pincode:
              </label>
              <input
                type="text"
                placeholder="Enter your pincode"
                {...register("pincode", { required: "Pincode is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pincode.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
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
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.weight.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Longitude:
              </label>
              <input
                type="text"
                placeholder="Enter your longitude"
                {...register("longitude", {
                  required: "Longitude is required",
                })}
                className={`w-full px-3 py-2 border ${
                  errors.longitude ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.longitude && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.longitude.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Latitude:
              </label>
              <input
                type="text"
                placeholder="Enter your latitude"
                {...register("latitude", {
                  required: "Latitude is required",
                })}
                className={`w-full px-3 py-2 border ${
                  errors.latitude ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.latitude && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.latitude.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Pickup Date:
              </label>
              <input
                type="date"
                {...register("pickupDate", {
                  required: "Pickup date is required",
                })}
                className={`w-full px-3 py-2 border ${
                  errors.pickupDate ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.pickupDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pickupDate.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Pickup Time:
              </label>
              <input
                type="time"
                {...register("pickupTime", {
                  required: "Pickup time is required",
                })}
                className={`w-full px-3 py-2 border ${
                  errors.pickupTime ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#8847D9]`}
              />
              {errors.pickupTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pickupTime.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Pickup Instructions:
              </label>
              <textarea
                placeholder="Enter pickup instructions"
                {...register("instructions")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8847D9]"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#8847D9] text-white px-4 py-2 rounded-md hover:bg-[#6d3f9f] focus:outline-none focus:ring-2 focus:ring-[#8847D9]"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PickupBooking;