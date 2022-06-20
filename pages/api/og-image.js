import playwright from 'playwright-aws-lambda';

export default async function handler (req, res) {
  if (!(req.query || {}).headline || !(req.query || {}).type) {
    return res.status(422).json({});
  }

  console.log(playwright);

  res.json({
    headline: req.query.headline,
    type: req.query.type
  });
}
