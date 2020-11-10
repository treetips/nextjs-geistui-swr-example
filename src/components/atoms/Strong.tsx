type Props = {
  children: React.ReactNode;
};

/**
 * Slack highlighting
 */
export const Strong = (props: Props) => {
  const { children } = props;
  return (
    <span
      style={{
        color: "#d72b3f",
        backgroundColor: "#f7f7f9",
        border: "1px solid #e1e1e8",
        padding: 2,
      }}
    >
      {children}
    </span>
  );
};
