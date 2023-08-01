import './App.css'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {useState} from 'react'
import { useForm, SubmitHandler, FieldValues} from 'react-hook-form'
import { Input } from './components/Input'
import {  Button, Flex, FormLabel, HStack, Text, VStack } from '@chakra-ui/react'
import {BsCloudUploadFill} from 'react-icons/bs'
import generateShortUUID from './utils/generateShortId'
import axios from 'axios'
import FileUpload from './components/FileUpload'


interface SubmitFormProps {
  customerName: string;
  adress: string;
  district: string;
  cep: string;
  neighbour: string;
  state: string;
  contactOne: string;
  contactTwo: string;
  guaranteeValue: string;
  leadNumber: string;

}

function App() {

  const [leadNumberState, setLeadNumber] = useState("")


const SeederSchema = yup.object().shape({
  customerName: yup.string().required('Campo Obrigatório'),
  adress: yup.string().required('Campo Obrigatório'),
  district: yup.string().required('Campo Obrigatório'),
  cep: yup.string().required('Campo Obrigatório'),
  neighbour: yup.string().required('Campo Obrigatório'),
  state: yup.string().required('Campo Obrigatório'),
  contactOne:  yup.string().required('Campo Obrigatório'),
  contactTwo: yup.string().required('Campo Obrigatório'),
  guaranteeValue: yup.string().required('Campo Obrigatório'),
})
const { register, handleSubmit, formState: {errors},} = useForm({
  resolver: yupResolver(SeederSchema)
})
const handleLeadNumber = () => {
  const randouuid = generateShortUUID()
  setLeadNumber(randouuid)
}
const handleSeedForm: SubmitHandler<SubmitFormProps> = async (values:SubmitFormProps) => {
  try {
      const data = {
        customerName: values.customerName,
        adress: values.adress,
        district: values.district,
        cep: values.cep,
        neighbour: values.neighbour,
        state: values.state,
        contactOne: values.contactOne,
        contactTwo: values.contactTwo,
        guaranteeValue: values.guaranteeValue,
        leadNumber: leadNumberState
      }
      await axios.post("http://localhost:3333/ermosoreports",data )
        alert("Enviado com sucesso!")
  } catch (error) {
    console.log(error)
  }
}

  return (
<Flex w="100vw" h="100vh">
<div className='mainContainer'>

<form onSubmit={handleSubmit(handleSeedForm as SubmitHandler<FieldValues>)}>
  <Flex align="center" gap={10}>
    <Flex direction="column"  align="center" gap={10}>
      <HStack>
      <VStack>
  
  <Text fontWeight="bold" mb="8" borderBottom="2px" >DADOS DO CLIENTE</Text>
  <Button onClick={handleLeadNumber} w="100%" colorScheme='yellow'>GERAR NÚMERO DE LEAD {leadNumberState}</Button>
<Input width={388}  placeholder='Nome do cliente'  {...register("customerName")} name="customerName" label='Nome do Cliente'  />
<Input width={388}  placeholder='Contato celular ou whatsapp'  {...register("contactOne")} name="contactOne" label='Contato do Cliente'  />
<Input width={388}  placeholder='Contato Alternativo celular ou whatsapp'  {...register("contactTwo")} name="contactTwo" label='Contato do Cliente'  />
<Input width={388}  placeholder='Valor de  Garantia'  {...register("guaranteeValue")} name="guaranteeValue" label='Valor de garantia'  />
</VStack>
<VStack>
<Text fontWeight="bold" borderBottom="2px" >ENDEREÇO DO CLIENTE</Text>
<Input width={388}  placeholder='Cep do cliente'  {...register("cep")} name="cep" label='Cep do Cliente'  />
<Input width={388}  placeholder='Cidade do cliente'  {...register("district")} name="district" label='Cidade do Cliente'  />
<Input width={388}  placeholder='Estado do cliente'  {...register("state")} name="state" label='Estado do Cliente'  />
<Input width={388}  placeholder='Bairro do cliente'  {...register("neighbour")} name="neighbour" label='Bairro do Cliente'  />
<Input width={388}  placeholder='Endereço do cliente'  {...register("adress")} name="adress" label='Endereço do Cliente'  />
</VStack>

      </HStack>
    
<Button type="submit" w="100%" colorScheme="linkedin" mt={4}>ENVIAR</Button>
    </Flex>


  <VStack >

   
  </VStack>

  </Flex>
  


  
</form> 
<FileUpload leadNumber={leadNumberState} />
</div>
</Flex>


    
  )
}

export default App
