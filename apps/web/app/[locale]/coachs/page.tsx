import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTranslations } from "next-intl"

export const dynamic = 'force-dynamic'

export default function CoachsPage() {
  const t = useTranslations("coachs")

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <h1 className="text-4xl font-bold mb-8">
              {t("title")}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Les coachs seront ajoutés ici */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">À venir</h2>
                <p className="text-muted-foreground">
                  La liste de nos coachs sera bientôt disponible.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 