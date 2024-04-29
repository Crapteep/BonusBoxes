import React, { useState, useEffect, useBasicAccountData } from "react";

const GetUsernameById = (userId) => {
  const accounts_info = useBasicAccountData();
  return accounts_info?.find((account) => account.id === userId)?.username;
};

export default GetUsernameById;
