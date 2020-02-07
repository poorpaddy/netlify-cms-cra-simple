import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostSection from './components/PostSection';
import data from './data.json';
import { slugify } from './utils/url';
import './App.css';
import SinglePost from './components/SinglePost';

console.log('data json ', data);
class App extends Component {

  state = {
    data
  }

  getDocument = (collection, name) =>
    this.state.data[collection] &&
    this.state.data[collection].filter(page => page.name === name)[0]

  getDocuments = collection => this.state.data[collection] || []

  render() {
    const posts = this.getDocuments('posts').filter(
      post => post.status !== 'Draft'
    )

    const Home = () => (
      <div>
        <h3 style={{ textAlign: 'center' }}>Blog</h3>
        <PostSection posts={posts} />
      </div>
    )

    const RouteWithMeta = ({ component: Component, ...props }) => (
      <Route
        {...props}
        render={routeProps => (
          <Fragment>
            <Component {...routeProps} {...props} />
          </Fragment>
        )}
      />
    )

    return (
      <div>
        <Switch>

         <Route
            exact
            path="/"
            render={() => <Home />}
          />
          <Route
            exact
            path="/blog"
            render={() => <Home />}
          />
          {posts.map((post, index) => {
              const path = slugify(`/blog/${post.title}`)
              const nextPost = posts[index - 1]
              const prevPost = posts[index + 1]
              return (
                <RouteWithMeta
                  key={path}
                  path={path}
                  exact
                  component={SinglePost}
                  fields={post}
                  nextPostURL={nextPost && slugify(`/blog/${nextPost.title}/`)}
                  prevPostURL={prevPost && slugify(`/blog/${prevPost.title}/`)}
                />
              )
            })}
          <Route
            path="*"
            render={() => 'Nothing found'}
          />
        </Switch>
        {/*  */}
      </div>
    );
  }
}

export default App;
