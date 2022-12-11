import { gql } from "@apollo/client";

export const ADD_FACILITY = gql`
  mutation CreateFacility($input: CreateFacilityInput) {
    createFacility(input: $input) {
      schoolCode
      placeName
      address1
      address2
      directions
      city
      state
      zipCode
    }
  }
`;

export const EDIT_FACILITY = gql`
  mutation ModifyFacility($input: ModifyFacilityInput) {
    modifyFacility(input: $input) {
      id
      schoolCode
      placeName
      address1
      address2
      directions
      city
      state
      zipCode
    }
  }
`;

export const DELETE_FACILITY = gql`
  mutation DeleteFacility($input: DeleteFacilityInput) {
    deleteFacility(input: $input) {
      id
      placeName
      address1
      address2
      city
    }
  }
`;
