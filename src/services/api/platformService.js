import platformsData from '../mockData/platforms.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PlatformService {
  constructor() {
    this.platforms = [...platformsData];
  }

  async getAll() {
    await delay(250);
    return [...this.platforms];
  }

  async getById(id) {
    await delay(200);
    const platform = this.platforms.find(plat => plat.id === id);
    if (!platform) {
      throw new Error('Platform not found');
    }
    return { ...platform };
  }

  async create(platformData) {
    await delay(300);
    const newPlatform = {
      ...platformData,
      id: Date.now().toString(),
      dealCount: 0,
      totalSpent: 0
    };
    this.platforms.push(newPlatform);
    return { ...newPlatform };
  }

  async update(id, platformData) {
    await delay(300);
    const index = this.platforms.findIndex(plat => plat.id === id);
    if (index === -1) {
      throw new Error('Platform not found');
    }
    this.platforms[index] = { ...this.platforms[index], ...platformData };
    return { ...this.platforms[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.platforms.findIndex(plat => plat.id === id);
    if (index === -1) {
      throw new Error('Platform not found');
    }
    this.platforms.splice(index, 1);
    return true;
  }
}

export default new PlatformService();