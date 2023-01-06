import { gql } from "@apollo/client";

export const ADD_PREPARATION = gql`
  mutation CreatePreparation($input: CreatePreparationInput) {
      createPreparation(input: $input) {
        schoolCode
        duty
        qty  
      }
  }  
`;

export const DELETE_PREPARATION = gql`
   mutation DeletePreparation($input: DeletePreparationInput) {
      deletePreparation(input: $input) {
        id
        schoolCode
        duty
        qty  
      }
  }   
`;

