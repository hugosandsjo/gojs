type UserModalArticleProps = {
  children: React.ReactNode;
};

export default function UserModalArticle({ children }: UserModalArticleProps) {
  return (
    <>
      <div className="flex items-center justify-between flex-col md:flex-row gap-2">
        {children}
      </div>
    </>
  );
}
