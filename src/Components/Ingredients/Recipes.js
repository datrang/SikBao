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
                 
                            secondary = {recipe.steps}

                            onClick={() => linkRecipes(recipe.originalURL)}/>
                             <img src= {recipe.imageURL}  alt="test123" height = "50%" width = "50%" />

         
                        </ListItem>
                        : console.log(name + " " + recipe.ingredients[0 ]) // If not then don't
                    )
                )
            )}
        </List>
    </Fragment>
);


