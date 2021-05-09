import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import clsx from 'clsx';

interface Props {
  name: string;
  imageUrl: string;
}

const useStyles = makeStyles((theme) => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    maxWidth: '300px',
    maxHeight: '300px',
    minWidth: '300px',
    minHeight: '300px',
    marginRight: '30px',
    marginBottom: '30px',
  },
  avatar: {
    backgroundColor: 'red',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  },
  newIngredientCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newIngredientButton: {
    color: 'blue',
  },
}));

function IngredientCard(props: Props) {
  const { name, imageUrl } = props;
  const firstLetter = name.charAt(0);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="ingredient" className={classes.avatar}>
            {firstLetter}
          </Avatar>
        }
        title={name}
      />
      <CardMedia className={classes.media} image={imageUrl} title={name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

function NewIngredientCard() {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, classes.newIngredientCard)}>
      <CardContent className={classes.column}>
        <IconButton>
          <AddCircleIcon style={{ fontSize: 80 }} color="primary" />
        </IconButton>
        <Typography variant="body2" color="textSecondary" component="p">
          New Ingredient
        </Typography>
      </CardContent>
    </Card>
  );
}

export { IngredientCard, NewIngredientCard };
