import { gql } from "@apollo/client";

export const GET_FACILITIES = gql`
  query Facilities {
    facilities {
      id
      schoolCode
      placeName
      address1
      address2
      city
      state
      zipCode
    }
  }
`;
