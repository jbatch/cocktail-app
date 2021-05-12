import { Box, Button, Container, makeStyles, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';

import { IngredientCard } from './IngredientCard';
import { createIngredient } from '../api';

interface Props {
  exitCallback: () => void;
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
}));

function NewIngredientForm(props: Props) {
  const { exitCallback } = props;
  const classes = useStyles();
  const [ingredientName, setIngredientName] = useState('Vodka');
  const [ingredientImageUrl, setIngredientImageUrl] = useState(
    'https://www.thecocktaildb.com/images/ingredients/Vodka.png'
  );
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientName(event.target.value);
  };
  const onImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredientImageUrl(event.target.value);
  };

  const onCreateClick = () => {
    setError('');
    setSuccess('');
    // TODO Validate inputs before posting
    createIngredient({ name: ingredientName, imageUrl: ingredientImageUrl })
      .then(() => {
        setSuccess('Ingredient created');
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
              className={classes.textField}
              value={ingredientName}
              label="Name"
              variant="outlined"
              onChange={onNameChange}
            />
            <TextField
              className={classes.textField}
              value={ingredientImageUrl}
              label="Image URL"
              variant="outlined"
              onChange={onImageUrlChange}
            />
          </Box>
        </form>
        <Box display="flex" justifyContent="space-between" width={300} mb={4}>
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
        <IngredientCard name={ingredientName} imageUrl={ingredientImageUrl} />
      </Box>
    </Container>
  );
}

export default NewIngredientForm;
