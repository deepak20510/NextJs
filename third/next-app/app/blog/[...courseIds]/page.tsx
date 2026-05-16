export default async function Page({
  params,
}: {
  params: Promise<{ courseIds: string[] }>;
}) {
  const resolvedParams = await params;
  return <div>{JSON.stringify(resolvedParams.courseIds)}</div>;
}
