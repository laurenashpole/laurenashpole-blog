import { findNotes } from '../../utils/posts';

export default async (req, res) => {
  if (!req.body) {
    return res.status(422).json({});
  }

  const response = await findNotes(req.body);
  res.json(response);
};