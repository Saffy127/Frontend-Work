const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const books = [
  { id: 1, title: 'Permutation City', author: 'Greg Egan' },
  { id: 2, title: 'Solaris', author: 'Stanislaw Lem' },
  { id: 3, title: 'Atlas Shrugged', author: 'Ayn Rand' },
  { id: 4, title: 'Player of Games', author: 'Ian Banks' },
  {id: 5, title: "Blindsight", author: 'Peter Watts'}
];

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) res.status(404).send('The book with the given ID was not found.');
  else res.json(book);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
