import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import dealService from '../services/api/dealService';
import categoryService from '../services/api/categoryService';
import platformService from '../services/api/platformService';

const FormField = ({ label, children, error }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    {children}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-error text-sm flex items-center space-x-1"
      >
        <ApperIcon name="AlertCircle" size={14} />
        <span>{error}</span>
      </motion.p>
    )}
  </div>
);

const AddDeal = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    platform: '',
    purchasePrice: '',
    regularPrice: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    category: '',
    status: 'active',
    description: '',
    accessUrl: '',
    notes: '',
    logoUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [savings, setSavings] = useState({ amount: 0, percentage: 0 });

  useEffect(() => {
    const loadSelectOptions = async () => {
      try {
        const [categoriesData, platformsData] = await Promise.all([
          categoryService.getAll(),
          platformService.getAll()
        ]);
        setCategories(categoriesData);
        setPlatforms(platformsData);
      } catch (err) {
        toast.error('Failed to load form options');
      }
    };
    loadSelectOptions();
  }, []);

  // Calculate savings whenever prices change
  useEffect(() => {
    const purchase = parseFloat(formData.purchasePrice) || 0;
    const regular = parseFloat(formData.regularPrice) || 0;
    
    if (purchase > 0 && regular > 0) {
      const savingsAmount = regular - purchase;
      const savingsPercentage = Math.round((savingsAmount / regular) * 100);
      setSavings({ amount: savingsAmount, percentage: savingsPercentage });
    } else {
      setSavings({ amount: 0, percentage: 0 });
    }
  }, [formData.purchasePrice, formData.regularPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.platform) {
      newErrors.platform = 'Platform is required';
    }

    if (!formData.purchasePrice || parseFloat(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = 'Valid purchase price is required';
    }

    if (!formData.regularPrice || parseFloat(formData.regularPrice) <= 0) {
      newErrors.regularPrice = 'Valid regular price is required';
    }

    if (parseFloat(formData.purchasePrice) >= parseFloat(formData.regularPrice)) {
      newErrors.purchasePrice = 'Purchase price must be less than regular price';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    }

    if (formData.accessUrl && !isValidUrl(formData.accessUrl)) {
      newErrors.accessUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setLoading(true);
    try {
      const dealData = {
        ...formData,
        purchasePrice: parseFloat(formData.purchasePrice),
        regularPrice: parseFloat(formData.regularPrice)
      };

      await dealService.create(dealData);
      toast.success('Deal added successfully!');
      navigate('/deals');
    } catch (err) {
      toast.error('Failed to add deal');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <button
            onClick={handleCancel}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={20} className="text-gray-400 hover:text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Add New Deal</h1>
            <p className="text-gray-400">Track your latest SaaS lifetime deal purchase</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-surface rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <ApperIcon name="Package" size={20} />
                <span>Basic Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Product Name *" error={errors.productName}>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                  />
                </FormField>

                <FormField label="Platform *" error={errors.platform}>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select platform</option>
                    {platforms.map(platform => (
                      <option key={platform.id} value={platform.name}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Category *" error={errors.category}>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Status" error={errors.status}>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending Activation</option>
                    <option value="expired">Expired</option>
                  </select>
                </FormField>
              </div>

              <FormField label="Description" error={errors.description}>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the product"
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </FormField>
            </div>

            {/* Pricing Information */}
            <div className="bg-surface rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <ApperIcon name="DollarSign" size={20} />
                <span>Pricing Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Purchase Price *" error={errors.purchasePrice}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      name="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </FormField>

                <FormField label="Regular Price *" error={errors.regularPrice}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      name="regularPrice"
                      value={formData.regularPrice}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </FormField>

                <FormField label="Purchase Date *" error={errors.purchaseDate}>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
                  />
                </FormField>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-surface rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <ApperIcon name="Link" size={20} />
                <span>Additional Information</span>
              </h3>
              
              <div className="space-y-4">
                <FormField label="Access URL" error={errors.accessUrl}>
                  <input
                    type="url"
                    name="accessUrl"
                    value={formData.accessUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                  />
                </FormField>

                <FormField label="Notes" error={errors.notes}>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any additional notes or credentials"
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </FormField>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="flex-1 bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-2">
                  {loading ? (
                    <ApperIcon name="Loader2" size={20} className="animate-spin" />
                  ) : (
                    <ApperIcon name="Save" size={20} />
                  )}
                  <span>{loading ? 'Adding Deal...' : 'Add Deal'}</span>
                </div>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-none glass-morphism text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ApperIcon name="X" size={20} />
                  <span>Cancel</span>
                </div>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Savings Preview */}
          <div className="bg-surface rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <ApperIcon name="PiggyBank" size={20} />
              <span>Savings Preview</span>
            </h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">
                  ${savings.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Total Savings</div>
              </div>
              
              {savings.percentage > 0 && (
                <div className="text-center">
                  <div className="bg-success/20 text-success px-4 py-2 rounded-lg inline-block">
                    {savings.percentage}% OFF
                  </div>
                </div>
              )}
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Regular Price:</span>
                  <span className="text-white">${formData.regularPrice || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Purchase Price:</span>
                  <span className="text-white">${formData.purchasePrice || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-surface rounded-2xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <ApperIcon name="Lightbulb" size={20} />
              <span>Tips</span>
            </h3>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>Double-check the regular price to accurately calculate savings</span>
              </div>
              <div className="flex items-start space-x-2">
                <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>Include access credentials in notes for easy reference</span>
              </div>
              <div className="flex items-start space-x-2">
                <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>Use clear, descriptive names for easy searching</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddDeal;