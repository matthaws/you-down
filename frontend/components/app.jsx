import React from 'react';
import NavBar from './nav/nav_bar';
import Footer from './nav/footer';

const App = ({children}) => (
  <main>
    <NavBar />
      {children}
    <Footer />
  </main>
);

export default App;
