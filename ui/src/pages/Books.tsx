import React, { ReactElement, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import { Drawer, Form, Input, Button } from 'antd';
import { Books as BookQuery, CreateBook, CreateBookVariables } from '../typings/_graphql';
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

interface Props {}

export default function Books({}: Props): ReactElement {
    const { data, loading, error } = useQuery<BookQuery>(QUERY_BOOKS);
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);

    const [createBook, { loading: createLoading, error: createError }] = useMutation<CreateBook, CreateBookVariables>(
        CREATE_BOOK,
        {
            refetchQueries: [{ query: QUERY_BOOKS }],
        }
    );

    const onFinish = ({ author, title, description = '' }: any) => {
        createBook({ variables: { author, title, description } }).then(() => {
            setOpen(false);
        });
    };

    return (
        <section>
            <Button type="primary" onClick={() => setOpen(true)}>
                Create Book
            </Button>
            <div className="Books">
                {loading && <h3>...Loading</h3>}
                {error && <h3>Error: {error.message}</h3>}
                {data?.books.map(({ author, description, id, published, title }) => (
                    <span
                        key={id}
                        onClick={() => {
                            navigate(`/book/${id}`);
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
                ))}
            </div>
            <Drawer visible={open} width={500} onClose={() => setOpen(false)}>
                <h2>Create Book</h2>
                <Form onFinish={onFinish}>
                    <Form.Item name="title" label="Title">
                        <Input />
                    </Form.Item>
                    <Form.Item name="author" label="Author">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={createLoading}>
                        Create
                    </Button>
                </Form>
                {createError && <p>Error: {createError.message}</p>}
            </Drawer>
        </section>
    );
}
