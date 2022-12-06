import { gql } from '@apollo/client';



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