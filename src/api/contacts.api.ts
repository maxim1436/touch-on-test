import { Contact } from "@/types/types";
import { CONTACTS } from "@/mock/mock";

const BASE_URL = `URL/fetch-contacts`;

const headers = {
	"Content-Type": "application/json",
};

const handleError = async <Type>(response: Response): Promise<Type> => {
	if (!response.ok) {
		throw new Error(`${response.status} - ${response.statusText}`);
	}
	return response.json();
};

export const listContacts = async (): Promise<Contact[]> => {
  try {

    // const response = await fetch(`${BASE_URL}`, { headers });
    // return handleError<Contact[]>(response);
    
    return CONTACTS;
  } catch (error: any) {
    throw new Error(error.message);
  }
};