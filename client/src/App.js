import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'

const App = () => {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts />
    },

    {
      path:"/post/:id", // New route for the detail view
      element: <PostDetail />
    },


    {
      path:"/edit/:id",
      element: <EditPost />
    },
    {
      path:"/new",
      element: <CreatePost />
    }
  ]);

  return ( 
    <div className="App">
        {element}
    </div>
  );
}

export default App;



/*
<div className="header">


<h1>👍 Bet 1.0</h1>
        <Link to="/"><button className="headerBtn"> Explore Challenges 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Submit Challenfffge 🏆 </button></Link>
      </div>

      */