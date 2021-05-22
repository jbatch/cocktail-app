import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';

interface Props {
  name: string;
  imageUrl: string;
  showActions?: boolean;
}

const useStyles = makeStyles((theme) => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
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

function RecipeCard(props: Props) {
  const { name, imageUrl, showActions = true } = props;
  const firstLetter = name.charAt(0);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
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
      {showActions && (
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}

export { RecipeCard };
