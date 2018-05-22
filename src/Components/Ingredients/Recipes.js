import React, { Fragment } from 'react';
import { List } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
// Displays recipes based on ingredients selected
export default ({ recipes, foods, linkRecipes }) => (
    <Fragment>
        <List component="ul">
            {foods.map((name) =>
                // ^ Gets all the ingredients currently selected
                recipes.map((recipe) => 
                    // Checks each recipe to see if ingredient is in it
                    recipe.ingredients.map((individual) =>
                        individual.name===name
                        ?
                        // If it is print that recipe
                        < ListItem button key={recipe.name}>
                            <ListItemText
                            primary={recipe.name}
                            onClick={() => linkRecipes(recipe.originalURL)}/>
                        </ListItem>
                        : console.log(name + " " + recipe.ingredients[0 ]) // If not then don't
                    )
                )
            )}
        </List>
    </Fragment>
);