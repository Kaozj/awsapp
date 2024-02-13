import React, { useState } from 'react';

const YourComponent = () => {
  const [sortByAuthor, setSortByAuthor] = useState(false);
  const [quotes, setQuotes] = useState([]);

  async function fetchQuotes() {
    const apiData = await client.graphql({ query: listQuotes });
    const quotesFromAPI = apiData.data.listQuotes.items;

    // Sort quotes by author only if sortByAuthor is true
    const sortedQuotes = sortByAuthor
      ? quotesFromAPI.sort((a, b) => a.author.localeCompare(b.author))
      : [...quotesFromAPI];

    setQuotes(sortedQuotes);
  }

  const handleSortByAuthor = () => {
    setSortByAuthor(!sortByAuthor);
  };

  return (
    <div>
      {/* Your component JSX */}
      <button onClick={handleSortByAuthor}>Sort by Author</button>
    </div>
  );
};

export default Sorter;
