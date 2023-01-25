import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export function useId() {
  const [id, setId] = useState(null);

  useEffect(() => {
    if (!id) setId(nanoid());
  }, []);

  return id;
}
