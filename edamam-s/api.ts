import { EDAMAM_CONFIG, RECIPE_LIMIT } from './config';
import { ApiResponse } from './types';

export const searchRecipes = async (ingredients: string): Promise<ApiResponse> => {
  const { appId, appKey, baseUrl } = EDAMAM_CONFIG;
  
  const response = await fetch(
    `${baseUrl}/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}&from=0&to=${RECIPE_LIMIT}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
};