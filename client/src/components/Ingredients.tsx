import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getIngredients } from '../api';

import { IngredientCard, NewIngredientCard } from './IngredientCard';

interface Props {}

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '300px',
    maxHeight: '300px',
    minWidth: '300px',
    minHeight: '300px',
    marginRight: '30px',
    marginBottom: '30px',
  },
  ingredientContainer: {
    marginTop: '30px',
    display: 'flex',
    flexFlow: 'row wrap',
  },
}));
function Ingredients(props: Props) {
  const {} = props;
  const classes = useStyles();
  const [ingredients, setIngredients] = useState<Array<IIngredient>>([]);

  const fetchIngredients = async () => {
    const { ingredients } = await getIngredients();
    setIngredients(ingredients);
  };

  // Fetch all ingredients at first render
  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <>
      <Typography variant="h4">Ingredients</Typography>
      <Container className={classes.ingredientContainer}>
        <NewIngredientCard />
        {ingredients.map((i) => (
          <IngredientCard name={i.name} imageUrl={i.imageUrl} />
        ))}
      </Container>
    </>
  );
}

export default Ingredients;
