import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import filesize from 'filesize';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';
import alert from '../../assets/alert.svg';
import api from '../../services/api';
import { Container, Title, ImportFileContainer, Footer } from './styles';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    if (uploadedFiles.length > 0) {
      const [file] = uploadedFiles;
      data.append('file', file.file, file.name);

      try {
        await api.post('/transactions/import', data);
        history.push('/');
      } catch (err) {
        toast.error(err.message);
      }
    }
  }

  function submitFile(files: File[]): void {
    setUploadedFiles(
      files.map(file => ({
        file,
        name: file.name,
        readableSize: filesize(file.size),
      })),
    );
  }

  return (
    <>
      <Header size="small" currentPage="import" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button data-testid="submit" onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
