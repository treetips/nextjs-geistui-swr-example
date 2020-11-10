type Props = {
  children: React.ReactNode;
  href: string;
};

export const ExternalLink = (props: Props) => {
  const { children, href } = props;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
