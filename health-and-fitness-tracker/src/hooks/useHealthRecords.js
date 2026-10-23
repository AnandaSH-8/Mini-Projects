
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'healthAndFitness';

function loadRecords() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error('Failed to load health records:', error);
    return [];
  }
}

function createRecordId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function useHealthRecords() {
  const [records, setRecords] = useState(loadRecords);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error('Failed to save health records:', error);
    }
  }, [records]);

  function addRecord(record) {
    const newRecord = {
      ...record,
      id: createRecordId(),
    };

    setRecords((previousRecords) => [
      newRecord,
      ...previousRecords,
    ]);
  }

  function updateRecord(id, updatedData) {
    setRecords((previousRecords) =>
      previousRecords.map((record) =>
        record.id === id
          ? { ...record, ...updatedData, id: record.id }
          : record
      )
    );
  }

  function deleteRecord(id) {
    setRecords((previousRecords) =>
      previousRecords.filter((record) => record.id !== id)
    );
  }

  return {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
  };
}
