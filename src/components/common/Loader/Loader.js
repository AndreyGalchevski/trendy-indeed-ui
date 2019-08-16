import React from 'react';

function Loader(props) {
  const { isLoading, children } = props;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return children;
}

export default Loader;
