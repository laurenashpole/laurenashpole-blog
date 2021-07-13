import { useState } from 'react';
import PropTypes from 'prop-types';
import { request } from '../../utils/request';
import Well from '../../shared/components/Well';
import Button from '../../shared/components/Button';
import styles from './Notes.styles.js';

const Notes = ({ notes }) => {
  const [params, setParams] = useState(notes._links ? notes._links.next.query_params : {});
  const [fullNotes, setFullNotes] = useState(notes.notes);

  const handleLoad = async () => {
    try {
      const response = await request({
        endpoint: '/api/notes',
        body: JSON.stringify(params)
      });

      setParams(response._links.next.query_params);
      setFullNotes([...fullNotes, ...response.notes]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Well size="custom">
        <h3 className="notes__heading">Notes</h3>

        <ul>
          {fullNotes.map((note, i) => {
            return(
              <li key={i} className="notes__item"><a href={note.blog_url}>{note.blog_name}</a> {note.type}{note.type === 'reblog' ? 'ge' : ''}d this{note.reblog_parent_blog_name ? ` from ${note.reblog_parent_blog_name}` : ''}</li>
            );
          })}
        </ul>

        {notes.total_notes > fullNotes.length &&
          <div className="notes__footer">
            <Button style="link" attributes={{ type: 'button', onClick: handleLoad }}>Show more notes</Button>
          </div>
        }
      </Well>

      <style jsx global>
        {styles}
      </style>
    </>
  );
};

Notes.propTypes = {
  notes: PropTypes.object
};

export default Notes;