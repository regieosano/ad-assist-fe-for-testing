import { gql } from "@apollo/client";

export const ADD_OPPONENT = gql`
  mutation CreateOpponent($input: CreateOpponentInput) {
    createOpponent(input: $input) {
      schoolCode
      schoolName
      address
      city
      state
      zip
      adName
      email
      phone
    }
  }
`;

export const EDIT_OPPONENT = gql`
  mutation ModifyOpponent($input: ModifyOpponentInput) {
    modifyOpponent(input: $input) {
      id
      schoolCode
      schoolName
      address
      city
      state
      zip
      adName
      email
      phone
    }
  }
`;

export const DELETE_OPPONENT = gql`
  mutation DeleteOpponent($input: DeleteOpponentInput) {
    deleteOpponent(input: $input) {
      id
      schoolCode
      schoolName
      address
      city
      state
    }
  }
`;
