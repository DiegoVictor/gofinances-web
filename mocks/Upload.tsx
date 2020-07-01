import React from 'react';

interface UploadProps {
  onUpload: Function;
}

const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
  const file = new File([JSON.stringify({ ping: true })], 'example.csv', {
    type: 'text/csv',
  });
  return (
    <input data-testid="file" type="file" onChange={() => onUpload([file])} />
  );
};

export default Upload;
