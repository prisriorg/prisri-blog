import { getCollection } from "astro:content";

const categoriesCollection = await getCollection('categories');

export const categoriesHandler = {
    allCategories: () => categoriesCollection,
    oneCategory: (categoryId: string) => {
        const category = categoriesCollection.find((category) => category.id === categoryId);
        if (!category) {
            throw new Error(`Category with id ${categoryId} not found`);
        }
        return category;
    },
}