import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import React, { useState } from 'react';

interface Props {
  index: number;
  errorField?: string;
  ingredients: Array<IIngredient>;
  ingredientRowData: IngredientData;
  deletable: boolean;
  onDeleteIngredientRow: (index: number) => void;
  onIngredientPicked: (index: number, ingredientId: number) => void;
  onAmountChange: (index: number, amount: string) => void;
  onUnitPicked: (index: number, unit: Unit) => void;
}

const useStyles = makeStyles((theme) => ({
  ingredientDataRow: {
    width: '100%',
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-end',
  },
  deleteIngredientRowButton: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
  ingredientSelect: {
    marginLeft: theme.spacing(1),
    width: theme.spacing(20),
  },
  missingDeletePadding: {
    marginLeft: theme.spacing(6),
  },
  ingredientListItemText: {
    marginLeft: theme.spacing(2),
  },
  amountField: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(10),
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
  },
  unitSelect: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(7),
  },
}));

// Extra types
const units = ['oz', 'splash'] as const;
type Unit = typeof units[number];

type IngredientData = {
  ingredientId?: number;
  amount?: string;
  unit?: Unit;
};

function IngredientRowInput(props: Props) {
  const {
    index,
    errorField,
    ingredients,
    ingredientRowData,
    deletable,
    onDeleteIngredientRow,
    onIngredientPicked,
    onAmountChange,
    onUnitPicked,
  } = props;
  const classes = useStyles();
  return (
    <Box className={classes.ingredientDataRow}>
      {deletable && (
        <IconButton
          className={classes.deleteIngredientRowButton}
          size="small"
          onClick={() => onDeleteIngredientRow(index)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
      <FormControl
        className={clsx(classes.ingredientSelect, deletable || classes.missingDeletePadding)}
        error={errorField === `ingredient-row-${index}`}
      >
        <InputLabel>Ingredient</InputLabel>
        <Select
          value={ingredientRowData.ingredientId !== null ? ingredientRowData.ingredientId : ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onIngredientPicked(index, Number(e.target.value))}
          renderValue={(selected) => ingredients.find((i) => i.id == selected).name}
        >
          {ingredients.map(({ id, name, imageUrl }) => {
            return (
              <MenuItem key={`ingredient-menu-item-${id}`} value={id}>
                {imageUrl ? <Avatar src={imageUrl} /> : <Avatar color="primary">{name.charAt(0)}</Avatar>}
                <ListItemText primary={name} className={classes.ingredientListItemText} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          size="small"
          className={classes.amountField}
          value={ingredientRowData.amount != null ? ingredientRowData.amount : '1'}
          label="Amount"
          variant="standard"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAmountChange(index, e.target.value)}
        />
      </FormControl>
      <FormControl size="small" className={classes.unitSelect}>
        <InputLabel>Unit</InputLabel>
        <Select
          value={ingredientRowData.unit != null ? ingredientRowData.unit : 'oz'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUnitPicked(index, toUnit(e.target.value))}
        >
          {units.map((unit) => {
            return (
              <MenuItem key={`unit-menu-item-${unit}`} value={unit}>
                {unit}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

function toUnit(u: string): Unit {
  switch (u) {
    case 'oz':
    case 'splash':
      return u;
  }
  throw new Error(`Unexpected unit: ${u}`);
}

export { IngredientRowInput, IngredientData, Unit, units };
