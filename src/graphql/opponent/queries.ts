import { gql } from "@apollo/client";

export const GET_OPPONENTS = gql`
  query Opponents {
    opponents {
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