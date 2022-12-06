import { gql } from '@apollo/client';

export const GET_FACILITIES = gql`
    query Facilities {
			facilities {
				id
        placeName
        address1
        address2
        city
        state
        zipCode
			}
		}
`

