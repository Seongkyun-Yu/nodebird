import React, { useCallback } from "react";
import Head from "next/head";
import { Form, Input } from "antd";
import AppLayout from "../components/AppLayout";

const Signup = () => {
  const onSubmit = useCallback(() => {});
  return (
    <AppLayout>
      <Head>
        <title>NodeBird | 회원가입</title>
      </Head>

      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
