import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { getRecipe } from '../api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 0,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(35),
    flexShrink: 1,
  },
}));

type Props = { recipeId?: number } & RouteComponentProps;

export default function RecipePage(props: Props) {
  const classes = useStyles();

  const { recipeId } = props;
  const [recipe, setRecipe] = useState<IRecipe>(null);

  const fetchRecipe = async () => {
    const { recipe } = await getRecipe(recipeId);
    setRecipe(recipe);
  };

  // Fetch all ingredients at first render
  useEffect(() => {
    fetchRecipe();
  }, []);

  if (!recipe) {
    return <></>;
  }

  const method = recipe.method.split('\n');
  return (
    <>
      <Typography variant="h2">{recipe.name}</Typography>
      <Container className={classes.root}>
        <Box className={classes.column}>
          <Typography variant="h5">Ingredients</Typography>
          {recipe.ingredients.map(ingredientToRow)}
        </Box>
        <Box className={classes.column}>
          <Typography variant="h5">Method</Typography>
          {method.map(methodStepToRow)}
        </Box>
      </Container>
    </>
  );
}

function ingredientToRow(ingredient: IRecipeIngredient, index: number) {
  const unitSpace = ingredient.unit === 'oz' ? ' ' : '';
  const hasDecimalPart = ingredient.amount - Math.floor(ingredient.amount) > 0;
  const amount = hasDecimalPart ? ingredient.amount : Math.floor(ingredient.amount);
  return (
    <Typography key={`ingredient-${index}`}>{`${amount}${unitSpace}${ingredient.unit} ${ingredient.name}`}</Typography>
  );
}

function methodStepToRow(methodStep: string, index: number) {
  return <Typography key={`method-step-${index}`}>{`${index + 1}. ${methodStep}`}</Typography>;
}
