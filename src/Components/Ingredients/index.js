import React, {Fragment } from 'react';
import { Grid, Paper, Typography, List, TextField } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
import Button from "material-ui/Button";
import Checkbox from 'material-ui/Checkbox';


const styles = {
  Paper: { 
    padding: 20, 
    marginTop: 10, 
    marginBottom: 10, 
    height:500, 
    overflowY:'auto'
    }
};

export default ({
    ingredients,
    foods,
    onSelect,
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
                />
                <br />
                {ingredients.map(([foodtypes, ingredients]) =>
                    <Fragment>
                        <Button>
                        <Typography 
              variant="headline"
                            style={{ textTransform: 'capitalize', textTransform: 'bold' }}
                        >{foodtypes}
                        </Typography>
                            </Button>
            <List component="ul">
                            {ingredients.map(({ id, name }) => 
                                    <ListItem button>
                                        <ListItemText
                                            primary={name}
                                            onClick={() => onSelect(id)} />
                                    </ListItem>
                            )}
            </List>
          </Fragment>
        )}
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
                                <ListItem button>
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
                                Please input or select an ingredient.
                            </Typography>
                            </Fragment>
                }
      </Paper>
    </Grid>
  </Grid>


