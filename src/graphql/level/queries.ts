import { gql } from "@apollo/client";

export const GET_LEVELS = gql`
  query Levels {
    levels {
      id
      schoolCode
      level
      description
    }
  }
`;
