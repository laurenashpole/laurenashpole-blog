import { findNotes } from '../../utils/notes';

export default async function handler (req, res) {
  if (!req.body) {
    return res.status(422).json({});
  }

  const response = await findNotes(req.body);
  res.json(response);
}