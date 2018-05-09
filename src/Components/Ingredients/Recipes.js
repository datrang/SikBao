import React, { Fragment } from 'react';
import { Grid, Paper, Typography, List } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
import Button from "material-ui/Button";
import Checkbox from 'material-ui/Checkbox';

// Displays recipes based on ingredients selected
export default ({ recipes, foods }) => (
    <Fragment>

        <List component="ul">
            {foods.map((name) => 
                // ^ Gets all the ingredients currently selected
                recipes.map((recipe) =>
                    // Checks each recipe to see if ingredient is in it
                    recipe.ingredientID.includes(name)
                        ?
                        // If it is print that recipe
                            < ListItem button>
                                <ListItemText
                                    primary={recipe.name} />
                        </ListItem>
                        : null // If not then don't
                    
                
                )
            )}
            </List>
    </Fragment>
);