import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { FeedsPage } from '../Pages/FeedsPage'
import { PinDetails } from '../Pages/PinDetails'
import { Landing } from '../Components/landingPage/grid'

export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <FeedsPage/>
            </Route>
            <Route path='/pin/:id'>
                <PinDetails/>
            </Route>
            <Route path='/avinash'>
                <Landing/>
            </Route>
        </Switch>
    )
}
