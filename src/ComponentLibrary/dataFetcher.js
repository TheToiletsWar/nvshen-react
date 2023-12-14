import { useEffect } from 'react';

function DataFetcher({ onDataFetched }) {
  useEffect(() => {
    fetch('api/getladylist')
      .then(response =>
        response.json()
      )
      .then(data =>
        onDataFetched(data)
      )
      .catch(error => console.error('Error fetching data:', error));
  }, [onDataFetched]);

  return null;
}

export default DataFetcher;
