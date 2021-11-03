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
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = async () => {
    if (!post.note_count) {
      return;
    }

    try {
      const response = await request({
        endpoint: '/api/notes',
        body: JSON.stringify(params)
      });

      setNotes([...notes, ...response.notes]);
      setParams(response._links && response._links.next ? response._links.next.query_params : {});
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="well">
        <InView threshold={1} triggerOnce={true} onChange={handleLoad} />
      </div>
    );
  }

  return (
    <>
      <Well size="custom">
        <h3 className="notes__heading">Notes</h3>

        <ul>
          {notes.map((note, i) => {
            return(
              <li key={i} className="notes__item"><a href={note.blog_url}>{note.blog_name}</a> {note.type}{note.type === 'reblog' ? 'ge' : ''}{note.type !== 'posted' && 'd'} this{note.reblog_parent_blog_name ? ` from ${note.reblog_parent_blog_name}` : ''}</li>
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