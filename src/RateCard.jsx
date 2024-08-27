import React, { useState, useEffect } from "react";

const rateData = {
  usaData: [
    { Weight_slab: "1 Kg FLAT", Economy: "₹2900", Express: "₹3210" },
    { Weight_slab: "2 Kg FLAT", Economy: "₹3394", Express: "₹3753" },
    { Weight_slab: "3 Kg FLAT", Economy: "₹3979", Express: "₹4524" },
    { Weight_slab: "4 Kg FLAT", Economy: "₹4929", Express: "₹5515" },
    { Weight_slab: "5 Kg FLAT", Economy: "₹5499", Express: "₹6232" },
    { Weight_slab: "6.1 to 8 Kg", Economy: "₹999", Express: "₹1099" },
    { Weight_slab: "8.1 to 10 Kg", Economy: "₹899", Express: "₹999" },
    { Weight_slab: "10.1 to 20 Kg", Economy: "₹849", Express: "₹899" },
    { Weight_slab: "20.1 to 30 Kg", Economy: "₹749", Express: "₹829" },
    { Weight_slab: "30+ Kg", Economy: "Contact sales", Express: "Contact sales" }
  ],
  ukData: [
    { Weight_slab: "1 Kg FLAT", Economy: "₹2500", Express: "₹2999" },
    { Weight_slab: "2 Kg FLAT", Economy: "₹2985", Express: "₹3650" },
    { Weight_slab: "3 Kg FLAT", Economy: "₹3637", Express: "₹4625" },
    { Weight_slab: "4 Kg FLAT", Economy: "₹4152", Express: "₹5411" },
    { Weight_slab: "5 Kg FLAT", Economy: "₹5246", Express: "₹6432" },
    { Weight_slab: "6.1 to 8 Kg", Economy: "₹949", Express: "₹1049" },
    { Weight_slab: "8.1 to 10 Kg", Economy: "₹799", Express: "₹949" },
    { Weight_slab: "10.1 to 20 Kg", Economy: "₹599", Express: "₹849" },
    { Weight_slab: "20.1 to 30 Kg", Economy: "₹499", Express: "₹779" },
    { Weight_slab: "30+ Kg", Economy: "₹499", Express: "₹779" }
  ],
  uaeData: [
    { Weight_slab: "1 Kg FLAT", Economy: "₹2178", Express: "₹2400" },
    { Weight_slab: "2 Kg FLAT", Economy: "₹2774", Express: "₹3364" },
    { Weight_slab: "3 Kg FLAT", Economy: "₹3432", Express: "₹3892" },
    { Weight_slab: "4 Kg FLAT", Economy: "₹4180", Express: "₹4368" },
    { Weight_slab: "5 Kg FLAT", Economy: "₹4561", Express: "₹5184" },
    { Weight_slab: "6.1 to 8 Kg", Economy: "₹939", Express: "₹1199" },
    { Weight_slab: "8.1 to 10 Kg", Economy: "₹779", Express: "₹1149" },
    { Weight_slab: "10.1 to 20 Kg", Economy: "₹749", Express: "₹1099" },
    { Weight_slab: "20.1 to 30 Kg", Economy: "₹699", Express: "₹999" },
    { Weight_slab: "30+ Kg", Economy: "₹499", Express: "-" }
  ]
};

const RateCardForm = () => {
  const [country, setCountry] = useState("usaData");
  const [weight, setWeight] = useState("");
  const [weights, setWeights] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);

  useEffect(() => {
    setWeights(rateData[country].map(item => item.Weight_slab));
  }, [country]);

  useEffect(() => {
    const rate = rateData[country].find(item => item.Weight_slab === weight);
    setSelectedRate(rate);
  }, [country, weight]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-200 flex flex-col">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-purple-800 mb-6">Rate Card Form</h2>
            <form className="space-y-6">
              {/* Country Selector */}
              <div>
                <label className="block text-gray-800 text-lg font-medium mb-2">Select Country:</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-150 ease-in-out"
                >
                  <option value="usaData">USA</option>
                  <option value="ukData">UK</option>
                  <option value="uaeData">UAE</option>
                </select>
              </div>

              {/* Weight Selector */}
              <div>
                <label className="block text-gray-800 text-lg font-medium mb-2">Select Weight Slab:</label>
                <select
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-150 ease-in-out"
                >
                  <option value="">--Select Weight--</option>
                  {weights.map((weightOption, index) => (
                    <option key={index} value={weightOption}>
                      {weightOption}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Data Display Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-purple-800 mb-6">Rate Details</h2>
            {selectedRate ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-gray-50 text-gray-800 rounded-lg shadow-md">
                  <thead className="bg-purple-100 text-gray-700">
                    <tr>
                      <th className="py-4 px-6 border-b text-left">Weight</th>
                      <th className="py-4 px-6 border-b text-left">Economy</th>
                      <th className="py-4 px-6 border-b text-left">Express</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 px-6 border-b">{selectedRate.Weight_slab}</td>
                      <td className="py-4 px-6 border-b">{selectedRate.Economy}</td>
                      <td className="py-4 px-6 border-b">{selectedRate.Express}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">Please select a weight slab to view rates.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCardForm;