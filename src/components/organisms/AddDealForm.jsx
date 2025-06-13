import React, { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'
import MotionDiv from '@/components/atoms/MotionDiv'
import ApperIcon from '@/components/ApperIcon'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import SearchableSelect from '@/components/atoms/SearchableSelect'
import TextArea from '@/components/atoms/TextArea'
import Span from '@/components/atoms/Span'
import FormField from '@/components/molecules/FormField'
import AnimatedButton from '@/components/molecules/AnimatedButton'
import BaseCard from '@/components/atoms/BaseCard'
import dealService from '@/services/api/dealService'
import categoryService from '@/services/api/categoryService'
import platformService from '@/services/api/platformService'
import { toast } from 'react-toastify'
const AddDealForm = ({ onDealAdded, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({
    productName: '',
    platform: '',
    purchasePrice: '',
    regularPrice: '',
    purchaseDate: format(new Date(), 'MM/dd/yyyy'),
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
        // Set default values if available
        if (categoriesData.length > 0) {
          setFormData(prev => ({ ...prev, category: categoriesData[0].name }));
        }
        if (platformsData.length > 0) {
          setFormData(prev => ({ ...prev, platform: platformsData[0].name }));
        }
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
    
    // Handle date format conversion for purchaseDate
    if (name === 'purchaseDate') {
      // Convert mm/dd/yyyy to ISO format for internal storage
      try {
        const parsedDate = parse(value, 'MM/dd/yyyy', new Date());
        const isoDate = parsedDate.toISOString().split('T')[0];
        setFormData(prev => ({
          ...prev,
          [name]: value, // Keep display format
          purchaseDateISO: isoDate // Store ISO format for backend
        }));
      } catch (error) {
        // If parsing fails, just store the value as-is
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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
      onDealAdded(); // Callback to parent (page)
    } catch (err) {
      toast.error('Failed to add deal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <MotionDiv
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-2"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <BaseCard>
            <Heading level={3} className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <ApperIcon name="Package" size={20} />
              <span>Basic Information</span>
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Product Name *" error={errors.productName}>
                <Input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </FormField>

              <FormField label="Platform *" error={errors.platform}>
                <Select
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                >
                  <option value="">Select platform</option>
                  {platforms.map(platform => (
                    <option key={platform.id} value={platform.name}>
                      {platform.name}
                    </option>
                  ))}
                </Select>
              </FormField>

<FormField label="Category *" error={errors.category}>
                <SearchableSelect
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  options={categories}
                  placeholder="Search and select category"
                />
              </FormField>

              <FormField label="Status" error={errors.status}>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending Activation</option>
                  <option value="expired">Expired</option>
                </Select>
              </FormField>
            </div>

            <FormField label="Description" error={errors.description}>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the product"
                rows="3"
              />
            </FormField>
          </BaseCard>

          {/* Pricing Information */}
          <BaseCard>
            <Heading level={3} className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <ApperIcon name="DollarSign" size={20} />
              <span>Pricing Information</span>
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Purchase Price *" error={errors.purchasePrice}>
                <div className="relative">
                  <Span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</Span>
                  <Input
                    type="number"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="pl-8 pr-4"
                  />
                </div>
              </FormField>

              <FormField label="Regular Price *" error={errors.regularPrice}>
                <div className="relative">
                  <Span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</Span>
                  <Input
                    type="number"
                    name="regularPrice"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="pl-8 pr-4"
                  />
                </div>
              </FormField>

<FormField label="Purchase Date * (MM/DD/YYYY)" error={errors.purchaseDate}>
                <Input
                  type="text"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  placeholder="MM/DD/YYYY"
                />
              </FormField>
            </div>
          </BaseCard>

          {/* Additional Information */}
          <BaseCard>
            <Heading level={3} className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <ApperIcon name="Link" size={20} />
              <span>Additional Information</span>
            </Heading>
            
            <div className="space-y-4">
              <FormField label="Access URL" error={errors.accessUrl}>
                <Input
                  type="url"
                  name="accessUrl"
                  value={formData.accessUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </FormField>

              <FormField label="Notes" error={errors.notes}>
                <TextArea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional notes or credentials"
                  rows="3"
                />
              </FormField>
            </div>
          </BaseCard>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <AnimatedButton
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-primary text-white"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              icon={loading ? 'Loader2' : 'Save'}
              iconClassName={loading ? 'animate-spin' : ''}
            >
              {loading ? 'Adding Deal...' : 'Add Deal'}
            </AnimatedButton>

            <AnimatedButton
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-none glass-morphism text-white hover:bg-white/20"
              shadowClass=""
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              icon="X"
            >
              Cancel
            </AnimatedButton>
          </div>
        </form>
      </MotionDiv>

      {/* Sidebar */}
      <MotionDiv
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Savings Preview */}
        <BaseCard>
          <Heading level={3} className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <ApperIcon name="PiggyBank" size={20} />
            <span>Savings Preview</span>
          </Heading>
          
          <div className="space-y-4">
            <div className="text-center">
              <Heading level={2} className="text-3xl font-bold text-success mb-2">
                ${savings.amount.toFixed(2)}
              </Heading>
              <Paragraph className="text-sm text-gray-400">Total Savings</Paragraph>
            </div>
            
            {savings.percentage > 0 && (
              <div className="text-center">
                <Span className="bg-success/20 text-success px-4 py-2 rounded-lg inline-block">
                  {savings.percentage}% OFF
                </Span>
              </div>
            )}
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <Span className="text-gray-400">Regular Price:</Span>
                <Span className="text-white">${formData.regularPrice || '0.00'}</Span>
              </div>
              <div className="flex justify-between">
                <Span className="text-gray-400">Purchase Price:</Span>
                <Span className="text-white">${formData.purchasePrice || '0.00'}</Span>
              </div>
            </div>
          </div>
        </BaseCard>

        {/* Tips */}
        <BaseCard>
          <Heading level={3} className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <ApperIcon name="Lightbulb" size={20} />
            <span>Tips</span>
          </Heading>
          
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <Paragraph>Double-check the regular price to accurately calculate savings</Paragraph>
            </div>
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <Paragraph>Include access credentials in notes for easy reference</Paragraph>
            </div>
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <Paragraph>Use clear, descriptive names for easy searching</Paragraph>
            </div>
          </div>
        </BaseCard>
      </MotionDiv>
    </div>
  );
};

export default AddDealForm;