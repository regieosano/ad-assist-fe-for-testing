import { gql } from "@apollo/client";

export const ADD_WORKER = gql`
  mutation CreateWorker($input: CreateWorkerInput) {
    createWorker(input: $input) {
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

export const EDIT_WORKER = gql`
  mutation ModifyWorker($input: ModifyWorkerInput) {
    modifyWorker(input: $input) {
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

export const DELETE_WORKER = gql`
  mutation DeleteWorker($input: DeleteWorkerInput) {
    deleteWorker(input: $input) {
      id
      schoolCode
      lastName
      firstName
      homePhone
      workerType
    }
  }
`;
