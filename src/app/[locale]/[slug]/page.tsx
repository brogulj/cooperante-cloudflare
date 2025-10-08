export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  return (
    <div>
      Page {slug} in {locale}
    </div>
  )
}
