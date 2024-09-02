import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";

const RateCardForm = () => {
  const [country, setCountry] = useState("usaData");
  const [weight, setWeight] = useState("");
  const [weights, setWeights] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [rateData, setRateData] = useState({});

  const sheets = [
    { name: "USA", key: "usaData" },
    { name: "UK", key: "ukData" },
    { name: "UAE", key: "uaeData" },
    { name: "CANADA", key: "canadaData" },
    { name: "CHINA", key: "chinaData" },
    { name: "EUROPE", key: "europeData" },
    { name: "FRANCE", key: "franceData" },
    { name: "HONG KONG", key: "hongkongData" },
    { name: "MALAYSIA", key: "malaysiaData" },
    { name: "NEW ZEALAND", key: "newzealandData" },
  ];

  const API_ENDPOINT = "https://sheetdb.io/api/v1/57vn5sseznvw5"; // Replace with your actual SheetDB API endpoint

  // Fetch data from Google Sheets
  const fetchData = async () => {
    try {
      // Fetch data from all sheets
      const promises = sheets.map((sheet) =>
        axios.get(`${API_ENDPOINT}?sheet=${sheet.name}`)
      );

      const responses = await Promise.all(promises);
      const newRateData = {};
      console.log(responses.data);
      // Map responses to rateData format
      responses.forEach((response, index) => {
        const sheetName = sheets[index].name;
        const key = sheets[index].key;
        const data = response.data;

        sheets.push({ name: sheetName, key: sheetName + "Data" });

        // Extract dynamic column names based on country
        const weightColumn = `Weight_slab(${sheetName})`;
        const economyColumn = `Economy`;
        const expressColumn = `Express`;

        newRateData[key] = data.map((item) => ({
          Weight_slab: item[weightColumn],
          Economy: item[economyColumn],
          Express: item[expressColumn],
        }));
      });

      setRateData(newRateData);
      console.log("Fetched data from Google Sheets:", newRateData);
    } catch (error) {
      console.error("Error fetching data from sheetdb.io", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  useEffect(() => {
    if (rateData[country]) {
      setWeights(rateData[country].map((item) => item.Weight_slab));
    }
  }, [country, rateData]);

  useEffect(() => {
    if (rateData[country]) {
      const rate = rateData[country].find(
        (item) => item.Weight_slab === weight
      );
      setSelectedRate(rate);
    }
  }, [country, weight, rateData]);

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-200 flex flex-col items-center justify-center py-8">
        {/* Form Section */}
        <div className="w-full max-w-lg p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Rate Card Form
              </h2>
              <form className="space-y-4">
                {/* Country Selector */}
                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    Select Country:
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-150 ease-in-out"
                  >
                    {sheets.map((sheet) => (
                      <option key={sheet.key} value={sheet.key}>
                        {sheet.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weight Selector */}
                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-1">
                    Select Weight Slab:
                  </label>
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-150 ease-in-out"
                  >
                    <option value="">Select Weight</option>
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
        <div className="w-full max-w-lg p-4 mt-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[200px]">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Rate Details
              </h2>
              {selectedRate ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-gray-50 text-gray-800 rounded-lg shadow-md">
                    <thead className="bg-purple-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">Weight</th>
                        <th className="py-3 px-4 border-b text-left">
                          Economy
                        </th>
                        <th className="py-3 px-4 border-b text-left">
                          Express
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 border-b">
                          {selectedRate.Weight_slab}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {selectedRate.Economy}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {selectedRate.Express}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">
                  Please select a weight slab to view rates.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCardForm;