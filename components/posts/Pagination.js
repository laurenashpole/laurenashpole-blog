import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './Pagination.styles.js';

const Pagination = ({ totalPosts, pagination, paginationPath }) => {
  return (
    <ul className="pagination">
      <li className="pagination__item pagination__item--prev">
        {pagination.next && parseInt(pagination.next.query_params.page_number) !== 2 &&
          <Link href={parseInt(pagination.next.query_params.page_number) === 3 ? '/' : `${paginationPath ? paginationPath : ''}/page/${pagination.next.query_params.page_number - 2}`}>
            <a rel="prev" data-ga-category="blog pagination" data-ga-click="true">Prev</a>
          </Link>
        }
      </li>

      <li className="pagination__item pagination__item--next">
        {pagination.next && parseInt(pagination.next.query_params.offset) < totalPosts &&
          <Link href={`${paginationPath ? paginationPath : ''}/page/${pagination.next.query_params.page_number}`}>
            <a rel="next" data-ga-category="blog pagination" data-ga-click="true">Next</a>
          </Link>
        }
      </li>

      <style jsx global>
        {styles}
      </style>
    </ul>
  );
};

Pagination.propTypes = {
  totalPosts: PropTypes.number,
  posts: PropTypes.array,
  pagination: PropTypes.object
};

export default Pagination;
