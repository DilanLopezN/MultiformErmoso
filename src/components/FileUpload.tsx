import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Input } from './Input';
import { Button, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import {MdOutlineCloudUpload} from 'react-icons/md'

interface FileUploadProps {
leadNumber: string;
}

const FileUpload = ({leadNumber}: FileUploadProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Adicionar cada arquivo selecionado ao FormData
    for (const file of data.files) {
      formData.append('files', file);
    }

    try {
       await axios.post(`http://localhost:3333/ermosopdfs/${leadNumber}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Arquivos enviados com sucesso');
      reset(); // Limpar o formulário após o envio
    } catch (error) {
      console.error('Erro ao enviar os arquivos:', error);
    }
  };

  return (

        <Flex  height="500" width={300} align="center" justify="center" direction="column">
              <Text  mb={8} fontWeight="bold" borderBottom="2px" >DOCUMENTOS PDF</Text>
        <FormControl w="100%" h="100%" as="form" onSubmit={handleSubmit(onSubmit)}>
            
             <FormLabel boxShadow="0px 5px 15px rgba(0, 0, 0, 0.35)" border="2px" rounded="8" w="100%" htmlFor='files' >
                <Flex  align="center" justify="center"  gap="4" w="100%">
                <Text >UPLOAD DE ARQUIVOS</Text><MdOutlineCloudUpload size={48} />
                </Flex>
               
                </FormLabel>
          
          
        <Input hidden id='files' type="file"  {...register("files")} name="files" multiple />
 
       
        <Button w="100%" colorScheme="linkedin" type="submit">Enviar Arquivos</Button>
            </FormControl>
  
      </Flex>

  );
};

export default FileUpload;
