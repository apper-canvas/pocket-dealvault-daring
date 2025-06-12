import dealsData from '../mockData/deals.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DealService {
  constructor() {
    this.deals = [...dealsData];
  }

  async getAll() {
    await delay(300);
    return [...this.deals];
  }

  async getById(id) {
    await delay(200);
    const deal = this.deals.find(deal => deal.id === id);
    if (!deal) {
      throw new Error('Deal not found');
    }
    return { ...deal };
  }

  async create(dealData) {
    await delay(400);
    const newDeal = {
      ...dealData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    this.deals.push(newDeal);
    return { ...newDeal };
  }

  async update(id, dealData) {
    await delay(350);
    const index = this.deals.findIndex(deal => deal.id === id);
    if (index === -1) {
      throw new Error('Deal not found');
    }
    this.deals[index] = { ...this.deals[index], ...dealData, updatedAt: new Date().toISOString() };
    return { ...this.deals[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.deals.findIndex(deal => deal.id === id);
    if (index === -1) {
      throw new Error('Deal not found');
    }
    this.deals.splice(index, 1);
    return true;
  }

  async getByCategory(category) {
    await delay(300);
    return this.deals.filter(deal => deal.category === category);
  }

  async getByStatus(status) {
    await delay(300);
    return this.deals.filter(deal => deal.status === status);
  }

  async getByPlatform(platform) {
    await delay(300);
    return this.deals.filter(deal => deal.platform === platform);
  }

  async search(query) {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return this.deals.filter(deal => 
      deal.productName.toLowerCase().includes(lowercaseQuery) ||
      deal.description.toLowerCase().includes(lowercaseQuery) ||
      deal.category.toLowerCase().includes(lowercaseQuery) ||
      deal.platform.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getStats() {
    await delay(200);
    const totalSpent = this.deals.reduce((sum, deal) => sum + deal.purchasePrice, 0);
    const totalRegularPrice = this.deals.reduce((sum, deal) => sum + deal.regularPrice, 0);
    const totalSaved = totalRegularPrice - totalSpent;
    const activeDeals = this.deals.filter(deal => deal.status === 'active').length;
    const averageDealValue = this.deals.length > 0 ? totalSpent / this.deals.length : 0;

    return {
      totalSpent,
      totalSaved,
      activeDeals,
      totalDeals: this.deals.length,
      averageDealValue,
      savingsPercentage: totalRegularPrice > 0 ? Math.round((totalSaved / totalRegularPrice) * 100) : 0
    };
  }
}

export default new DealService();