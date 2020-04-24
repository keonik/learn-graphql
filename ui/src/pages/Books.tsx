import React, { ReactElement, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import { Drawer, Form, Input, Button } from 'antd';
import {
    Books as BookQuery,
    CreateBook,
    CreateBookVariables,
    UpdateBook,
    UpdateBookVariables,
    CreateBookCreateBook,
} from '../typings/_graphql';
import './Books.css';
import 'antd/dist/antd.dark.css';

const QUERY_BOOKS = gql`
    query Books {
        books {
            id
            title
            author
            description
            published
        }
    }
`;

const CREATE_BOOK = gql`
    mutation CreateBook($title: String!, $author: String!, $description: String) {
        createBook(data: { title: $title, author: $author, description: $description }) {
            id
            title
            author
            description
        }
    }
`;

const UPDATE_BOOK = gql`
    mutation UpdateBook($id: String!, $title: String, $author: String, $description: String) {
        updateBook(id: $id, data: { title: $title, author: $author, description: $description }) {
            id
            title
            author
            description
        }
    }
`;

interface Props {}

export default function Books({}: Props): ReactElement {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<CreateBookCreateBook>();
    // queries
    const { data, loading, error } = useQuery<BookQuery>(QUERY_BOOKS);
    // mutations
    const [createBook, { loading: createLoading, error: createError }] = useMutation<CreateBook, CreateBookVariables>(
        CREATE_BOOK,
        {
            refetchQueries: [{ query: QUERY_BOOKS }],
        }
    );

    const [updateBook, { loading: updateLoading, error: updateError }] = useMutation<UpdateBook, UpdateBookVariables>(
        UPDATE_BOOK
    );

    const onFinish = ({ author, title, description = '' }: any) => {
        if (selectedBook) {
            updateBook({ variables: { id: selectedBook.id, author, title, description } }).then(() => {
                setOpen(false);
                setSelectedBook(undefined);
            });
        } else {
            createBook({ variables: { author, title, description } }).then(() => {
                setOpen(false);
            });
        }
    };

    return (
        <section>
            <Button type="primary" onClick={() => setOpen(true)}>
                Create Book
            </Button>
            <div className="Books">
                {loading && <h3>...Loading</h3>}
                {error && <h3>Error: {error.message}</h3>}
                {data?.books.map((book) => {
                    const { author, description, id, title } = book;
                    return (
                        <span
                            key={id}
                            onClick={() => {
                                // navigate(`/book/${id}`);
                                setSelectedBook(book);
                                setOpen(true);
                            }}
                            className="Book"
                        >
                            <img
                                src="https://lh3.googleusercontent.com/proxy/gSWGlPo9iG6sFHMhFBmHQKbZzKnuM-JOlK7aKVMamTwhfICAFB2S2Nv24wch8dBcmB3_0wGfpOW4Ux6_unepoUSWOgOGGE4"
                                width={100}
                            />
                            <p>Title: {title}</p>
                            <p>Author: {author}</p>
                            <p>Description: {description}</p>
                        </span>
                    );
                })}
            </div>
            <Drawer
                visible={open}
                width={500}
                onClose={() => {
                    setOpen(false);
                    setSelectedBook(undefined);
                }}
            >
                {open && (
                    <>
                        <h2>Create Book</h2>
                        <Form onFinish={onFinish}>
                            <Form.Item name="title" label="Title">
                                <Input defaultValue={selectedBook?.title} />
                            </Form.Item>
                            <Form.Item name="author" label="Author">
                                <Input defaultValue={selectedBook?.author} />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <Input defaultValue={selectedBook?.description} />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" loading={createLoading}>
                                Create
                            </Button>
                        </Form>
                        {createError && <p>Error: {createError.message}</p>}
                    </>
                )}
            </Drawer>
        </section>
    );
}
