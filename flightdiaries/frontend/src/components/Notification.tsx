import { type JSX } from "react";

const Notification = ({ message }: { message: string }): JSX.Element => {
  if (!message) return;
  return <h4 style={{ color: "red" }}> {message}</h4>;
};

export default Notification;
