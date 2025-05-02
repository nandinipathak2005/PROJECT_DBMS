export const fetchCharacters = async () => {
    const res = await fetch('http://localhost:3001/api/characters');
    if (!res.ok) throw new Error('Failed to fetch characters');
    return await res.json();
  };
  
  // export const fetchPuzzle = async (puzzleId) => {
  //   const res = await fetch(`/api/puzzles/${puzzleId}`);
  //   if (!res.ok) throw new Error('Failed to fetch puzzle');
  //   return await res.json();
  // };

  export const fetchPuzzle = async (puzzleId) => {
    const res = await fetch(`http://localhost:3001/api/puzzles/${puzzleId}`);
    if (!res.ok) throw new Error('Failed to fetch puzzle');
    return await res.json();
  };
  
  export const fetchBranch = async (branchId) => {
    const res = await fetch(`/api/puzzles/branch/${branchId}`);
    if (!res.ok) throw new Error('Failed to fetch branch');
    return await res.json();
  };
  
  // export const executeQuery = async (query, currentPuzzle) => {
  //   const res = await fetch('http://localhost:3001/api/query/execute', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ query, currentPuzzle }),
  //   });
  //   if (!res.ok) throw new Error('Failed to execute query');
  //   return await res.json();
  // };
  export const executeQuery = async (query, currentPuzzle) => {
    const res = await fetch('http://localhost:3001/api/query/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, currentPuzzle }),
    });
    if (!res.ok) throw new Error('Failed to execute query');
    return await res.json();
  };
  