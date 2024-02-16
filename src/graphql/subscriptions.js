/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateQuote = /* GraphQL */ `
  subscription OnCreateQuote($filter: ModelSubscriptionQuoteFilterInput) {
    onCreateQuote(filter: $filter) {
      id
      author
      text
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateQuote = /* GraphQL */ `
  subscription OnUpdateQuote($filter: ModelSubscriptionQuoteFilterInput) {
    onUpdateQuote(filter: $filter) {
      id
      author
      text
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteQuote = /* GraphQL */ `
  subscription OnDeleteQuote($filter: ModelSubscriptionQuoteFilterInput) {
    onDeleteQuote(filter: $filter) {
      id
      author
      text
      createdAt
      updatedAt
      __typename
    }
  }
`;
