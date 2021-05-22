import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CancelIcon from '@material-ui/icons/Cancel';
import { getIngredients, getRecipes } from '../api';
import { RecipeCard } from './RecipeCard';
import queryString from 'querystring';
import NewRecipeForm from './NewRecipeForm';

type Props = {} & RouteComponentProps;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
    display: 'flex',
    flexFlow: 'row wrap',
  },
  filterControls: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: theme.spacing(4),
  },
  recipesContainer: {
    marginTop: '30px',
    display: 'flex',
    flexFlow: 'row wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  textField: {
    marginLeft: theme.spacing(4),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  ingredientsFilter: {
    width: theme.spacing(24),
    marginLeft: theme.spacing(4),
  },
  newRecipeButton: {},
}));

export default function Recipes(props: Props) {
  const classes = useStyles();
  const [recipes, setRecipes] = useState<Array<IRecipe>>([]);
  const [ingredients, setIngredients] = useState<Array<IIngredient>>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [ingredientsFilter, setIngredientsFilter] = useState<Array<string>>([]);

  // Have to strip '?' from search string.
  const qs = location.search === '' ? '' : location.search.substr(1);
  const query = queryString.parse(qs);
  const makingNewRecipe = 'new' in query;

  const fetchRecipes = async () => {
    const { recipes } = await getRecipes();
    setRecipes(recipes);
  };

  const fetchIngredients = async () => {
    const { ingredients } = await getIngredients();
    setIngredients(ingredients);
  };

  // Fetch all recipes at first render.
  useEffect(() => {
    fetchRecipes();
    fetchIngredients();
  }, []);

  const handleNewRecipeClick = () => {
    props.navigate('?new');
  };
  const onNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };
  const closeNewRecipe = () => {
    props.navigate('');
    fetchRecipes();
  };
  const onIngredientsFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    const selectedIngredients = (event.target.value as unknown) as Array<string>;
    setIngredientsFilter(selectedIngredients);
  };
  const onIngredientsFilterDelete = (value: string) => {
    // const selectedIngredients = (event.target.value as unknown) as Array<string>;
    setIngredientsFilter(ingredientsFilter.filter((i) => i !== value));
  };

  const filteredRecipes = recipes
    .filter((r) => r.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((r) =>
      ingredientsFilter.every((requiredIngredient) => r.ingredients.map((i) => i.name).includes(requiredIngredient))
    );

  const recipeListContent = (
    <>
      <Container className={classes.filterControls}>
        <Button variant="contained" color="primary" className={classes.newRecipeButton} onClick={handleNewRecipeClick}>
          New Recipe
        </Button>
        <TextField
          size="small"
          className={classes.textField}
          value={nameFilter}
          label="Name"
          variant="outlined"
          onChange={onNameFilterChange}
        />

        <FormControl size="small" className={classes.ingredientsFilter}>
          <InputLabel>Ingredients</InputLabel>
          <Select
            multiple
            value={ingredientsFilter}
            onChange={onIngredientsFilterChange}
            IconComponent={KeyboardArrowDownIcon}
            renderValue={(selected) => (
              <div>
                {(selected as string[]).map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    clickable
                    className={classes.chip}
                    deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                    onDelete={() => onIngredientsFilterDelete(value)}
                  />
                ))}
              </div>
            )}
          >
            {ingredients.map((i) => (
              <MenuItem key={i.name} value={i.name}>
                <Checkbox checked={ingredientsFilter.includes(i.name)} />
                <ListItemText primary={i.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      <Container className={classes.recipesContainer}>
        {filteredRecipes.map((r) => (
          <RecipeCard key={r.id} name={r.name} imageUrl={r.imageUrl} />
        ))}
      </Container>
    </>
  );
  return (
    <>
      <Typography variant="h4">Recipes</Typography>
      {makingNewRecipe ? <NewRecipeForm exitCallback={closeNewRecipe} ingredients={ingredients} /> : recipeListContent}
    </>
  );
}
