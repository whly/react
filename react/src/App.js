import React, { Component } from 'react';
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CRUD from './components/contents/CRUD'
import Search from './components/contents/Search'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Header />
        <hr />
        <div className="container">
          <Nav />
          <hr />
          <div className="contents">
            <section>
              <Switch>
                  <Route exact={true} path="/crud" render={props => <CRUD {...props} testProps={true} />} />
                  <Route exact={true} path="/search" component={Search} />
                  {/* <Route component={CRUD} /> */}
                  <Redirect to={{pathname: "/crud"}} />
              </Switch>
            </section>
          </div>
          <hr />
        </div>
        <Footer />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
