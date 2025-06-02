import Link from "next/link"
import { Button } from "@workspace/ui"
import { Footer } from "@/components/footer"
import { getTranslations } from "next-intl/server"
import { getMessages } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
  const locale = (await Promise.resolve(params)).locale;
  const messages = await getMessages(locale, ['common', 'home']);
  return {
    title: messages.home?.metaTitle || 'Edgemy | Plateforme de coaching poker'
  };
}

export default async function HomePage({ params }: Props) {
  const t = await getTranslations("home")
  const tc = await getTranslations("common")

  return (
    <>
      <main>
        {/* Bannière principale */}
        <section className="py-20 bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                {t("hero.findCoach")}
              </Button>
              <Button variant="outline" size="lg">
                {t("hero.becomeCoach")}
              </Button>
            </div>
          </div>
        </section>

        {/* Caractéristiques */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("features.title")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">{t("features.technical.title")}</h3>
                <p className="text-muted-foreground">
                  {t("features.technical.description")}
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">{t("features.mental.title")}</h3>
                <p className="text-muted-foreground">
                  {t("features.mental.description")}
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">{t("features.community.title")}</h3>
                <p className="text-muted-foreground">
                  {t("features.community.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Appel à l'action */}
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <Button size="lg">
              {t("cta.button")}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 