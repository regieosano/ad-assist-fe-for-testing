import { gql } from "@apollo/client";

export const ADD_OFFICIAL = gql`
  mutation CreateOfficial($input: CreateOfficialInput) {
    createOfficial(input: $input) {
      schoolCode,
      lastName,
      firstName,
      address,
      homePhone,
      workPhone,
      cellPhone,
      email,
      zip,
      ssn
    }
  } 
`;

export const EDIT_OFFICIAL = gql`
  mutation ModifyOfficial($input: ModifyOfficialInput) {
    modifyOfficial(input: $input) {
      id,
      schoolCode,
      lastName,
      firstName,
      address,
      homePhone,
      workPhone,
      cellPhone,
      email,
      zip,
      ssn
    }
  }
`;

export const DELETE_OFFICIAL = gql`
  mutation DeleteOfficial($input: DeleteOfficialInput) {
    deleteOfficial(input: $input) {
      id,
      lastName,
      firstName,
      address,
      homePhone,
      workPhone,
    }
  }
`;


