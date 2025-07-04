import categoriesData from '../mockData/categories.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await delay(250);
    return [...this.categories];
  }

  async getById(id) {
    await delay(200);
    const category = this.categories.find(cat => cat.id === id);
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  }

  async create(categoryData) {
    await delay(300);
    const newCategory = {
      ...categoryData,
      id: Date.now().toString(),
      dealCount: 0
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, categoryData) {
    await delay(300);
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    this.categories[index] = { ...this.categories[index], ...categoryData };
    return { ...this.categories[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    this.categories.splice(index, 1);
    return true;
  }
}

export default new CategoryService();