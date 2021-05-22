import { Box, Button, Container, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';

import { createRecipe } from '../api';
import { IngredientData, IngredientRowInput, Unit, units } from './IngredientRowInput';
import { RecipeCard } from './RecipeCard';

interface Props {
  exitCallback: () => void;
  ingredients: Array<IIngredient>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
    display: 'flex',
    flexFlow: 'row wrap',
  },
  newIngredientForm: {
    display: 'flex',
    paddingRight: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(4),
  },
  addIngredientRowButton: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function NewIngredientForm(props: Props) {
  const { exitCallback, ingredients } = props;
  const classes = useStyles();
  const [recipeName, setRecipeName] = useState('Martini');
  const [recipeImageUrl, setRecipeImageUrl] = useState('https://www.thecocktaildb.com/images/ingredients/Vodka.png');
  const [ingredientData, setIngredientData] = useState<Array<IngredientData>>([
    { ingredientId: null, amount: '1', unit: 'oz' },
  ]);
  const [errorField, setErrorField] = useState<string>('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setErrorField('');
    setRecipeName(event.target.value);
  };
  const onImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setErrorField('');
    setRecipeImageUrl(event.target.value);
  };
  const addIngredientRow = () => {
    setIngredientData([...ingredientData, { ingredientId: null, amount: '1', unit: 'oz' }]);
  };
  const onDeleteIngredientRow = (deletedIndex: number) => {
    setIngredientData(ingredientData.filter((ingredient, index) => index !== deletedIndex));
  };
  const onIngredientPicked = (index: number, ingredientId: number) => {
    setError('');
    setErrorField('');
    const newIngredientData: Array<IngredientData> = ingredientData.map((i, idx) => {
      if (index !== idx) {
        return i;
      }
      return { ...i, ingredientId };
    });
    setIngredientData(newIngredientData);
  };
  const onAmountChange = (index: number, amount: string) => {
    setError('');
    setErrorField('');
    const floatRegex = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    if (!floatRegex.test(amount) && amount !== '') {
      return;
    }
    const newIngredientData: Array<IngredientData> = ingredientData.map((i, idx) => {
      if (index !== idx) {
        return i;
      }
      return { ...i, amount };
    });
    setIngredientData(newIngredientData);
  };
  const onUnitPicked = (index: number, unit: Unit) => {
    setError('');
    setErrorField('');
    const newIngredientData: Array<IngredientData> = ingredientData.map((i, idx) => {
      if (index !== idx) {
        return i;
      }
      return { ...i, unit };
    });
    setIngredientData(newIngredientData);
  };

  const onCreateClick = () => {
    setError('');
    setErrorField('');
    setSuccess('');

    if (recipeName.length <= 0 || recipeName.length > 50) {
      setError('Invalid recipe name');
      setErrorField('recipeName');
      return;
    }
    for (const [index, ingredientRow] of ingredientData.entries()) {
      if (
        ingredientRow.ingredientId == null ||
        !Number.parseFloat(ingredientRow.amount) ||
        !units.includes(ingredientRow.unit)
      ) {
        console.log({ data: ingredientRow });
        setError('Invalid ingredient');
        setErrorField(`ingredient-row-${index}`);
        return;
      }
    }
    const data = {
      name: recipeName,
      imageUrl: recipeImageUrl,
      ingredients: ingredientData.map(({ ingredientId, amount, unit }) => ({
        ingredientId,
        amount: Number.parseFloat(amount),
        unit,
      })),
    };
    console.log(data);
    createRecipe(data)
      .then(() => {
        setSuccess('Recipe created');
      })
      .catch((e) => {
        if (e.error) {
          setError(e.error);
        } else {
          setError('Unhandled error occured');
        }
      });
  };
  return (
    <Container className={classes.root}>
      <Box display="flex" flexDirection="column" mr={6}>
        <form noValidate autoComplete="off">
          <Box display="flex" flexDirection="column">
            <TextField
              size="small"
              className={classes.textField}
              value={recipeName}
              label="Name"
              variant="outlined"
              onChange={onNameChange}
              error={errorField === 'recipeName'}
            />
            <TextField
              size="small"
              className={classes.textField}
              value={recipeImageUrl}
              label="Image URL"
              variant="outlined"
              onChange={onImageUrlChange}
              error={errorField === 'imageUrl'}
            />
            <Typography variant="h6">Ingredients</Typography>
            {ingredientData.map((i, index) => {
              return (
                <IngredientRowInput
                  index={index}
                  errorField={errorField}
                  ingredients={ingredients}
                  ingredientRowData={i}
                  onDeleteIngredientRow={onDeleteIngredientRow}
                  onIngredientPicked={onIngredientPicked}
                  onAmountChange={onAmountChange}
                  onUnitPicked={onUnitPicked}
                />
              );
            })}
            <IconButton
              color="primary"
              component="span"
              onClick={addIngredientRow}
              className={classes.addIngredientRowButton}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </form>
        <Box display="flex" justifyContent="space-between" width={300} mb={4} mt={2}>
          <Button variant="outlined" color="secondary" onClick={exitCallback}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onCreateClick}>
            Create
          </Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert
            severity="success"
            action={
              <Button color="inherit" size="small" onClick={exitCallback}>
                Done
              </Button>
            }
          >
            {success}
          </Alert>
        )}
      </Box>
      <Box>
        <RecipeCard name={recipeName} imageUrl={recipeImageUrl} showActions={false} />
      </Box>
    </Container>
  );
}

export default NewIngredientForm;
