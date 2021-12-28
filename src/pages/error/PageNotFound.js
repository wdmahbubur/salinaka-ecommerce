import useScrollTop from '../../hooks/useScrollTop';
import PropType from 'prop-types';
import React from 'react';

const PageNotFound = ({ history }) => {
  useScrollTop();
  return (
    <main>
      <div className="page-not-found">
        <h1>:( Page you are looking for doesn&apos;t exists.</h1>
        <br />
        <button
          className="button"
          onClick={history.goBack}
          type="button"
        >
          Go back
        </button>
      </div>
    </main>

  );
};

PageNotFound.propTypes = {
  history: PropType.shape({
    goBack: PropType.func
  }).isRequired
};

export default PageNotFound;
