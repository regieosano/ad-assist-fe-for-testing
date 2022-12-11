import { gql } from "@apollo/client";

export const ADD_LEVEL = gql`
  mutation CreateLevel($input: CreateLevelInput) {
      createLevel(input: $input) {
        level
        description  
      }
  }  
`;

export const DELETE_LEVEL = gql`
   mutation DeleteLevel($input: DeleteLevelInput) {
      deleteLevel(input: $input) {
        level
        description  
      }
  }   
`;