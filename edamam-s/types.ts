export interface Recipe {
  recipe: {
    label: string;
    image: string;
    ingredientLines: string[];
    uri: string;
  };
}

export interface ApiResponse {
  hits: Recipe[];
}

export interface EdamamApiKeys {
  appId: string;
  appKey: string;
}