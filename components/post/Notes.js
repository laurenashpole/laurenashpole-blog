import PropTypes from 'prop-types';
import Well from '../../shared/components/Well';
import styles from './Notes.styles.js';

const Notes = ({ notes }) => {
  // console.log(notes);
  return (
    <>
      <Well size="custom">
        <h3 class="notes__heading">Notes</h3>

        <ul>
          {notes.map((note) => {
            return(
              <li className="notes__item"><a href={note.blog_url}>{note.blog_name}</a> {note.type} this</li>
            );
          })}
        </ul>
      </Well>

      <style jsx global>
        {styles}
      </style>
    </>
  );
};

Notes.propTypes = {
  notes: PropTypes.array
};

export default Notes;