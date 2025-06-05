import React, { useState, useEffect } from "react";
import {
  getAllLeads,
  getLeadsByCategory,
  getLeadsByCity,
  leadCategories,
} from "../data/landscapingLeads";

/**
 * LeadGenerator Component
 *
 * A React component that displays and filters landscaping company leads
 * loaded from the CSV data file.
 */
const LeadGenerator = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Load all leads on component mount
  useEffect(() => {
    // In a real implementation, this might fetch the CSV file
    const allLeads = getAllLeads();
    setLeads(allLeads);
    setFilteredLeads(allLeads);
    setLoading(false);
  }, []);

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      const categoryLeads = getLeadsByCategory(category);
      setFilteredLeads(categoryLeads);
    } else {
      setFilteredLeads(leads);
    }

    // Reset city filter when changing categories
    setCityFilter("");
  };

  // Handle city filter change
  const handleCityChange = (e) => {
    const city = e.target.value;
    setCityFilter(city);

    if (city) {
      const cityLeads = getLeadsByCity(city);
      setFilteredLeads(cityLeads);
    } else {
      // If no city is specified, reset to current category filter
      if (selectedCategory) {
        setFilteredLeads(getLeadsByCategory(selectedCategory));
      } else {
        setFilteredLeads(leads);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Landscaping Leads Generator
      </h1>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            {Object.values(leadCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by City:
          </label>
          <input
            type="text"
            value={cityFilter}
            onChange={handleCityChange}
            placeholder="Enter city name..."
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading leads data...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredLeads.length} out of {leads.length} leads
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {lead.businessName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.ownerName || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.phone ? (
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {lead.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.email ? (
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {lead.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {lead.website && lead.website !== "None" ? (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Site
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {lead.notes || "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No leads match your current filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Usage Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          About This Data
        </h2>
        <p className="text-gray-600 mb-2">
          This component demonstrates how to use the landscaping leads data
          stored in the CSV file. The full dataset includes:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-2">
          <li>Businesses with outdated websites and owner contacts</li>
          <li>Businesses with outdated websites but no owner information</li>
          <li>Businesses with no websites and no owner information</li>
        </ul>
        <p className="text-gray-600">
          The data can be filtered by category or by city name. In a real
          implementation, you might want to add more sophisticated filtering,
          sorting, and pagination.
        </p>
      </div>
    </div>
  );
};

export default LeadGenerator;
