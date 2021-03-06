import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section>
      <div className="container">
        <h4>Trendy Indeed</h4>
        <div>
          <Link to="monthly-by-country">Monthly Stats By Country</Link>
        </div>
        <div>
          <Link to="yearly-by-country">Yearly Stats By Country</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
