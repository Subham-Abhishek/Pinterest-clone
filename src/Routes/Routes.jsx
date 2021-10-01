import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { FeedsPage } from '../Pages/FeedsPage'

export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <FeedsPage/>
            </Route>
        </Switch>
    )
}
