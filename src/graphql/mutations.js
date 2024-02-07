/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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

// export const createQuote = /* GraphQL */ `
//   mutation CreateQuote(
//     $input: CreateQuoteInput!
//     $condition: ModelQuoteConditionInput
//   ) {
//     CreateQuote(input: $input, condition: $condition) {
//       id
//       author
//       text
//       createdAt
//       updatedAt
//       __typename
//     }
//   }
// `;

// export const deleteQuote = /* GraphQL */ `
//   mutation DeleteQuote(
//     $input: DeleteQuoteInput!
//     $condition: ModelQuoteConditionInput
//   ) {
//     DeleteQuote(input: $input, condition: $condition) {
//       id
//       author
//       text
//       createdAt
//       updatedAt
//       __typename
//     }
//   }
// `;