import { useState } from 'react';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import { request } from '../../shared/utils/request';
import Well from '../../shared/components/Well';
import Button from '../../shared/components/Button';
import styles from './Notes.styles.js';

const Notes = ({ post }) => {
  const [notes, setNotes] = useState([]);
  const [params, setParams] = useState({ mode: 'all', id: post.id_string });

  const handleLoad = async () => {
    try {
      const response = await request({
        endpoint: '/api/notes',
        body: JSON.stringify(params)
      });

      setNotes([...notes, ...response.notes]);
      setParams(response._links.next.query_params);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Well size="custom">
        <InView threshold={1} triggerOnce={true} onChange={handleLoad}>
          <h3 className="notes__heading">Notes</h3>
        </InView>

        <ul>
          {notes.map((note, i) => {
            return(
              <li key={i} className="notes__item"><a href={note.blog_url}>{note.blog_name}</a> {note.type}{note.type === 'reblog' ? 'ge' : ''}d this{note.reblog_parent_blog_name ? ` from ${note.reblog_parent_blog_name}` : ''}</li>
            );
          })}
        </ul>

        {post.note_count > notes.length &&
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
  post: PropTypes.object
};

export default Notes;