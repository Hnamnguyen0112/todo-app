"use client";

import { TabGroup, TabList, TabPanel, TabPanels, Tab } from "@headlessui/react";
import { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import ForgotPassword from "./forgot-password";

const Auth = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <TabList>
        <Tab></Tab>
        <Tab></Tab>
        <Tab></Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SignIn
            handleRedirectSignUp={() => setSelectedIndex(1)}
            handleRedirectForgotPassword={() => setSelectedIndex(2)}
          />
        </TabPanel>
        <TabPanel>
          <SignUp handleRedirectSignIn={() => setSelectedIndex(0)} />
        </TabPanel>
        <TabPanel>
          <ForgotPassword handleRedirectSignIn={() => setSelectedIndex(0)} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default Auth;
