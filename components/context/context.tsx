import React from "react";

// @ts-ignore
const BusitionConsoleContext = React.createContext();

export const BusitionConsoleProvider = BusitionConsoleContext.Provider;
export const BusitionConsoleConsumer = BusitionConsoleContext.Consumer;

export default BusitionConsoleContext;