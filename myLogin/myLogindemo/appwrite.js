import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 

  .setProject('6729dfb00025d24c5473'); 
const account = new Account(client);

export { client, account };
