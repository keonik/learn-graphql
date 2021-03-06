
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Books
// ====================================================

export interface BooksBooks {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly published: any;
}

export interface Books {
  readonly books: ReadonlyArray<BooksBooks>;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateBook
// ====================================================

export interface CreateBookCreateBook {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly description: string;
}

export interface CreateBook {
  readonly createBook: CreateBookCreateBook;
}

export interface CreateBookVariables {
  readonly title: string;
  readonly author: string;
  readonly description?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateBook
// ====================================================

export interface UpdateBookUpdateBook {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly description: string;
}

export interface UpdateBook {
  readonly updateBook: UpdateBookUpdateBook;
}

export interface UpdateBookVariables {
  readonly id: string;
  readonly title?: string | null;
  readonly author?: string | null;
  readonly description?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GenresBookId
// ====================================================

export interface GenresBookIdGenresBooks {
  readonly id: string;
}

export interface GenresBookIdGenres {
  readonly id: string;
  readonly name: string;
  readonly books: ReadonlyArray<GenresBookIdGenresBooks>;
}

export interface GenresBookId {
  readonly genres: ReadonlyArray<GenresBookIdGenres>;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
