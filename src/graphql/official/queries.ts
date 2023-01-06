import { gql } from "@apollo/client";

export const GET_OFFICIALS = gql`
  query Officials {
    officials {
      id
      schoolCode
      lastName
      firstName
      address
      homePhone
      workPhone
      cellPhone
      email
      zip
      ssn
    }
  }
`;