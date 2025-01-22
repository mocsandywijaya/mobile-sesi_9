// router.ts
export type StackParamList = {
  GetStarted: undefined;
  Home: { userId?: string };
  SignUp: undefined;
  RecipeDetail:  {
    id: number;
    title: string;
    image: any;
    ingredients: string[];
    instructions: string[];
  };
}
