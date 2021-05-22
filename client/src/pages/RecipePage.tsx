import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { getRecipe } from '../api';

const useStyles = makeStyles((theme) => ({
  red: {
    backgroundColor: 'red',
  },
}));

type Props = { recipeId?: number } & RouteComponentProps;

export default function RecipePage(props: Props) {
  const classes = useStyles();

  const { recipeId } = props;
  const [recipe, setRecipe] = useState<IRecipe>(null);

  const fetchRecipe = async () => {
    const { recipe } = await getRecipe(recipeId);
    console.log(recipe);
    setRecipe(recipe);
  };

  // Fetch all ingredients at first render
  useEffect(() => {
    fetchRecipe();
  }, []);

  return <div className={classes.red}>{JSON.stringify(recipe)}</div>;
}
