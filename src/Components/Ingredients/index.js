import React, {Fragment } from 'react';
import { Grid, Paper, Typography, List, TextField } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
import Button from "material-ui/Button";
import blue from 'material-ui/colors/red';

const styles = {
    Paper: { 
        padding: 20, 
        marginTop: 10, 
        marginBottom: 10, 
        height:500, 
        overflowY:'auto'
    },
    inputStyle: {
        color: blue
    }
};

export default ({
    ingredients,
    selectedFoodTypes,
    foods,
    onSelect,
    onHide,
    onDisplay,
    onRemoval,
    keyPress,
    searching
    }) =>
    <Grid container>
        <Grid item sm>
            <Paper style={styles.Paper} >
                <TextField
                    id="userInput1"
                    onChange={() => searching()}
                /><br />
                {ingredients
                    ?
                        ingredients.map(([foodtypes, ingredients]) =>
                            // Checks if that food type is to be displayed
                            selectedFoodTypes.includes(foodtypes)
                                ? // If so print the food type and its ingredients
                                <Fragment key={foodtypes}>
                                    <Button
                                        key={foodtypes}
                                        onClick={() => onHide(foodtypes)}>
                                        <Typography
                                            variant="headline"
                                            style={{ textTransform: 'capitalize bold' }}
                                        >{foodtypes}
                                        </Typography>
                                    </Button>
                                    <List component="ul">
                                        {ingredients.map(({ id, name }) =>
                                            <ListItem button key={id}>
                                                <ListItemText
                                                    primary={name}
                                                    onClick={() => onSelect(id)} />
                                            </ListItem>
                                        )}
                                    </List>
                                </Fragment>
                                : // If not display the food type so users can show if they want
                                <Fragment key={foodtypes}>
                                    <Button
                                        key={foodtypes}
                                        onClick={() => onDisplay(foodtypes)}>
                                        <Typography
                                            variant="headline"
                                            style={{ textTransform: 'capitalize bold' }}
                                        >{foodtypes}
                                        </Typography>
                                    </Button>
                                    <br />
                                </Fragment>
                    )
                    : <span>No ingredients contain {document.getElementById('userInput1').value}</span>
                    }
            </Paper>
    </Grid>
         
    <Grid item sm>
        <Paper style={styles.Paper} >
            {foods.length
                ?
                <Fragment>
                    <Typography
                        variant="display1"
                    >
                        Ingredients Selected:
                    </Typography>
                    <List component="ul">
                        {foods.map((food) =>
                            <ListItem button key={food.slice(0, 1).toUpperCase() + food.slice(1, food.length)}>
                                <ListItemText
                                    primary={food.slice(0, 1).toUpperCase() + food.slice(1, food.length)}
                                        onClick={() => onRemoval(food)} />
                                </ListItem>
                        )}
                    </List>
                </Fragment>
                        :
                <Fragment>
                    <Typography
                        variant="display1"
                    >
                        Welcome my dude!
                    </Typography>
                    <Typography
                        variant="subheading"
                        style={{ marginTop: 20 }}
                    >
                        Please input or select an ingredient on the left side.
                    </Typography>
                </Fragment>
}
      </Paper>
    </Grid>
  </Grid>


