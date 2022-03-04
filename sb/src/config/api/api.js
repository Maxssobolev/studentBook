import { gql } from "@apollo/client"

export const API = {
    uri: 'http://localhost:1337/graphql',

}

export const SINGLE_HOMEWORK_QUERY = gql`
query GetHw($id: ID!) {
    homework(id: $id ) {
        data {
            id
            attributes{
                title
                content
                deadline
                publishedAt
                subject {
                    data {
                      id
                      attributes{
                        title
                      }
                    }
                }
            }
        }
    }
}
`