import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Profile = () => (
  <>
    <Head>
      <title>NodeBird | 프로필</title>
    </Head>
    <AppLayout>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" />
      <FollowList header="팔로워 목록" />
    </AppLayout>
  </>
);

export default Profile;
