 import React, {Component} from 'react';
 import './App.css';
 import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
 import Main from './components/main';
 import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <div className="demo-big-content">
          <Layout>
              <Header className="headerColor" title={<Link style = {{textDecoration:'none', color: 'white'}}
              to = "/">SikBao</Link>} scroll>
                  <Navigation>
                      <Link to="/profile">Profile</Link>
                      <Link to="/favorites">Favorites</Link>
                      <Link to="/settings">Settings</Link>
                  </Navigation>
              </Header>
              <Drawer title="SikBao">
                  <Navigation>
                      <Link to="/profile">Profile</Link>
                      <Link to="/favorites">Favorites</Link>
                      <Link to="/settings">Settings</Link>
                  </Navigation>
              </Drawer>
              <Content>
                  <div className="page-content" />
                  <Main/>
              </Content>
          </Layout>
      </div>
    );
  }
}

export default App;
