import React, { useState, useEffect } from "react";
import Input from "./Input"; // Path to your existing Input component
import { Search } from "lucide-react"; // Or your own SVG icon

const URL = "https://nigerian-university-api.herokuapp.com";

const UniversitySearch = ({ onSelect }) => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUnis, setFilteredUnis] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data on mount
  useEffect(() => {
    const fetchUnis = async () => {
      try {
        const res = await fetch(`${URL}/university`);
        const result = await res.json();
        if (result.success) setUniversities(result.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUnis();
  }, []);

  // 2. Filter list when user types
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUnis([]);
    } else {
      const filtered = universities.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUnis(filtered);
    }
  }, [searchTerm, universities]);

  const handleSelect = (uni) => {
    setSearchTerm(uni.name); // Set input text to the selected name
    setIsOpen(false); // Close dropdown
    onSelect(uni); // Pass full object to parent (onboarding form)
  };

  return (
    <div className="relative w-full">
      <Input
        label="University"
        placeholder={
          loading ? "Loading schools..." : "Type to search your university..."
        }
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        leftIcon={<Search className="text-neutral-black-9" size={18} />}
        autoComplete="off"
      />

      {/* 3. Searchable Dropdown Results */}
      {isOpen && filteredUnis.length > 0 && (
        <div className="absolute z-50 w-full mt-1 max-height-[250px] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-black-5 dark:border-neutral-600 rounded-xl shadow-lg">
          {filteredUnis.map((uni, index) => (
            <button
              key={index}
              type="button"
              className="w-full text-left px-4 py-3 hover:bg-neutral-black-2 dark:hover:bg-neutral-800 transition-colors body-small-medium flex flex-col"
              onClick={() => handleSelect(uni)}
            >
              <span className="text-neutral-black-13 dark:text-white">
                {uni.name}
              </span>
              <span className="text-neutral-black-9 text-[10px] uppercase">
                {uni.abbreviation} • {uni.university_type}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Handling "No Results Found" */}
      {isOpen && searchTerm && filteredUnis.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-1 p-4 bg-white dark:bg-neutral-900 border border-neutral-black-5 rounded-xl shadow-lg text-center text-neutral-black-9 body-small-regular">
          No university found.
        </div>
      )}
    </div>
  );
};

export default UniversitySearch;
