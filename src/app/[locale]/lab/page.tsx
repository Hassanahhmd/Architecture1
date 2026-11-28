import { redirect } from "next/navigation";

export default async function LabIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/lab/quiz`);
}
