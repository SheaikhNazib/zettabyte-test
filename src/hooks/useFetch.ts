"use client";
import { useState, useEffect } from "react";

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          // Provide more specific error messages
          if (response.status === 404) {
            throw new Error(`Failed to load data: Endpoint not found (${response.status})`);
          } else if (response.status >= 500) {
            throw new Error(`Server error: Unable to process request (${response.status})`);
          } else {
            throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
          }
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        // Handle network errors and other fetch failures
        if (error instanceof TypeError && error.message.includes('fetch')) {
          setError(new Error('Network error: Unable to connect to server'));
        } else {
          setError(error as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;