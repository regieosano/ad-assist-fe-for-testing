import { gql } from "@apollo/client";

export const GET_PREPARATIONS = gql`
  query Preparations {
    preparations {
      id
      schoolCode  
      duty
      qty
    }
  }
`;



