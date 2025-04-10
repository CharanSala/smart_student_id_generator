import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Step 1
import Navbar from './Navbar';

const Dataform = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    classDivision: '',
    allergies: [],
    rackNumber: '',
    busRoute: '',
    photo: null,
    photoPreview: '',
  });

  const allergiesList = ['Peanuts', 'Dairy', 'Gluten', 'Dust', 'Pollen'];
  const busRoutes = ['Route 1', 'Route 2', 'Route 3', 'Route 4'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergyChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      allergies: checked
        ? [...prev.allergies, value]
        : prev.allergies.filter((item) => item !== value),
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('studentsData')) || [];
    const updatedData = [...existingData, formData];
    localStorage.setItem('studentsData', JSON.stringify(updatedData));
    console.log('Submitted Data:', localStorage.getItem('studentsData'));
    navigate('/idcard');

  };

  return (
    <div className='pl-5 pr-5 md:pl-0 md:pr-0 h-full dark:rounded-none dark:bg-black dark:text-white'>
      
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-center dark:rounded-none dark:bg-white dark:text-black mb-6">
        🎓 Student Registration Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Roll Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            placeholder="Enter roll number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Class & Division */}
        <div className='dark:bg-white dark:text-black'>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class & Division</label>
          <select
            name="classDivision"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            value={formData.classDivision}
            onChange={handleChange}
            required
          >
            <option value="">Select Class & Division</option>
            <option value="10A">10A</option>
            <option value="10B">10B</option>
            <option value="9A">9A</option>
            <option value="9B">9B</option>
          </select>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allergiesList.map((allergy) => (
              <label key={allergy} className="flex items-center space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  value={allergy}
                  checked={formData.allergies.includes(allergy)}
                  onChange={handleAllergyChange}
                  className="accent-black-600"
                />
                <span>{allergy}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-black-700 hover:file:bg-blue-100"
          />
          {formData.photoPreview && (
            <img
              src={formData.photoPreview}
              alt="Preview"
              className="mt-4 w-32 h-32 rounded-lg object-cover border border-gray-300"
            />
          )}
        </div>

        {/* Rack Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rack Number</label>
          <input
            type="text"
            name="rackNumber"
            placeholder="Enter rack number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none"
            value={formData.rackNumber}
            onChange={handleChange}
          />
        </div>

        {/* Bus Route */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bus Route</label>
          <select
            name="busRoute"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
            value={formData.busRoute}
            onChange={handleChange}
          >
            <option value="">Select Bus Route</option>
            {busRoutes.map((route) => (
              <option  key={route} value={route}>
                {route}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-black-700 transition duration-300"
          >
            Submit Student Data
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Dataform;
