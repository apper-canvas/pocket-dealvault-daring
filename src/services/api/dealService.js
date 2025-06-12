import dealsData from '../mockData/deals.json';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function DealService() {
  const deals = [...dealsData];

  const getStats = async () => {
    await delay(300);
    
if (deals.length === 0) {
      return {
        totalSpent: 0,
        totalSaved: 0,
        activeDeals: 0,
        totalDeals: 0,
        averageDealValue: 0,
        savingsPercentage: 0,
        refundRate: 0,
        unusedLTDs: 0,
        failedLTDs: 0
      };
    }

    const totalSpent = deals.reduce((sum, deal) => sum + (deal.salePrice || 0), 0);
    const totalOriginal = deals.reduce((sum, deal) => sum + (deal.totalPrice || 0), 0);
    const totalSaved = totalOriginal - totalSpent;
    const savingsPercentage = totalOriginal > 0 ? Math.round((totalSaved / totalOriginal) * 100) : 0;
    
    const activeDeals = deals.filter(deal => deal.status === 'active').length;
    const totalDeals = deals.length;
    const averageDealValue = totalSpent / totalDeals;
    
    // New metrics calculations
    const refundRate = 5.0; // Fixed refund rate percentage
    const unusedLTDs = deals.filter(deal => deal.status === 'expired').length;
    const failedLTDs = deals.filter(deal => deal.status === 'cancelled').length;

    return {
      totalSpent,
      totalSaved,
      activeDeals,
      totalDeals,
      averageDealValue,
      savingsPercentage,
      refundRate,
      unusedLTDs,
      failedLTDs
    };
  };

  const getAll = async () => {
    await delay(200);
    return [...deals];
  };

  const getById = async (id) => {
    await delay(200);
    const deal = deals.find(deal => deal.id === id);
    if (!deal) {
      throw new Error('Deal not found');
    }
    return { ...deal };
  };

  const create = async (dealData) => {
    await delay(400);
    const newDeal = {
      ...dealData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    deals.push(newDeal);
    return { ...newDeal };
  };

  const update = async (id, dealData) => {
    await delay(350);
    const index = deals.findIndex(deal => deal.id === id);
    if (index === -1) {
      throw new Error('Deal not found');
    }
    deals[index] = { ...deals[index], ...dealData, updatedAt: new Date().toISOString() };
    return { ...deals[index] };
  };

  const deleteDeal = async (id) => {
    await delay(250);
    const index = deals.findIndex(deal => deal.id === id);
    if (index === -1) {
      throw new Error('Deal not found');
    }
    deals.splice(index, 1);
    return true;
  };

  const getByCategory = async (category) => {
    await delay(300);
    return deals.filter(deal => deal.category === category);
  };

  const getByStatus = async (status) => {
    await delay(300);
    return deals.filter(deal => deal.status === status);
  };

  const getByPlatform = async (platform) => {
    await delay(300);
    return deals.filter(deal => deal.platform === platform);
  };

  const search = async (query) => {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return deals.filter(deal => 
      deal.productName?.toLowerCase().includes(lowercaseQuery) ||
      deal.description?.toLowerCase().includes(lowercaseQuery) ||
      deal.category?.toLowerCase().includes(lowercaseQuery) ||
      deal.platform?.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    getStats,
    getAll,
    getById,
    create,
    update,
    delete: deleteDeal,
    getByCategory,
    getByStatus,
    getByPlatform,
    search
  };
}

export default new DealService();