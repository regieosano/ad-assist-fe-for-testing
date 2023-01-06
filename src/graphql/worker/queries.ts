import { gql } from "@apollo/client";

export const GET_WORKERS = gql`
  query Workers {
    workers {
      id
      schoolCode
      lastName
      firstName
      homePhone
      workerType
      payRate
      cellPhone
      email
      ssn
    }
  }
`;