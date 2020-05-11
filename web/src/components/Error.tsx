import React from 'react';

interface ErrorProps {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return <div className="error">Error {message}</div>;
}
