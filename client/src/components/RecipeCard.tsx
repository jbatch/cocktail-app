import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';

interface Props {
  name: string;
  imageUrl: string;
  showActions?: boolean;
  onClick?: () => void;
}

const useStyles = makeStyles((theme) => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    maxWidth: '250px',
    maxHeight: '250px',
    minWidth: '200px',
    minHeight: '200px',
    marginRight: '30px',
    marginBottom: '30px',
  },
  cardHeader: {
    padding: theme.spacing(1),
  },
  avatar: {
    backgroundColor: 'red',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  media: {
    height: 0,
    paddingTop: '56.23%', // 56.23 = 16:9
    backgroundSize: 'cover', // contain
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
  const { name, imageUrl, showActions = true, onClick } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card} onClick={() => onClick && onClick()}>
      <CardHeader className={classes.cardHeader} title={name} titleTypographyProps={{ variant: 'subtitle1' }} />
      <CardMedia className={classes.media} image={imageUrl} title={name} />
      <CardContent></CardContent>
      {showActions && (
        <CardActions disableSpacing>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}

export { RecipeCard };
