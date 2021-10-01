import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { FeedsPage } from '../Pages/FeedsPage'
import { PinDetails } from '../Pages/PinDetails'

export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <FeedsPage/>
            </Route>
            <Route path='/pin/:id'>
                <PinDetails/>
            </Route>
        </Switch>
    )
}
