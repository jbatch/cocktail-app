import { Container, makeStyles, Typography } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import queryString from 'querystring';
import React, { useEffect, useState } from 'react';

import { getIngredients } from '../api';
import { IngredientCard, NewIngredientCard } from '../components/IngredientCard';
import NewIngredientForm from '../components/NewIngredientForm';

type Props = {} & RouteComponentProps;
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
  const { location } = props;
  const classes = useStyles();
  const [ingredients, setIngredients] = useState<Array<IIngredient>>([]);

  // Have to strip '?' from search string.
  const qs = location.search === '' ? '' : location.search.substr(1);
  const query = queryString.parse(qs);
  const makingNewIngredient = 'new' in query;

  const fetchIngredients = async () => {
    const { ingredients } = await getIngredients();
    setIngredients(ingredients);
  };

  // Fetch all ingredients at first render
  useEffect(() => {
    fetchIngredients();
  }, []);

  const showNewIngredientDialog = () => {
    props.navigate('?new');
  };

  const closeNewIngredientDialog = () => {
    props.navigate('');
    fetchIngredients();
  };

  const ingredientListContent = (
    <Container className={classes.ingredientContainer}>
      <NewIngredientCard onClick={showNewIngredientDialog} />
      {ingredients.map((i, index) => (
        <IngredientCard key={`ingredient-card-${index}`} name={i.name} imageUrl={i.imageUrl} />
      ))}
    </Container>
  );

  return (
    <>
      <Typography variant="h4">{makingNewIngredient ? 'New Ingredient' : 'Ingredients'}</Typography>
      {makingNewIngredient ? <NewIngredientForm exitCallback={closeNewIngredientDialog} /> : ingredientListContent}
    </>
  );
}

export default Ingredients;
